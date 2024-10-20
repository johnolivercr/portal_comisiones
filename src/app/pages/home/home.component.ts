import { Component } from '@angular/core';
import { HeaderTitleComponent } from "../../shared/components/header-title/header-title.component";
import { environment } from 'environments/environment';
import { IRequest } from 'app/shared/interfaces/common/request.interface';
import Operation from 'enums/operation.enum';
import { CommonService } from '../../shared/services/common/common.service';
import { UiService } from 'app/shared/services/ui/ui.service';
import { LangService } from 'app/shared/components/dropdown/lang/lang.service';
import ILang from '@app/shared/interfaces/lang/lang.interface';
import { LoginComponent } from './component/auth/login/login.component';
import { FooterComponent } from './component/layout/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HeaderTitleComponent, LoginComponent, FooterComponent]
})
export class HomeComponent {
  public lblTitle?: string = 'Bienvenid@ al portal de comisiones';
  public lblSubTitle?: string = '';

  constructor(
    private _commonService: CommonService,
    private readonly _uiService: UiService,
    private readonly langService: LangService
  ) {
    //this.onLoadConfiguration()
  }

  onLoadConfiguration = async () => {
    const langSubscribe = this.langService.getChangedLangSubject();
    langSubscribe.subscribe(async (lang: ILang) => {
      lang.id = 2;
      if (lang.id > 0) {
        this.lblTitle = await this._uiService.getLabelValue(
          environment.views.listEpicrisis.key,
          environment.views.listEpicrisis.controls.title
        );
        this.lblSubTitle = await this._uiService.getLabelValue(
          environment.views.listEpicrisis.key,
          environment.views.listEpicrisis.controls.subtitle
        );
      }
    });
  }

}
