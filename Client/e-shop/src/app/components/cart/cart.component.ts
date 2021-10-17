import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  isCollapsed = false;
  @Input() cartProduct;
  @Input() isCart;
  @Output() deleted = new EventEmitter<string>();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log(this.cartProduct);
  }

  deleteCartProduct(cartID: string) {
    this.deleted.emit(cartID);
  }
}
