import { IPagination } from "@app/shared/interfaces/common/pagination.interface";

export default interface IView extends IPagination {
    id: number;
    create_date: Date;
    create_uid: number;
    write_date: Date;
    write_uid: number;
    module_id: number;
    view_type_id: number;
    name: string;
    key: string;
    route: string;
    active: boolean;

    controls: string;

    system_uiid: string,
    lang_code: string;
}

export const newViewInterface = (): IView => {
    return {
        id: 0,
        create_date: new Date(),
        create_uid: 0,
        write_date: new Date(),
        write_uid: 0,
        module_id: 0,
        view_type_id: 0,
        name: '',
        key: '',
        route: '',
        active: false,

        controls: '',
        
        page_number: 0,
        rows_page: 0,
        total_row: 0,

        system_uiid: '',
        lang_code: ''
    }
}

