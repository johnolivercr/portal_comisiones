import Operation from "enums/operation.enum";

export interface IRequest {
    operation: Operation;
    data: any;
    microservice: string,
    method: string,
    audit?: any
};

export const _initRequestDefault = (): IRequest => {
    const _default: IRequest = {
        operation: Operation.DELETE,
        data: undefined,
        microservice: "",
        method: ""
    }

    return _default;
};

export interface IRequestGateway {
    microservice: string,
    method: string,
    data: any;
    audit: any
};

export interface IParameter {
    key: string;
    value: any;
};

export enum IDataType {
    JSON = 'JSON',
    XML = 'XML'
};
