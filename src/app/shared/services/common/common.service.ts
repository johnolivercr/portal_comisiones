import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import Operation from "enums/operation.enum";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { NotifyService } from "./notify.service";
import { IRequest, IRequestGateway } from "app/shared/interfaces/common/request.interface";
import { LocalStorageService } from "app/core/services/local-storage.service";
import { Utils } from "app/shared/utils/utils";
//import { DataCryptService, LocalStorageService } from "@grupomontecristo/services";

@Injectable({ providedIn: "root" })
export class CommonService {

  private loading = new BehaviorSubject(false);
  loadingService = this.loading.asObservable();
  private useHeartLoading = new BehaviorSubject(true);
  useHeartLoadingService = this.useHeartLoading.asObservable();
  private activeRequests: number = 0;
  secretKey = environment.secret_key;
  ivEncrypt = environment.ivEncrypt;
 // _localStorageService = new LocalStorageService(this.secretKey, this.ivEncrypt);

  constructor(
    private http: HttpClient,
    private notifyService: NotifyService,
    private _localStorageService: LocalStorageService
  ) {

  }

  private increaseActiveRequests() {
    this.activeRequests++;
    this.loading.next(true); // Muestra el indicador de carga
  }

  private decreaseActiveRequests() {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.loading.next(false); // Oculta el indicador de carga cuando no hay solicitudes activas
    }
  }
  /**
   * Método para habilitar o deshabilitar la carga.
   * @param item
   */
  setLoading(item: boolean) {
    if (window.navigator.onLine) {
      if (item) {
        this.increaseActiveRequests();
      } else {
        this.decreaseActiveRequests();
      }
    } else {
      this.loading.next(false);
    }
  }

  setUseHearLoading(value: boolean) {
    this.useHeartLoading.next(value);
  }

  /**
   * Método para ejecutar todas las peticiones a la API.
   * @param request
   * @returns
   */
  executeMethod(request: IRequest): Observable<any> {
    const { operation, data, microservice, method } = request;
    const httpOptions = this.createHttpOptions(microservice, method);
    request = this.mapingAuditParameter(request);
    const requestGateway = this.createRequestGateway(request);
    switch (operation) {
      case Operation.PUT:
      case Operation.POST:
        return this.sendRequest('post', `${environment.apiGateway}`, requestGateway, httpOptions);
      case Operation.GET:
        const params = this.createHttpParams(data);
        return this.sendRequest('get', `${environment.apiGateway}`, null, httpOptions, params);
      case Operation.DELETE:
        return this.sendRequest('delete', `${environment.apiGateway}/${data}`, null, httpOptions);
      default:
        return throwError('Operation not supported.');
    }
  }

  private createHttpOptions(microservice: string, method: string): HttpHeaders {
    let httpOptions = environment.httpOptions.headers;
    httpOptions = httpOptions.append("gmon-microservice", microservice);
    httpOptions = httpOptions.append("gmon-method", method);
    return httpOptions;
  }

  private createHttpParams(data: { [key: string]: any }): HttpParams {
    let params = new HttpParams();
    Object.keys(data).forEach(key => {
      params = params.append(key, data[key]);
    });
    return params;
  }

  private sendRequest(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    body: any | null,
    headers: HttpHeaders,
    params?: HttpParams
  ): Observable<any> {
    const options = { headers, params };
    this.setLoading(true);
    return this.http.request(method, url, {
      ...options,
      body
    }).pipe(
      catchError(error => {
        return throwError(() => error.message ?? error.error.message);
      }),
      finalize(() => {
        this.setLoading(false);
      })
    );
  }

  private mapingAuditParameter = (request: IRequest): IRequest => {
    request.audit = {};
    request.audit.user = this._localStorageService.onGetData(environment.localStorage.currentUserTC) ?? '';
    request.audit.execution_mode = 0;
    request.audit.option = 0;
    request.audit.external_identifier = '';
    request.audit.ip = this._localStorageService.onGetData(environment.localStorage.ipAddress) ?? '';
    request.audit.device = this._localStorageService.onGetData(environment.localStorage.deviceInfo) ?? '';

    return request;
  }



  private createRequestGateway(request: IRequest): IRequestGateway {
    const { data, audit } = request;

    const _request: IRequestGateway = {
      microservice: request.microservice,
      method: request.method,
      data: Utils.encripData(JSON.stringify(data)),
      audit: Utils.encripData(JSON.stringify(audit ?? ''))
    };

    return _request;
  }

  /**
   * Método para mostrar un mensaje de error.
   * @param error
   */
  showError(error: any) {

    this.notifyService.OnNotifyError(error.error.message);
    this.setLoading(false);
  }
}
