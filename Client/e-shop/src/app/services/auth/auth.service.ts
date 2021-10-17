import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user';
import {
  Observable,
  throwError as observableThrowError,
  Subject,
  BehaviorSubject,
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface EmailAvailableResponse {
  exist: boolean;
}

interface UserResponse {
  token: string;
  user: { name: string; _id: string; role: string };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localDevUrl = 'http://localhost:3000/';
  private shopUrl = `${this.localDevUrl}api/auth`;
  signedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {}

  emailAvailable(username: string): Observable<EmailAvailableResponse> {
    return this.http.post<EmailAvailableResponse>(`${this.shopUrl}/username`, {
      username,
    });
  }

  // register
  createUser(user: User): Observable<User> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post<User>(`${this.shopUrl}/register`, user)
      .pipe(catchError(this.handleError));
  }

  //login
  loginUser(user: object): Observable<string> {
    return this.http.post<UserResponse>(`${this.shopUrl}/login`, user).pipe(
      map((response) => {
        console.log('RESPONSE', response);
        const { token, user } = response;
        if (token) {
          this.signedIn.next(true);
          localStorage.setItem('token', token);
          localStorage.setItem('user', user.name);
          localStorage.setItem('userID', user._id);
          localStorage.setItem('role', user.role);
          return user.role;
        }
      }),
      catchError(this.handleError)
    );
  }

  userInfo() {
    return localStorage.getItem('user');
  }

  isLoggedIn() {
    // return !!localStorage.getItem("token");
    if (localStorage.getItem('token')) {
      this.signedIn.next(true);
      return true;
    }
    return false;
  }

  isAdminLogged() {
    return localStorage.getItem('role') === 'admin';
  }

  userIdInfo() {
    return localStorage.getItem('userID');
  }

  logOut() {
    localStorage.clear();
    this.signedIn.next(false);
    this.router.navigate(['/login']);
  }

  getUserDetails(id: string): Observable<User> {
    return this.http.get<User>(`${this.shopUrl}/user/${id}`);
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
