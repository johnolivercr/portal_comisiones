import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column } from '../table/interface/column.interface';
import { Config } from '../table/interface/config.interface';
import { MatSort} from '@angular/material/sort';
import { SearchService } from 'app/shared/services/search/search.service';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'ngx-component-cards-table',
  standalone: true,
  imports: [CommonModule, MatSort],
  templateUrl: './cards-table.component.html',
  styleUrl: './cards-table.component.scss'
})
export class CardsTableComponent {
  @Input() config!: Config;
  displayedColumns: string[] = [];
  @Input() datasource: any[] = [];

  constructor(private searchService: SearchService) { }
  @ViewChild(MatSort) sort!: MatSort;

  cardList = [...this.datasource];

  ngOnInit(): void {
    this.searchService.searchText$.subscribe(searchText => {
      if (searchText.trim() !== '') {
        this.searchByAnyField(searchText).subscribe(result => {
          this.cardList = result;
        });
      } else {
        this.cardList = [...this.datasource];
      }
    });
  }

  searchByAnyField(value: string): Observable<any[]> {
    return of(this.datasource.filter(card => {
      return Object.values(card).some(fieldValue => {
        // Ensure the fieldValue is a string before calling toLowerCase
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(value.toLowerCase());
        }
        return false;
      });
    }));
  }


  handleClick( row: any) {
    if (row.action) row.action(row);
  }

  deletClick( row: any) {
    if (row.action) row.action(row);
  }
}
