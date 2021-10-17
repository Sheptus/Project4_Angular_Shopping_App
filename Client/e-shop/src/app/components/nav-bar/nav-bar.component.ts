import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isMenuCollapsed = true;
  isAdmin = null;
  signedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logOut();
    this.authService.signedIn.subscribe((signedIn) => {
      this.signedIn = signedIn;
    });
  }

  ngOnInit(): void {
    this.authService.signedIn.subscribe((signedIn) => {
      this.signedIn = signedIn;
    });
  }

  ngDoCheck() {
    if (this.isAdmin !== this.authService.isAdminLogged()) {
      this.isAdmin = this.authService.isAdminLogged();
    }
  }
}
