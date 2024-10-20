import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { userImage } from '../userImage';
import { NgxHeaderComponent } from '@app/shared/components/ngx-header/ngx-header.component';
import { LayoutContentComponent } from './component/layout-content/layout-content.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NgxHeaderComponent, LayoutContentComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  theme = 'default'; //TODO: chenge the theme for arthur theme
  companyName = 'MExpress';
  compannyAbbreviation = 'M';
  name = 'Montecristo';
  showMenu = false;
  isClickInside = false;
  userImage = userImage;

  lblUserName = '';
  loading = false;

  constructor() {
  }


  onToggleMenu() {
    this.showMenu = !this.showMenu;
    this.isClickInside = true;

  }


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.isClickInside && !this.isInsideSidenav(event.target as HTMLElement)) {
      this.showMenu = false;
    }
    this.isClickInside = false;
  }

  private isInsideSidenav(target: HTMLElement): boolean {
    let element: HTMLElement | null = target;
    while (element) {
      if (element.classList.contains('sidenav-container')) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }

}
