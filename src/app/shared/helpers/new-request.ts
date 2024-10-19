import Operation from 'enums/operation.enum';
import { IRequest } from '../interfaces/common/request.interface';

export const newRequest = (data: any, microservice: string, method: string): IRequest => {
    return {
        operation: Operation.POST,
        data,
        microservice,
        method
    }

}
