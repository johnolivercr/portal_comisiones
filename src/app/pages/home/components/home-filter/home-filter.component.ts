import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchService } from '../../../../shared/services/search/search.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { SortDirection } from '@angular/material/sort';

@Component({
  selector: 'ngx-component-home-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatRadioModule,
  ],
  templateUrl: './home-filter.component.html',
  styleUrl: './home-filter.component.scss',
})
export class HomeFilterComponent {
  @Input() sortOptions: any;

  viewFilters: boolean = false;
  filterForm!: FormGroup;
  sortOptionSelected!: any;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.initiateForm();
  }

  initiateForm() {
    this.filterForm = new FormGroup({
      filterText: new FormControl(''),
    });
  }

  viewFiltersSelected() {
    this.viewFilters = !this.viewFilters;
    return this.viewFilters;
  }

  onHandleFilter() {
    this.searchService.setSearchText(
      this.filterForm.controls['filterText'].value
    );
  }

  onHandleSort(event: any) {
    const { name, sort } = event.value;
    const direction: SortDirection = sort;
    this.searchService.setSort({ active: name, direction });
  }

  textChange(event: any) {
    if (this.filterForm.controls['filterText'].value === '') {
      this.onHandleFilter();
    }
  }
}
