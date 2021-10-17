import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-store-items',
  templateUrl: './store-items.component.html',
  styleUrls: ['./store-items.component.css'],
})
export class StoreItemsComponent implements OnInit {
  @Input() product: Product;
  @Input() isAdmin: boolean;
  @Output() onUpdateCartProducts = new EventEmitter();
  @Output() onEdit = new EventEmitter();

  constructor() {}

  onUpdateCartProduct(cartId: string) {
    this.onUpdateCartProducts.emit(cartId);
  }

  ngOnInit(): void {}

  addToCart() {}

  edit(): void {
    this.onEdit.emit();
  }
}
