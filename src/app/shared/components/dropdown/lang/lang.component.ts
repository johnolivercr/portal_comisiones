import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../../services/common/common.service';
import { IRequest } from 'app/shared/interfaces/common/request.interface';
import { IResponse } from 'app/shared/interfaces/common/response.interface';
import ILang, { newInterfaceLang } from 'app/shared/interfaces/lang/lang.interface';
import { NotifyService } from 'app/shared/services/common/notify.service';
import { environment } from '@env/environment';
import Operation from 'enums/operation.enum';
import { firstValueFrom } from 'rxjs';
import { LangService } from './lang.service';
import { ErrorsHelper } from '@app/shared/helpers/errors.helper';
import { SpeechRecognizerService } from '@app/shared/services/web-apis/speech-recognizer.service';

@Component({
  selector: 'ngx-dropdown-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {
  @Input() color: string = '';

  public selectedLanguage: ILang = newInterfaceLang();
  public languages: ILang[] = [];

  constructor(
    private readonly _commonService: CommonService,
    private readonly notifyService: NotifyService,
    private readonly langService: LangService, 
    private readonly _errorHelper: ErrorsHelper,
    private readonly _speechRecognizerService: SpeechRecognizerService
  ) { }

  ngOnInit(): void {
    this.color = this.color === 'white' ? 'white' : '#112145';
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
      
      this.notifyService.OnNotifyError(error.message);
      this._errorHelper.getError(error.error.status_code.toString())
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

  private async executeLangRequest(request: IRequest):Promise<IResponse> {
    try {
      return await firstValueFrom(this._commonService.executeMethod(request));
    } catch (error: any) {
      console.error('Error executing Lang request:', error.message ?? error);
      throw error; // Re-throw the error to be caught by the outer catch block
    }

  }

  private mappingResponse = (response: IResponse) => {
    this._commonService.setLoading(false);

    if (response?.success && response.data) {
      const array: ILang[] = response.data;
      const selectedLang = array.find(item => item.default) ?? newInterfaceLang();
      this.languages = array;
      
      if (selectedLang.id !== 0) {
        this.selectedLanguage = selectedLang;
        this.langService.setChangedLangSubject(this.selectedLanguage);
      }
    }
  }

  onChangeLanguage(lang: any): void {
    this.selectedLanguage = lang;
    
    this._speechRecognizerService.setLanguage(lang.iso_code);
    this.langService.setChangedLangSubject(this.selectedLanguage);
  }
}
