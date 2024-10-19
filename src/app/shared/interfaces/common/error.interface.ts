import { HttpErrorResponse } from "@angular/common/http";

export interface IError extends HttpErrorResponse {
    error: {
        status: boolean,
        message: string
    }
}