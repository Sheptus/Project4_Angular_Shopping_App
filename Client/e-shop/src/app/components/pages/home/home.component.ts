import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  signedIn: boolean;
  user: string;
  isOpenCart: boolean;
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn();
    this.user = this.authService.userInfo();
    this.authService.signedIn.subscribe((signedIn) => {
      this.signedIn = signedIn;

      this.isOpenCart = this.cartService.isOpenCart();
    });
  }
}
