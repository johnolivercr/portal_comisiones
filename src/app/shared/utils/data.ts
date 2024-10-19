import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/auth/user/user.interface';

export interface ICustonSelect {
  key: string;
  value: string;
  isSelected: boolean;
}

const _arrayMonths: ICustonSelect[] = [
  { key: 'ENERO', value: '1', isSelected: false },
  { key: 'FEBRERO', value: '2', isSelected: false },
  { key: 'MARZO', value: '3', isSelected: false },
  { key: 'ABRIL', value: '4', isSelected: false },
  { key: 'MAYO', value: '5', isSelected: false },
  { key: 'JUNIO', value: '6', isSelected: false },
  { key: 'JULIO', value: '7', isSelected: false },
  { key: 'AGOSTO', value: '8', isSelected: false },
  { key: 'SEPTIEMBRE', value: '9', isSelected: false },
  { key: 'OCTUBRE', value: '10', isSelected: false },
  { key: 'NOVIEMBRE', value: '11', isSelected: false },
  { key: 'DICIEMBRE', value: '12', isSelected: false },
];

// const _user: IUser[] = [{
//   userId: 0,
//   creation_User: '',
//   creation_Date: new Date(),
//   modification_User: '',
//   modification_Date: new Date(),
//   user_Name: 'john.quesada@grupopromerica.com',
//   first_Name: 'John',
//   last_Name: 'Quesada',
//   full_Name: 'Chaves',
//   email: 'john.quesada@grupopromerica.com',
//   phone: '50686691755',
//   login_Attempts: 0,
//   last_Password_Changed: new Date(),
//   last_Login_Date: new Date()
// }];

@Injectable({ providedIn: 'root' })
export class CatalogByQuestion {

  getMonths(): ICustonSelect[] {
    return _arrayMonths;
  };

  getUser(): IUser[] {
    return [
      
    ];
  }

}
