import { Injectable } from "@angular/core";
import { LocalStorageRefService } from "./local-storage-ref.service";
import { Utils } from "../../shared/utils/utils";
//import { LoggerService } from "@app/shared/services/common/logger.service";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class LocalStorageService {

    private version: string = environment.version;
    private storage: Storage;
    constructor(
        _localStorageRefService: LocalStorageRefService,
        //private _loggerService: LoggerService,
    ) {
       // _loggerService.log(`[LOCAL-STORAGE-SERV] === Welcome LocalStorage service === version: ${this.version}`);
        this.storage = _localStorageRefService.localStorage;
    }

    onSetData = (key: string, data: any) => {
       // this._loggerService.log(`[LOCAL-STORAGE-SERV] »> onSetData »> key: ${key}, data: ${data}`);
        const jsonData = JSON.stringify(data)
        const encryptValue: string = Utils.encripData(jsonData);
        const encryptKey: string = Utils.encripData(key);
        this.storage.setItem(encryptKey, encryptValue)
    }

    getDataArrayDecrypt(key: string): any[] {
      const encryptKey: string = Utils.encripData(key);
      const dataLocal = localStorage.getItem(encryptKey);
      let data: any[] = [];
      if (dataLocal) {
        JSON.parse(dataLocal).forEach((item: any) => {
          const jsonData = Utils.decryptData(item ?? "");
          data.push(jsonData);
        });
      }
      return data.length > 0 ? data : [];
    }

    getDataArrayEncript(key: string): any {
      const encryptKey: string = Utils.encripData(key);
      const encryptData = localStorage.getItem(encryptKey);
      return encryptData;
    }


    setDataArray(key: string, value: any): void {
      let dataLocal:any = this.getDataArrayEncript(key);
      let data: any[] = [];
      let dataEncript: any[] = [];
      if (dataLocal) {
        JSON.parse(dataLocal).forEach((item: any) => {
          dataEncript.push(item);
          const jsonData = Utils.decryptData(item ?? "");
          data.push(jsonData);
        });
      }
      const isDuplicate = data.some((item: any) => {
        return item.id === value.id;
      });
      if (!isDuplicate) {
        data = dataEncript;
        const jsonString = JSON.stringify(value);
        const encryptKey: string = Utils.encripData(key);
        const encryptValue: string = Utils.encripData(jsonString);
        data.push(encryptValue);
        localStorage.setItem(encryptKey, JSON.stringify(data));
      }
    }

    onRemoveArray = (key: string, value: any) => {
      let dataLocal:any = this.getDataArrayDecrypt(key);
      const encryptKey: string = Utils.encripData(key);
      let data: any[] = [];
      dataLocal.forEach((item: any) => {
        if(item.position !== value){
          const jsonString = JSON.stringify(item);
          const encryptValue: string = Utils.encripData(jsonString);
          data.push(encryptValue);
        }
      });

        this.storage.removeItem(encryptKey)
        localStorage.setItem(encryptKey, JSON.stringify(data));
  }

    onGetData = (key: string): any => {
        //this._loggerService.log(`[LOCAL-STORAGE-SERV] »> onGetData »> key: ${key}`);
        const encryptKey: string = Utils.encripData(key)
        const encryptValue = this.storage.getItem(encryptKey);
        const jsonData: string = encryptValue ? Utils.decryptData(encryptValue ?? "") : "";
        return jsonData;
    }

    onRemoveData = (key: string) => {
        //this._loggerService.log(`[LOCAL-STORAGE-SERV] »> onRemoveData »> key: ${key}`);

        const encryptKey: string = Utils.decryptData(key);
        this.storage.removeItem(encryptKey)
    }

    onClearAllLocalStorage() {
        //this._loggerService.log(`[LOCAL-STORAGE-SERV] »> onClearAllLocalStorage`);
        const currentLanguage = this.onGetData(environment.localStorage.currentLanguage);
        const rememberInfo = this.onGetData(environment.localStorage.rememberInfo);
        const userIdentification = this.onGetData(environment.localStorage.userIdentification);
        const firstTimeOnboarding = this.onGetData(environment.localStorage.firstTimeOnboarding);
        const backup = [
            {
                data: currentLanguage,
                key: environment.localStorage.currentLanguage
            },
            {
                data: rememberInfo,
                key: environment.localStorage.rememberInfo
            },
            {
                data: userIdentification,
                key: environment.localStorage.userIdentification
            },
            {
                data: firstTimeOnboarding,
                key: environment.localStorage.firstTimeOnboarding
            }
        ]

        this.storage.clear();
        this.backupStorage(backup);
    }

    backupStorage(data: any) {

        data.forEach((element: any) => {
            this.onSetData(element.key, element.data)
        });
    }

}
