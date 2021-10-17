import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../..//models/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product/product.service';
import { SearchService } from '../../services/search/search.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  searchText: string;
  category: string;
  cartProducts: any = [];
  unsubscribeSearchTextChanges: Subscription;
  cartID: string = localStorage.getItem('cartID');
  userID: string;
  isCollapsed = false;
  selectedProduct: Product;

  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService
  ) {
    console.log('CONSTRUCTOR RUN');
  }

  ngOnInit(): void {
    console.log('NGONINIT RUN');
    this.unsubscribeSearchTextChanges = this.searchService.searchTextChanges.subscribe(
      (newValue: string) => {
        this.searchText = newValue;
      }
    );

    this.userID = this.authService.userIdInfo();

    // this.getCartProducts();

    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      if (this.category) {
        this.getProductsByCategory();
      } else {
        this.getProducts();
      }
    });
  }

  onEdit(): void {
    this.getProducts();
  }

  getProductsByCategory() {
    this.productService
      .getAllProductsByCategory(this.category)
      .subscribe((p) => (this.products = p));
  }
  getProducts() {
    this.productService.getAllProducts().subscribe(
      (p) => {
        this.products = p;
      },
      (e) => console.log(e)
    );
  }
  getCartProducts() {
    this.cartService.getCartProducts().subscribe((p) => {
      console.log('P = ', p);

      this.cartProducts = p;
    });
  }

  updateProducts(event): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribeSearchTextChanges.unsubscribe();
  }
}
