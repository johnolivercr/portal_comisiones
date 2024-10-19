// TODO: add environment config

import { HttpHeaders } from '@angular/common/http';
import { bedrock } from 'config/bedrock';
import { localStorageConfig } from 'config/localStorage';
import { microservices } from 'config/microservices';
import { views } from 'config/views';

export const environment = {
    production: false,
    version: '1.0.0',
    httpOptions: {
        headers: new HttpHeaders({ // TODO: check if this config will be the same for this project
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'gmon-key': '467c36b5-01dd-44d5-8e2a-88e796412b4c',
        }),
    },
    system: {
        uiid: '9bbfd39b-ad38-41d8-b323-ccf59f155a3a' // TODO: Change system uuid
    },
    //apiGateway: 'https://uat-coregateway.gmontecristo.com/core/api/v1/gateway/execute',
    apiGateway: 'http://localhost:3000/core/api/v1/gateway/execute',
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
