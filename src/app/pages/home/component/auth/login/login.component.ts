import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonService } from '@app/service/common/*';
import { IRequest } from '@app/shared/interfaces/common/request.interface';
import { IResponse } from '@app/shared/interfaces/common/response.interface';
import { NotifyService } from '@app/shared/services/common/notify.service';
import { environment } from '@env/environment';
import Operation from 'enums/operation.enum';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true, // Marca el componente como independiente
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private notifyService: NotifyService
  ) {
    this.loginForm = this.fb.group({
      identification: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  get identification() {
    return this.loginForm.get('identification');
  }


  onSubmit(): void {
    debugger
    if (this.loginForm.valid) {
      const { identification } = this.loginForm.value;
      // Lógica para manejar la autenticación
      console.log('identification:', identification);
      this.onLogin(identification);
    }
  }

  async onLogin(identification: string) {
    let request: IRequest = {
      operation: Operation.POST,
      data: {
        identification: identification
      },
      microservice: environment.microservice.engine.code,
      method: environment.microservice.engine.methods.getEmployed
    };

    let response = await firstValueFrom(this.commonService.executeMethod(request));

    if (!response) {
      this.handleLoginFailure(response);
      return;
    }
    const { success, data, message } = response;
    if (!success || !data) {
      this.handleLoginFailure(response);
      return;
    }
    const userLogged: any = data;
    if (!userLogged || userLogged == null) {
      this.handleLoginFailure(response);
      return;
    }
    this.handleSuccessfulLogin(userLogged);

  };

  private async handleLoginFailure(response: IResponse) {
    this.commonService.setLoading(false);
    this.notifyService.OnNotifyError('No tines permisos para ingresar, por favor ingrese con otra cuenta', '¡Usuario invalido!')
  };

  private handleSuccessfulLogin(userLogged: any) {
    //this.setCurrentUser(userLogged);
    this.commonService.setLoading(false);
    //this._router.navigate(['system-selector']);
  };

  private handleLoginError(error: any) {

    this.commonService.setLoading(false);
    this.notifyService.OnNotifyError('No tines permisos para ingresar, por favor ingrese con otra cuenta', '¡Usuario invalido!');
  };

}
