import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { OrderService } from '../../services/order/order.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-shop-description',
  templateUrl: './shop-description.component.html',
  styleUrls: ['./shop-description.component.css'],
})
export class ShopDescriptionComponent implements OnInit {
  @Input() isOpenCart: boolean;

  amountOfProductInDB: number;
  amountOfOrdersInDB: number;
  totalPrice: number;
  cartID: string = localStorage.getItem('cartID');

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    console.log('IS OPEN CART ', this.isOpenCart);
    this.productService.getAmountOfProducts().subscribe((amount: number) => {
      if (!amount) return;
      this.amountOfProductInDB = amount;
    });
    this.orderService.getAmountOfOrders().subscribe((amount: number) => {
      if (!amount) return;
      this.amountOfOrdersInDB = amount;
    });

    if (!this.cartID) return;
    this.cartService.getTotalPrice(this.cartID).subscribe((total: number) => {
      this.totalPrice = total;
    });
  }
}
