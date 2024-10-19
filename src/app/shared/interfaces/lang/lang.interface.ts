import { IPagination } from '../common/pagination.interface';

export default interface ILang extends IPagination {
    id: number;
    create_date: Date;
    create_uid: number;
    write_date: Date;
    write_uid: number;
    short_name: string;
    code: string;
    icon: string;
    iso_code: string;
    date_format: string;
    active: boolean;

    system_uuid: string;
    default: boolean;
}

export const newInterfaceLang = (): ILang => {
    return {
        id: 0,
        create_date: new Date(),
        create_uid: 0,
        write_date: new Date(),
        write_uid: 0,
        short_name: '',
        code: '',
        icon: '',
        iso_code: '',
        date_format: '',
        active: false,

        page_number: 0,
        rows_page: 0,
        total_row: 0,
        system_uuid: '',
        default: false
    }
}
