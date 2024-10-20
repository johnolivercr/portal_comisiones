// Define the type of the environment variables.
declare interface Env {
  readonly NODE_ENV: string;

  //SYSTEM
  readonly NG_APP_SYSTEM_UIID: string;
  readonly NG_APP_SYSTEM_TYPE_INTERNAL: string;
  readonly NG_APP_SYSTEM_TYPE_EXTERNAL: string;
  readonly NG_APP_SYSTEM_TYPE_CORE: string;

  //HEADERS
  readonly NG_APP_HEADERS_CONTENT_TYPE: string;
  readonly NG_APP_HEADERS_ORIGIN: string;
  readonly NG_APP_HEADERS_API_KEY: string;

  //APP_BASE
  readonly NG_APP_BASE_URL_GATEWAY: string;
  readonly NG_APP_BASE_SECRET_KEY: string;
  readonly NG_APP_BASE_IV_ENCRYPT: string;

  //MICROSERVICE_ENGINE
  readonly NG_APP_MICROSERVICE_ENGINE_CODE: string;
  readonly NG_APP_MICROSERVICE_ENGINE_METHOD_GET_VIEW: string;
  //MICROSERVICE_AUTH
  readonly NG_APP_MICROSERVICE_AUTH_CODE: string;
  readonly NG_APP_MICROSERVICE_METHOD_LOGIN_BY_USER: string;
}

// Choose how to access the environment variables.
// Remove the unused options.

// 1. Use import.meta.env.YOUR_ENV_VAR in your code. (conventional)
declare interface ImportMeta { readonly env: Env; }

// 2. Use _NGX_ENV_.YOUR_ENV_VAR in your code. (customizable)
// You can modify the name of the variable in angular.json.
// ngxEnv: {
//  define: '_NGX_ENV_',
// }
declare const _NGX_ENV_: Env;

// 3. Use process.env.YOUR_ENV_VAR in your code. (deprecated)
declare namespace NodeJS { export interface ProcessEnv extends Env {} }
