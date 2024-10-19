export interface IResponse {
    status_code: number;
    success: boolean;
    message: string;
    data_type: IDataType;
    params: any,
    data: any;
    
}

export enum IDataType {
    JSON = 'JSON',
    XML = 'XML'
}