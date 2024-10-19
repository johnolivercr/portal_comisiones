import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingModule } from "./shared/components/loading/loading.module";
import { CommonService } from './shared/services/common/common.service';
import { firstValueFrom } from 'rxjs';
import { IRequest } from './shared/interfaces/common/request.interface';
import { IResponse } from './shared/interfaces/common/response.interface';
import { environment } from '@env/environment';
import ILang, { newInterfaceLang } from './shared/interfaces/lang/lang.interface';
import { LangService } from './shared/components/dropdown/lang/lang.service';
import { NotifyService } from './shared/services/common/notify.service';
import { ErrorsHelper } from './shared/helpers/errors.helper';
import Operation from 'enums/operation.enum';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LoadingModule]
})
export class AppComponent {
  title = 'corefrontendArthur';

  constructor(
    private _commonService: CommonService,
    private _langService: LangService,
    private notifyService: NotifyService,
    private _errorHelper: ErrorsHelper
  ) {
    this._commonService.setUseHearLoading(false)
  }

ngAfterViewInit(){
 this.onGetLang();
}


async onGetLang() {
  try {

    const lang = this.createLangObject();
    const request = this.createLangRequest(lang);
    const response = await this.executeLangRequest(request);

    this.mappingResponse(response);
    this._commonService.setUseHearLoading(false)
  } catch (error: any) {

    this.notifyService.OnNotifyError(error);
    //this._errorHelper.getError(error.error.status_code.toString())
  }
}


private createLangObject(): ILang {
  const lang: ILang = newInterfaceLang();
  lang.system_uuid = environment.system.uiid;
  lang.active = true;
  return lang;
}

private createLangRequest(lang: ILang): IRequest {
  return {
    operation: Operation.POST,
    data: {
      id: 0,
      system_id: 0,
      lang_id: 0,
      active: 1,
      page_number: 1,
      rows_page: environment.Number.MaxValue,
      system_uuid: environment.system.uiid
    },
    microservice: environment.microservice.engine.code,
    method: environment.microservice.engine.methods.getSystemLang,
  };
}

private async executeLangRequest(request: IRequest): Promise<IResponse> {
  try {
    return await firstValueFrom(this._commonService.executeMethod(request));
  } catch (error: any) {
    //console.error('Error executing Lang request:', error.message ?? error);
    throw error; // Re-throw the error to be caught by the outer catch block
  }

}

private mappingResponse = (response: IResponse) => {
  this._commonService.setLoading(false);

  if (response?.success && response.data) {
    const array: ILang[] = response.data;
    const selectedLang = array.find(item => item.default) ?? newInterfaceLang();
    if (selectedLang.id !== 0) {
      const selectedLanguage = selectedLang;
      this._langService.setChangedLangSubject(selectedLanguage);
    }
  }
}


}
