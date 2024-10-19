import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-component-header-title',
  standalone: true,
  imports: [],
  templateUrl: './header-title.component.html',
  styleUrl: './header-title.component.scss'
})
export class HeaderTitleComponent {
  @Input() title?: string = '';
  @Input() subTitle?: string = '';
}
