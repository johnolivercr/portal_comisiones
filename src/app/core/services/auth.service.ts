import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@env/environment";
import { LocalStorageService } from "./local-storage.service";
import { UserEntity } from "../entity/user.entity";
import { Utils } from "@app/shared/utils/utils";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private _router: Router,
        private readonly _localStorageService: LocalStorageService) {

    }
    setCurrentUser(currentUser: any) {
        this._localStorageService.onSetData(
            environment.localStorage.currentUserTC,
            currentUser
        );

        //this.currentUserSubject.next(currentUser);
    }

    get currentUserValue(): UserEntity {
        const user = this._localStorageService.onGetData(
          environment.localStorage.currentUserTC
        );
        return Utils.decryptData(user);
      }
}