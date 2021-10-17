import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.css'],
})
export class AdminModalComponent implements OnInit {
  closeResult = '';
  createProductForm: FormGroup;
  @Output() onCreate = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private poductService: ProductService
  ) {}

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      name: [''],
      image: [''],
      type: [''],
      price: [''],
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  save() {
    console.log('Product ');
    this.poductService
      .createProduct(this.createProductForm.value)
      .subscribe((p) => this.onCreate.emit());

    this.modalService.dismissAll();
  }
}
