import { Injectable } from '@angular/core';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private localDevUrl = 'http://localhost:3000/';
  private categoryURL = `${this.localDevUrl}api/category`;
  categories: Category;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category> {
    return this.http.get<Category>(this.categoryURL);
  }
}
