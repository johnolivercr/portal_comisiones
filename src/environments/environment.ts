// TODO: add environment config

import { HttpHeaders } from '@angular/common/http';
import { localStorageConfig } from '../config/localStorage';
import { microservices } from 'config/microservices';
import { views } from 'config/views';
import { bedrock } from 'config/bedrock';

export const environment = {
    production: false,
    system: {
        uiid: import.meta.env.NG_APP_SYSTEM_UIID,
        types: {
          internal: import.meta.env.NG_APP_SYSTEM_TYPE_INTERNAL,
          external: import.meta.env.NG_APP_SYSTEM_TYPE_EXTERNAL,
          core: import.meta.env.NG_APP_SYSTEM_TYPE_CORE
        }
      },
      httpOptions: {
        headers: new HttpHeaders({
          'Content-Type': import.meta.env.NG_APP_HEADERS_CONTENT_TYPE,
          'Access-Control-Allow-Origin': import.meta.env.NG_APP_HEADERS_ORIGIN,
          'gmon-key': import.meta.env.NG_APP_HEADERS_API_KEY,
        }),
      },
      apiGateway: import.meta.env.NG_APP_BASE_URL_GATEWAY,
      secret_key: import.meta.env.NG_APP_BASE_SECRET_KEY,
      ivEncrypt: import.meta.env.NG_APP_BASE_IV_ENCRYPT,
    Number: {
        MaxValue: 2147483647,
    },
    ...localStorageConfig,
    ...microservices,
    ...views,
    ...bedrock
};
