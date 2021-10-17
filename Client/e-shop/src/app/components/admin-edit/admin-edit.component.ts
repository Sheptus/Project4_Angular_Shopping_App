import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent implements OnInit {
  @Input() product: Product;
  @Output() onEdit = new EventEmitter();
  editForm: FormGroup;

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

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
    console.log('EDIT MODAL PRODUCT', this.product);
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

  ngOnInit(): void {
    this.editForm = this.fb.group({
      pName: [this.product.pName],
      type: [this.product.categoryID.type],
      imageURL: [this.product.imageURL],
      price: [this.product.price],
    });
  }

  edit(): void {
    console.log('editing...', this.editForm.value);
    this.productService
      .updateProductByID({
        ...this.editForm.value,
        _id: this.product._id,
        typeID: this.product.categoryID._id,
      })
      .subscribe(() => this.onEdit.emit());
    this.modalService.dismissAll();
    // console.log('EDITING = ', this.product);
  }
}
