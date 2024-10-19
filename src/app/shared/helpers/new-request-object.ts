import { environment } from '@env/environment';

export const newRequestObject = () => {
    return {
        login: '208580468',
        password: 'ABC123xyz',
        systemId: environment.system.uiid,
    }
}

export const newTokenObjValidate = (token: string) => {
    return {
        token,
        systemId: environment.system.uiid,
    }

}