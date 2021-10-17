import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderDetailsForm: FormGroup;
  cartID: string;
  userId: string;
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderDetailsForm = this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      dateOfOrder: ['', Validators.required],
      card: ['', Validators.required],
    });
    this.cartID = this.cartService.getCart();
    this.userId = this.authService.userIdInfo();
    console.log('CART ID = ', this.cartID);
    console.log('USER ID = ', this.userId);
  }

  orderFinalize(): void {
    if (!this.orderDetailsForm.valid) return;
    console.log(this.orderDetailsForm.value);
    this.orderService
      .createOrder({
        ...this.orderDetailsForm.value,
        cart: this.cartID,
        user: this.userId,
      })
      .subscribe((c: Order) => {
        console.log('created order = ', c);
        localStorage.removeItem('cartID');
        this.router.navigate(['/ordersuccess']);
      });
  }

  getCity(): void {
    // this.orderDetailsForm.controls.city.setValue()
    // this.orderDetailsForm.controls.city.setValue(user.city)
    console.log('USERID = ', this.userId);

    this.authService
      .getUserDetails(this.userId)
      .subscribe((user: User) =>
        this.orderDetailsForm.controls.city.setValue(user.city)
      );
  }

  getStreet(): void {
    this.authService
      .getUserDetails(this.userId)
      .subscribe((user: User) =>
        this.orderDetailsForm.controls.street.setValue(user.street)
      );
  }
  get city() {
    return this.orderDetailsForm.get('city');
  }
  get street() {
    return this.orderDetailsForm.get('street');
  }
  get dateOfOrder() {
    return this.orderDetailsForm.get('dateOfOrder');
  }
  get card() {
    return this.orderDetailsForm.get('card');
  }
}
