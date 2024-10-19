import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/shared/services/common/common.service';
import { environment } from '@env/environment';
import { newRequest } from 'app/shared/helpers/new-request';
import { newTokenObjValidate } from 'app/shared/helpers/new-request-object';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { firstValueFrom } from 'rxjs';
import { ErrorsHelper } from '@app/shared/helpers/errors.helper';
import { NotifyService } from '@app/shared/services/common/notify.service';
import { IResponse } from '@app/shared/interfaces/common/response.interface';
import ILang, { newInterfaceLang } from '@app/shared/interfaces/lang/lang.interface';
import Operation from 'enums/operation.enum';
import { IRequest } from '@app/shared/interfaces/common/request.interface';
import { LangService } from '@app/shared/components/dropdown/lang/lang.service';

@Component({
  selector: 'app-autologin',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './autologin.component.html',
  styleUrl: './autologin.component.scss',
})
export class AutologinComponent {
  messageShow = '';
  footerMessages = [
    'Verificando tu sesion',
    'Validando Roles',
    "Comprobando permisos",
    'Puedes tomar un cafe mientras esperas'
  ]
  mensajeActualIndex: number = 0;
  userToken: string = '';

  constructor(
    private _router: Router,
    private _commonService: CommonService,
    private route: ActivatedRoute,
    private _errorHelper: ErrorsHelper,
    private _notifyService: NotifyService,
    private _langService: LangService,
    private notifyService: NotifyService
  ) {

  }
  ngOnInit() {
    this.getMessage();
    // this.validateToken();
     this.route.queryParamMap.subscribe(params => {
       this.userToken = params.get('token') || '';

       if (this.userToken) {
         this.validateToken();

       }
     }); 
  }

  async validateToken() {
    try {
      const tokenObject = newTokenObjValidate(this.userToken);
      const request = newRequest(tokenObject, environment.microservice.auth.code, environment.microservice.auth.methods.validateToken);
      /* const response = await firstValueFrom(this._commonService.executeMethod(request));
       const response = await firstValueFrom(this._commonService.executeMethod(request));

       if (!response) {
         this.handleLoginFailure(response);

         return;
       }
       const { success, data } = response;
       if (!success || !data) {
        this.handleLoginFailure(response)
        return;
      } */
      setTimeout(() => {
        this._router.navigate(['home']);
      }, 8000);
    } catch (error: any) {

      this._errorHelper.getError(error.error.status_code.toString())
    }

  }

  getMessage() {
    setInterval(() => {
      this.mensajeActualIndex = (this.mensajeActualIndex + 1) % this.footerMessages.length;
    }, 1500);
  }




  private async handleLoginFailure(response: IResponse) {
    let getError = this._errorHelper.getError(response.status_code.toString());
    let errorConvert = JSON.parse(await getError);
    this._notifyService.OnNotifyErrorParams(errorConvert.text, errorConvert.title, errorConvert.icon);
  }

  options: AnimationOptions = {
    path: '/assets/json/Animation.json',
  };

  onLoopComplete(): void {
    NgZone.assertNotInAngularZone();
  }


}
