import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Sort {
  active: string;
  direction: SortDirection;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTextSubject = new BehaviorSubject<string>('');
  searchText$: Observable<string> = this.searchTextSubject.asObservable();

  private sortSubject = new BehaviorSubject<Sort>({
    active: 'default',
    direction: 'asc',
  });
  sort$: Observable<Sort> = this.sortSubject.asObservable();

  setSearchText(searchText: string) {
    this.searchTextSubject.next(searchText);
  }

  setSort(sort: Sort) {
    this.sortSubject.next(sort);
  }
}
