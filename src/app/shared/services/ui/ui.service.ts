import { Injectable } from '@angular/core';
import IView, {
  newViewInterface,
} from '../../interfaces/navigate_ui/view/view.interface';
import { IRequest } from '@app/shared/interfaces/common/request.interface';

import { firstValueFrom } from 'rxjs';
import Operation from 'enums/operation.enum';
import { CommonService } from '../common/common.service';
import { environment } from '@env/environment';
import { LangService } from '@app/shared/components/dropdown/lang/lang.service';
import IViewControl from '@app/shared/interfaces/navigate_ui/view/view_control.interface';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(
    private readonly _commonService: CommonService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _langService: LangService
  ) {}

  configureScreen = async (key: string): Promise<IViewControl[]> => {
    const { code } = this._langService.getCurrentLang();
    // if (!code) return [];
    const uiid: string = environment.system.uiid;

    const view = this.createViewObject();
    view.system_uiid = uiid;
    view.key = key;
    view.lang_code = code??"es_CR";



    const request = this.createViewRequest(view);
    const response = await this.executeViewRequest(request);
    return this.mappingInterface(response);
  };


  private createViewObject(): IView {
    const view: IView = newViewInterface();

    return view;
  }

  private createViewRequest(view: IView): IRequest {
    return {
      operation: Operation.POST,
      data: {
        id: view.id,
        module_id: view.module_id,
        view_type_id: view.view_type_id,
        name: view.name,
        key: view.key,
        route: view.route,
        active: 1,
        page_number: 1,
        rows_page: environment.Number.MaxValue,
        system_guiid: view.system_uiid,
        lang_code: view.lang_code,
      },
      microservice: environment.microservice.engine.code,
      method: environment.microservice.engine.methods.getView,
    };
  }

  private async executeViewRequest(request: IRequest) {
    try {
      return await firstValueFrom(this._commonService.executeMethod(request));
    } catch (error) {
      console.error('Error executing login request:', error);
      throw error; // Re-throw the error to be caught by the outer catch block
    }
  }

  private getCacheMemory = (key: string): IViewControl[] => {
    const { code } = this._langService.getCurrentLang();
    const data: IViewControl[] = this._localStorageService.onGetData(
      `${key}-${code}`
    );
    if (!data) return [];

    return data;
  };

  private mappingInterface = (response: any): IViewControl[] => {
    const { data } = response;
    const array: IView[] = data;
    const view: IView = array[0];
    const { controls } = view;
    const ctrls: IViewControl[] = JSON.parse(controls);
    this._localStorageService.onSetData(`${view.key}-${view.lang_code}`, ctrls);
    return ctrls;
  };

  async getLabelValue(view: string, control: string): Promise<string> {
    const cache = this.getCacheMemory(view);
    const cachedLabel = this.getCachedLabel(cache, control);
    if (cachedLabel) {
      this._commonService.setUseHearLoading(false)
      return cachedLabel;
    }

    const viewControls: IViewControl[] = await this.configureScreen(view);
    const controlItem = this.findControlItem(viewControls, control);
    this._commonService.setUseHearLoading(false)
    return controlItem?.labes.find((label: { lang_code: any; }) => label.lang_code)?.text ?? '';
  }

  async getCarouselValue(view: string, control: string): Promise<string> {
    const cache = this.getCacheMemory(view);

    const cachedCarousel = this.getCachedCarousel(cache, control);
    if (cachedCarousel) {
      this._commonService.setUseHearLoading(false)

      return this.filterByLanguage(cachedCarousel);
    }

    const viewControls: IViewControl[] = await this.configureScreen(view);
    const controlItem = this.findControlItem(viewControls, control);
    this._commonService.setUseHearLoading(false)
    return this.filterByLanguage(controlItem?.template ?? '') ;
  }

  private getCachedLabel(
    cache: IViewControl[],
    control: string
  ): string | undefined {
    if (cache.length > 0) {
      const item = cache.find((item) => item.short_name === control);
      const label = item?.labes.find((label) => label.lang_code)?.text;
      return label ?? control;
    }

    return undefined;
  }

  private getCachedCarousel(
    cache: IViewControl[],
    control: string
  ): string | undefined {
    if (cache.length > 0) {
      const item = cache.find((item) => item.short_name === control);
      return item?.template ?? '';
    }

    return undefined;
  }

  private filterByLanguage = (carousel: string) => {
    const json: any = JSON.parse(carousel);
    const { code } = this._langService.getCurrentLang();

    if (json && json.slider) {
      const filteredSliders = json.slider.map((slider: any) => {
        const title = slider.title_1.find((t: any) => t.code === code);
        const title_2 = slider.title_2.find((t: any) => t.code === code);
        const text_description = slider.text_description.find((t: any) => t.code === code);
        const text_price = slider.text_price.find((t: any) => t.code === code);
        const text_price_cd = slider.text_price_cd.find((t: any) => t.code === code);
        const text_more_info = slider.text_more_info.find((t: any) => t.code === code);
        const label_btn = slider.label_btn.find((t: any) => t.code === code);
        const link_btn = slider.link_btn.find((st: any) => st.code === code);

        return {
          name: slider.name,
          text: slider.text,
          img_type: slider.img_type,
          img: slider.img,
          action: slider.action,
          title_1: title ? title.value : null,
          title_2:title_2 ? title_2.value : null,
          text_description:text_description ? text_description.value : null,
          text_price:text_price ? text_price.value : null,
          text_price_cd:text_price_cd ? text_price_cd.value : null,
          text_more_info:text_more_info ? text_more_info.value : null,
          label_btn:label_btn ? label_btn.value : null,
          link_btn:link_btn ? link_btn.value : null
        };
      });

      return {
        name: json.name,
        arrows_navigation: json.arrows_navigation,
        interval: json.interval,
        interval_time: json.interval_time,
        carousel_wrap: json.carousel_wrap,
        slider: filteredSliders,
      };
    }

    return json;
  };

  private findControlItem(
    viewControls: IViewControl[],
    control: string
  ): IViewControl | undefined {
    return viewControls.find((item) => item.short_name === control);
  }
}
