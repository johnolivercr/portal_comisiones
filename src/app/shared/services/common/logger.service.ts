import { Injectable } from '@angular/core';
const logLevel: string = 'INFO';
@Injectable({ providedIn: 'root' })
export class LoggerService {
  private logLevel: number = 3;
  constructor() { }

  initilaizeLoger() {

    // if (logLevel !== undefined) {

    //   //if (typeof this.appConfigService.getConfig().logLevel === 'string') {

    //   if (logLevel.length > 0) {
    //     if (logLevel.toUpperCase() === "ERROR") {
    //       console.info('%c ### DSHBRD [LOGGER-SERV] Log Level: ERROR ', 'color: #1a73e8');
    //       this.logLevel = 0
    //     } else if (logLevel.toUpperCase() === "WARN") {
    //       console.info('%c ### DSHBRD [LOGGER-SERV] Log Level: WARN ', 'color: #1a73e8');
    //       this.logLevel = 1
    //     } else if (logLevel.toUpperCase() === "INFO") {
    //       console.info('%c ### DSHBRD [LOGGER-SERV] Log Level: INFO ', 'color: #1a73e8');
    //       this.logLevel = 2
    //     } else if (logLevel.toUpperCase() === "DEBUG") {
    //       console.info('%c ### DSHBRD [LOGGER-SERV] Log Level: DEBUG ', 'color: #1a73e8');
    //       this.logLevel = 3
    //     } else if (logLevel.toUpperCase() !== "ERROR" || logLevel.toUpperCase() === "WARN" || logLevel.toUpperCase() !== "INFO" || logLevel.toUpperCase() !== "DEBUG") {
    //       console.error('logLevel has no valid value!')
    //       this.logLevel = 3 // debug
    //     // }
    //     } else {
    //       console.error('logLevel has an empty value! Will be used the Debug log level ')
    //       this.logLevel = 3 // debug
    //     }
    //   } else {
    //     console.error('logLevel is not a string. Will be used the Debug log level. See the tiledesk-dashboard README.md available on https://github.com/Tiledesk/tiledesk-dashboard#dashboard-configjson')

    //     this.logLevel = 3 // debug
    //   }
    //   // || config.loggingLevel.length === 0
    // }
  }

  error(...message: any[]) {
    // if (this.logLevel >= ILogLevel.ERROR) {
    //   console.error(message)
    // }
  }

  warn(...message: any[]) {
    // if (this.logLevel >= ILogLevel.WARN) {
    //   console.warn(message)
    // }
  }

  info(...message: any[]) {
    // if (this.logLevel >= ILogLevel.INFO) {
    //   console.info(message)
    // }
  }

  debug(...message: any[]) {
    // if (this.logLevel >= ILogLevel.DEBUG) {
    //   console.debug(message)
    // }
  }

  log(...message: any[]) {
    // if (this.logLevel >= ILogLevel.DEBUG) {
    //   console.log(message)
    // }
  }
}
