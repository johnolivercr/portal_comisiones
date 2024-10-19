import { Injectable } from '@angular/core';
import ILang, { newInterfaceLang } from 'app/shared/interfaces/lang/lang.interface';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LangService {
    private onChangedLang = new BehaviorSubject<ILang>(newInterfaceLang());

    constructor(private readonly _localStorageService: LocalStorageService) { }
    getChangedLangSubject = (): Observable<ILang> => {
        return this.onChangedLang.asObservable();
    };

    setChangedLangSubject = (newValue: ILang): void => {
        
        this._localStorageService.onSetData('current_language', newValue);
        if (newValue)
            this.onChangedLang.next(newValue);
    };

    getCurrentLang = (): ILang => {
        const data: ILang = this._localStorageService.onGetData('current_language');
        return data ?? newInterfaceLang();
    }

}
