// TODO: add environment config

import { HttpHeaders } from '@angular/common/http';
import { localStorageConfig } from '../config/localStorage';
import { microservices } from 'config/microservices';
import { views } from 'config/views';
import { bedrock } from 'config/bedrock';

export const environment = {
    production: true,
    version: '1.0.0',
    httpOptions: {
        headers: new HttpHeaders({ // TODO: check if this config will be the same for this project
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'gmon-key': '18556FAC-863A-46CB-A3C7-FD723B7688E5',
        }),
    },
    system: {
        uiid: '5D9F90CE-FEA4-4E21-986E-9708AB9B0299',
    },
    apiGateway: 'https://uat-coregateway.gmontecristo.com/core/api/v1/gateway/execute',
    //apiGateway: 'http://localhost:3000/core/api/v1/gateway/execute',
    secret_key: '1i+GqDBmuQadWzLKs7JDwA==',
    ivEncrypt: '2314345645678765',
    Number: {
        MaxValue: 2147483647,
    },
    ...localStorageConfig,
    ...microservices,
    ...views,
    ...bedrock
};
