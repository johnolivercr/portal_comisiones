import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, ThemeService } from '@grupomontecristo/header';
import { SidenavComponent } from '@grupomontecristo/sidenav';
import { userImage } from '../userImage';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidenavComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  theme = 'insurance-theme'; //TODO: chenge the theme for arthur theme
  companyName = 'Montecristo';
  compannyAbbreviation = 'M';
  name = 'Montecristo';
  showMenu = false;
  isClickInside = false;
  userImage = userImage;
  menu = [
    {
      active: true,
      create_date: "2024-02-28T14:36:12.083",
      create_user: 1,
      id: 10,
      key: "menu:item:engine",
      options: [
        {
          id: 2,
          create_date: "2023-01-01T00:00:00",
          create_user: 1,
          write_date: "1900-01-01T00:00:00",
          write_user: 0,
          view_id: 5,
          menu_item_id: 1,
          parent_id: 0,
          name: "Epicrisis",
          description: "Epicrisis",
          web_icon: "/assets/images/icons/menu/sidebar/plan.svg",
          route: "#",
          active: true,
          labels: [
            {
              id: 3,
              create_date: "2023-01-01T00:00:00",
              create_user: 1,
              write_date: "1900-01-01T00:00:00",
              write_user: 0,
              menu_item_option_id: 2,
              lang_id: 1,
              item_text: "Epicrisis",
              active: true,
              iso_code: "en_US",
              code: "en_US"
            },
            {
              id: 4,
              create_date: "2023-01-01T00:00:00",
              create_user: 1,
              write_date: "1900-01-01T00:00:00",
              write_user: 0,
              menu_item_option_id: 2,
              lang_id: 2,
              item_text: "Epicrisis",
              active: true,
              iso_code: "es_CR",
              code: "es_CR"
            }
          ],

        }

      ],
      order_by: 1,
      parent_id: 0,
      short_name: "ENGINE",
      system_id: 6,
      ui_menu_id: 1,
      visible: true,
      web_icon: "",
      write_date: "1900-01-01T00:00:00",
      write_user: 0,
    }
  ]


  constructor(private themeService: ThemeService) {
    this.themeService.setCurrentTheme(this.theme);
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
