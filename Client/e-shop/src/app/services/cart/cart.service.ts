import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private localDevUrl = 'http://localhost:3000/';
  private cartUrl = `${this.localDevUrl}api/cart`;
  private addProductURL = `${this.localDevUrl}api/cart/addProduct`;

  constructor(private http: HttpClient) {}

  // private getCartProductsEventSUbject = new BehaviorSubject<any>([]);
  // data: Observable<any> = this.getCartProductsEventSUbject.asObservable();

  // getCartProductsEvent() {
  //   return this.http
  //     .get(this.cartUrl)
  //     .subscribe((data) => this.getCartProductsEventSUbject.next());
  // }

  createCart(userID: string): Observable<object> {
    console.log('user id from service', userID);

    return this.http.post(this.cartUrl, { userID });
  }

  addProductToCart(cartInfo: object): Observable<object> {
    return this.http.post(this.addProductURL, { ...cartInfo });
  }

  getCartProducts() {
    return this.http.get(this.cartUrl).pipe(map((data) => data));
  }

  getCartProductsById(cartId: string) {
    return this.http.get(`${this.cartUrl}/${cartId}`).pipe(map((data) => data));
  }

  getCart() {
    return localStorage.getItem('cartID');
  }

  deleteCartProduct(cartInfoID: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        cartInfoID,
      },
    };
    return this.http.delete(this.cartUrl, options);
  }

  addToCart(product: object) {}

  getTotalPrice(id: string) {
    if (!id) return;
    return this.http.get(`${this.cartUrl}/totalPrice/${id}`);
  }

  isOpenCart(): boolean {
    return !!localStorage.getItem('cartID');
  }
}
