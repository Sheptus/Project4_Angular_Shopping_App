import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  cartProducts: any = [];
  totalPrice: string;
  cartID: string = localStorage.getItem('cartID');
  constructor(private location: Location, private cartService: CartService) {}
  getCartProducts() {
    // this.cartService.getCartProducts().subscribe((p) => {
    // 	console.log('P = ', p);

    // 	this.cartProducts = p;
    // });
    this.cartService.getCartProductsById(this.cartID).subscribe((p) => {
      this.cartProducts = p;
    });
  }

  getTotalPrice(): void {
    this.cartService
      .getTotalPrice(this.cartID)
      .subscribe((price: string) => (this.totalPrice = price));
  }
  goBack() {
    this.location.back();
  }
  ngOnInit(): void {
    this.getCartProducts();
    this.getTotalPrice();
  }
}
