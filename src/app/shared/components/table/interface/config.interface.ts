import { MatTableDataSource } from "@angular/material/table"
import { Column } from "./column.interface";

export interface Config{
    title?: string;
    subTitle?: string;
    toolbar?: {
        display: boolean;
        buttons: IButton[]
    };
    displayedColumns: Column[],
    tableHeight?: string
}

export interface IButton{
    text:string,
    action?: (...args: any) => void,
    icon: string
}



//export interface
