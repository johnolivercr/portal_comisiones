import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CommonService } from '@app/service/common/*';
import { IRequest } from '@app/shared/interfaces/common/request.interface';
import { IResponse } from '@app/shared/interfaces/common/response.interface';
import { NotifyService } from '@app/shared/services/common/notify.service';
import { environment } from '@env/environment';
import { UserEntity } from 'app/core/entity/user.entity';
import { AuthService } from 'app/core/services/auth.service';
import Operation from 'enums/operation.enum';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-confirm-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './confirm-code.component.html',
  styleUrl: './confirm-code.component.scss'
})
export class ConfirmCodeComponent {
  loginForm: FormGroup;
  lblPhone: string = '**** ';
  constructor(
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService,
    private readonly notifyService: NotifyService,
    private readonly authService: AuthService,
    private readonly router: Router
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
    try {
      let request: IRequest = {
        operation: Operation.POST,
        data: {
          identification: identification
        },
        microservice: environment.microservice.engine.code,
        method: environment.microservice.engine.methods.getEmployed
      };
      this.commonService.setLoading(true);
      let response = await firstValueFrom(this.commonService.executeMethod(request));

      if (!response) {
        this.handleLoginFailure(response);
        return;
      }

      const { success, data } = response;
      if (!success || !data) {
        this.handleLoginFailure(response);
        return;
      }

      const userLogged: any = data;
      if (!userLogged) {
        this.handleLoginFailure(response);
        return;
      }

      this.handleSuccessfulLogin(userLogged);

    } catch (error: any) {
      debugger
      console.error('Error during login:', error.error);
      //this.handleLoginFailure(null, error);
    }
  }


  private async handleLoginFailure(response: IResponse) {
    this.commonService.setLoading(false);
    this.notifyService.OnNotifyError('No tines permisos para ingresar, por favor ingrese con otra cuenta', '¡Usuario invalido!')
  };

  private handleSuccessfulLogin(userLogged: any) {
    let _userLogged = userLogged[0];
    let user: UserEntity = new UserEntity();
    user.centroCosto = _userLogged?.CENTRO_COSTO ?? '';
    user.departamento = _userLogged?.DEPARTAMENTO ?? '';
    user.errorEntrar = _userLogged?.ERROR_ENTRAR ?? '';
    user.estadoEmpleado = _userLogged?.ESTADO_EMPLEADO ?? '';
    user.identificacion = _userLogged?.IDENTIFICACION ?? '';
    user.nombre = _userLogged?.Nombre ?? '';
    user.nombrePila = _userLogged?.NombrePILA ?? '';
    user.permiteEntrar = _userLogged?.PERMITE_ENTRAR ?? '';
    user.primerApellido = _userLogged?.PrimerApellido ?? '';
    user.segundoApellido = _userLogged?.SegundoApellido ?? '';
    user.sexo = _userLogged?.Sexo ?? '';
    user.tipoDeVendedor = _userLogged?.TIPO_DE_VENDEDOR ?? '';
    user.telefono1 = _userLogged?.Telefono1 ?? '';


    if (user.permiteEntrar !== "SI") return;

    this.authService.setCurrentUser(user);
    this.commonService.setLoading(false);
    this.router.navigate(['signin']);
  };

  private handleLoginError(error: any) {

    this.commonService.setLoading(false);
    this.notifyService.OnNotifyError('No tines permisos para ingresar, por favor ingrese con otra cuenta', '¡Usuario invalido!');
  };

}
