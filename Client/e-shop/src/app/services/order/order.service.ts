import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private localDevUrl = 'http://localhost:3000/';
  private orderURL = `${this.localDevUrl}api/order`;
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderURL, order);
  }

  getAmountOfOrders(): Observable<number> {
    return this.http.get<number>(`${this.orderURL}/t/o`);
  }
}
