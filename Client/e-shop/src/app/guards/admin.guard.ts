import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const expectedRole = route.data.expectedRole;
    const tokenPayload = decode(token);
    console.log('TOKEN PAYLOAD = ', tokenPayload);
    if (!this.authService.isLoggedIn() || tokenPayload.role !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
