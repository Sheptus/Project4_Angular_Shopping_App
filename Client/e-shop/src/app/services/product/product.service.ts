import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private localDevUrl = 'http://localhost:3000/';
  private productURL = `${this.localDevUrl}api/product`;

  products: Product;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productURL)
      .pipe(catchError(this.handleError));
  }

  getAllProductsByCategory(category: string): Observable<Product[]> {
    const params = new HttpParams().set('search', category);
    return this.http.get<Product[]>(this.productURL + '/s/c', { params });
  }

  getAllProductsByInput(searchText: string): Observable<Product[]> {
    console.log('FROM INPUT = ', searchText);

    return this.http.get<Product[]>(`${this.productURL}/${searchText}`);
  }

  updateProductByID(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productURL}`, product);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.productURL}`, product);
  }

  getAmountOfProducts(): Observable<number> {
    return this.http.get<number>(`${this.productURL}/t/p`);
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
