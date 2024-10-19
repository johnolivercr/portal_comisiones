import { Injectable } from '@angular/core';
import { UiService } from '../services/ui/ui.service';
import { environment } from '@env/environment';
@Injectable({
  providedIn:'root'
})
export class ErrorsHelper{
  constructor(
    private readonly _uiService: UiService,
  ){}

  getError = async (pcode:string) => {
    const controlError : any = environment.views.errors.controls;
    let error = await this._uiService.getLabelValue(
      environment.views.errors.key,
      controlError[pcode]
    );
    if(!error){
      error = await this._uiService.getLabelValue(
        environment.views.errors.key,
        controlError['400']
      );
    }
    return error;
  }
}
