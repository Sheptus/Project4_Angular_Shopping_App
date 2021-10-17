import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchTextChanges: Subject<string>;
  constructor() {
    this.searchTextChanges = new Subject<string>();
  }

  setSearchTextChanges(newValue: string) {
    this.searchTextChanges.next(newValue);
  }
}
