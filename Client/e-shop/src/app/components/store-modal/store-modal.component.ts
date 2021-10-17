import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-store-modal',
  templateUrl: './store-modal.component.html',
  styleUrls: ['./store-modal.component.css'],
})
export class StoreModalComponent implements OnInit {
  amount: number;
  closeResult: string;
  cartID: string = localStorage.getItem('cartID');
  @Input() product: Product;
  @Output() onUpdateCartProducts = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}
  onUpdateCartProduct(cartID: string) {
    this.onUpdateCartProducts.emit(cartID);
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    console.log('PRODUCT OPEN = ', this.product);
  }

  add(product: Product) {
    this.cartService
      .addProductToCart({
        productID: product._id,
        amount: this.amount,
        price: this.amount,
        cartID: localStorage.getItem('cartID'),
      })
      .subscribe((res) => this.onUpdateCartProduct(this.cartID));

    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
