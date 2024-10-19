import { environment } from "../../../environments/environment.prod";
import * as CryptoJS from 'crypto-js';

export class Utils {


    /**
     *
     * @param value
     * @returns
     */
    static encripData(value: any) {
        let text = CryptoJS.enc.Utf8.parse(value);
        let Key = CryptoJS.enc.Utf8.parse(environment.secret_key);
        let IV = CryptoJS.enc.Utf8.parse(environment.ivEncrypt);
        let encryptedText = CryptoJS.AES.encrypt(text, Key, { keySize: 128 / 8, iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encryptedText.toString();
    }

    static decryptData = (data: string) => {
        const Key = CryptoJS.enc.Utf8.parse(environment.secret_key);
        const IV = CryptoJS.enc.Utf8.parse(environment.ivEncrypt);
        const desencript: any = CryptoJS.AES.decrypt(data, Key, {
            keySize: 128 / 8,
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        const originalText = desencript.toString(CryptoJS.enc.Utf8);
        const decryptedData = JSON.parse(originalText)

        return decryptedData;
    }

    static parseJsonData(data: string): any | null {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return null;
        }
      }
}
