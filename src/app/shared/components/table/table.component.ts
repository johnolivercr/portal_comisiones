import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
//import { CommonTableComponent } from './common-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
//import { DateFormatPipe } from '@app/shared/pipe/date-format.pipe';
//import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';
import { Config, IButton } from './interface/config.interface';
import { Column, ColumnType } from './interface/column.interface';
import { IPagination } from '../../interfaces/common/pagination.interface';
import { SearchService } from '../../services/search/search.service';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { range } from 'rxjs';

@Component({
  selector: 'ngx-component-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSortModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges, AfterViewInit {
  /** Options table */

  @Input() config!: Config;
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements: number = 0;
  @Input() loadingData: boolean = false;
  @Input() datasource!: any[];
  @Output() PageChanged: EventEmitter<any> = new EventEmitter();
  data_Source: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  tableHeight: string = '';
  color: ThemePalette = 'primary';

  constructor(private searchService: SearchService) { }
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.data_Source.sort = this.sort;
    setTimeout(() => {
      this.resetPaginator();
    });
    this.handleFilterData();
  }

  handleFilterData() {
    this.searchService.searchText$.subscribe((searchText) => {
      this.data_Source.filter = searchText.trim().toLowerCase();
    });

    this.searchService.sort$.subscribe((sort) => {
      if (this.data_Source.sort) {
        this.data_Source.sort.active = sort.active;
        this.data_Source.sort.direction = sort.direction;
        this.sort.sortChange.emit({
          active: sort.active,
          direction: sort.direction,
        });
      }
    });

    this.sort.sortChange.emit({ active: 'columnName', direction: 'asc' });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { datasource, loadingData, config } = changes;

    if (config) {
      this.displayedColumns = this.config.displayedColumns.map(
        (column) => column.field
      );

      this.tableHeight = config.currentValue.tableHeight || '';
    }
    if (datasource) {
      this.onloadData();
    }
    if (loadingData) {
      this.loadingData = loadingData.currentValue;
    }
  }
  onloadData = () => {
    this.data_Source = new MatTableDataSource(this.datasource);
    if (this.datasource.length > 0) {
      this.totalElements = this.datasource[0].total_row;
    }
  };

  handleClick(column: Column, row: any) {
    if (column.action) column.action(row);
  }

  deletClick(column: Column, row: any) {
    if (row.action) row.action(row);
  }

  handleToolbarClick(button: IButton) {
    if (button.action) button.action();
  }

  handleCheckboxClick(event: Event, column: Column): void {
    event.preventDefault();
  }

  onPageChanged = (event: any) => {
    const pagination: IPagination = {
      page_number: event.pageIndex + 1,
      rows_page: event.pageSize,
      total_row: 0,
    };

    this.PageChanged.emit(pagination);
  };

  resetPaginator(): void {
    if (this.paginator) {
      this.paginator.pageIndex = 0; // Asegura de que inicia en la primera página
      this.paginator.pageSize = this.calculatePaging(
        this.config.title
          ? 'table-responsive-with-title'
          : 'table-responsive-full-height',
        52
      );
      this.data_Source.paginator = this.paginator;

      const pagination: IPagination = {
        page_number: this.paginator.pageIndex + 1,
        rows_page: this.paginator.pageSize,
        total_row: 0,
      };
      this.PageChanged.emit(pagination);
    }
  }
  calculatePaging = (tableClassName: string, _row_height: number = 55) => {
    const heightTable: HTMLCollection =
      document.getElementsByClassName(tableClassName);
    const gridHeight: any =
      heightTable.length > 0
        ? heightTable[heightTable.length - 1].clientHeight
        : 400;
    const pageSize = 1;
    const pageResize: any = (gridHeight - pageSize * _row_height) / _row_height;
    return Math.round(pageResize);
  };

}
export const createColumn = (
  field: string,
  label: string,
  type: ColumnType,
  format?: string,
  icon?: string,
  action?: (...args: any) => void,
  hide_on_mobile?: boolean
): Column => {
  return {
    field,
    label,
    icon: icon || '',
    type,
    format: format || '',
    action: action || undefined,
    hide_on_mobile: hide_on_mobile,
  };
};

export const createButton = (
  text: string,
  icon?: string,
  action?: (...args: any) => void
): IButton => {
  return {
    text,
    icon: icon || '',
    action: action,
  };
};
