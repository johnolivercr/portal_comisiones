
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './ngx-header.component.html',
  styleUrl: './ngx-header.component.scss'
})
export class NgxHeaderComponent {
  @Input() companyName: string = '';
  @Input() companyAbbreviation: string = '';
  @Input() userName: string = '';
  @Input() profileImage:string = '';
  @Output() toggleSidenav = new EventEmitter<string>();

  constructor() { }


  toggleMenu(){
      this.toggleSidenav.emit()
  }

}
