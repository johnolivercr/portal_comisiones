// import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { LoggerService } from './logger.service';
import Swal from 'sweetalert2';
import { IError } from 'app/shared/interfaces/common/error.interface';
declare var $: any;
/// Notify users about errors and other helpful stuff
export interface Msg {
  content: string;
  style: string;
}

@Injectable({ providedIn: 'root' })
export class NotifyService {

  constructor(
    public location: Location,
    private logger: LoggerService,
    // private _commonService: CommonService
  ) { }

  OnError = (response: IError) => {

    const { error } = response;
    let message: any = error.message && error.message != undefined ? error.message : response.message;
    const isObject = typeof message === "object";
    message = isObject ? message.name : message;
    // this._commonService._setLoading(false);
    this.OnNotifyError(message);
    this.logger.error(message);
  };

  onNotifySuccess = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Se agregó de forma exitosa el contacto!'
    });
  };

  onNotifyCustomMessageSuccess = (message: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: 'success',
      title: message
    });
  };

  OnNotifyError = (message:string) => {
    const customContent = `
    <div class="modal-custom-general">
      <h2 class="title">Parece que ocurrio un error</h2>
      <p class="subtitle mb-0">${message}</p>
    </div>
  `;
  
    Swal.fire({
      position: 'center',
      html: customContent,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
      showCancelButton: true,
      denyButtonText: 'Cancelar'
    });

  };

  OnNotifyErrorParams = (message: string, title: string, image: string) => {
    const customContent = `
    <div class="modal-custom-general">
      <h2 class="title">${title}</h2>
      <img src="./assets/${image}" alt="Imagen icon" class="img">
      <p class="subtitle mb-0">${message}</p>
    </div>
  `;
    Swal.fire({
      position: 'center',
      html: customContent,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
      showCancelButton: true,
      denyButtonText: 'Cancelar'
    });

  };

  OnSendMessageResetPassword = (email: string) => {
    const customContent = `
    <div class="modal-custom-general">
      <h2 class="title mb-3">Mensaje enviado</h2>
      <p class="subtitle mb-0">Enviamos un correo electrónico a <span class="email-send-message">${email}</span> con un enlace para restablecer la contraseña.</p>
    </div>
  `;
    Swal.fire({
      position: 'center',
      html: customContent,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar'
    });

  };

  OnNotifyWarning = (message: string) => {

    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 30000,
      timerProgressBar: true,
    });

  };

  OnNotifyInfoMessage = (message: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: 'info',
      title: message
    });
  };

  OnNotifyInfo = (title: string, text: string) => {
    Swal.fire({
      title: title,
      html: `<p style="text-align: justify; font-size: 13px;">${text}<\p>`
    });
  }
  OnNotifyHtmlInfo = (title: string, text: string) => {
    Swal.fire({
      title: title,
      html: `${text}`
    });
  }

  OnNotifyConfirmDelete = (message: string) => {
    Swal.fire({
      title: message,
      text: "",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Si, eliminar registro!",
      cancelButtonText: "No, cancelar por favor!",

    }).then((result) => {
      if (result.value) {

      }
    });
  }

  onLocationRequest = (message: string) => {

    let agreeBtn = ' <article class="d-flex justify-content-center align-intem-center"> <span class="material-symbols-outlined location-icon" (click)="onLocationRequest()" >location_on </span> Activar ubicación </article>'

    const customContent = `
    <div class="modal-custom-general">
      <h2 class="title">Activando tu ubicación</h2>
      <img src="./assets/images/svgs/location-icon.svg" alt="Imagen icon" class="img">
      <p class="subtitle mb-0">${message}</p>
    </div>
  `;
    Swal.fire({
      position: 'center',
      html: customContent,
      showConfirmButton: true,
      confirmButtonText: agreeBtn,
      showCancelButton: true,
      cancelButtonText: 'Ahora no',
      width: '45vh'
    });

  };

  
}
