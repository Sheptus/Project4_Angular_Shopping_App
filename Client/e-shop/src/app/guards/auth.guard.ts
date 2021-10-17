import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data.role;
    const isAuth = this.authService.isLoggedIn();
    const isAdmin = this.authService.isAdminLogged();
    console.log('GUARD ROLE', role);

    if (!isAuth || (role && !isAdmin)) {
      this.router.navigate(['/register']);
      return false;
    }
    return true;
  }
}
// const currentUser = this.authService.currentUserValue;
// const role = route.data.roles;
