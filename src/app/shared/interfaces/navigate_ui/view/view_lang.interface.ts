import { IPagination } from "@app/shared/interfaces/common/pagination.interface";

export default interface IViewLang extends IPagination {
    id: number;
    create_date: Date;
    create_uid: number;
    write_date: Date;
    write_uid: number;
    view_id: number;
    lang_id: number;
    view_control_id: number;
    text: string;
    active: boolean;

    lang_code: string;
}
