import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-store-filter',
  templateUrl: './store-filter.component.html',
  styleUrls: ['./store-filter.component.css'],
})
export class StoreFilterComponent implements OnInit {
  @Input() category: string;
  @Input() isAdmin: boolean;
  categories: Category;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories().subscribe(
      (c: Category) => {
        this.categories = c;
      },
      (e) => console.log(e)
    );
  }

  ngOnInit(): void {}
}
