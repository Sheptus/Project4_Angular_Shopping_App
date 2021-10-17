import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductsSearchComponent implements OnInit {
  searchText: string;
  searchFormControl: FormControl;
  unsubscribeSearchTextChanges: Subscription;

  constructor(private searchService: SearchService) {
    this.searchFormControl = new FormControl();
  }

  ngOnInit(): void {
    this.unsubscribeSearchTextChanges = this.searchFormControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((newValue: string) => {
        this.searchService.setSearchTextChanges(newValue);
        // this.searchText = newValue;
        console.log(newValue);
      });
  }

  ngOnDestroy() {
    this.unsubscribeSearchTextChanges.unsubscribe();
  }
}
