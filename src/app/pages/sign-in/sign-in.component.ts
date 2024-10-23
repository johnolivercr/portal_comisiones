import { Component } from '@angular/core';
import { HeaderTitleComponent } from '@app/shared/components/header-title/header-title.component';
import { FooterComponent } from './component/layout/footer/footer.component';
import { ConfirmCodeComponent } from './component/auth/confirm-code/confirm-code.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [HeaderTitleComponent, ConfirmCodeComponent, FooterComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  public lblTitle?: string = 'Inicio de sesión';
  public lblSubTitle?: string = '';
}
