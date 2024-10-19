import { IPagination } from "@app/shared/interfaces/common/pagination.interface";
import IView_Lang from "./view_lang.interface";

export default interface IViewControl extends IPagination {
  id: number;
  create_date: Date;
  create_uid: number;
  write_date: Date;
  write_uid: number;
  view_id: number;
  view_control_type_id: number;
  short_name: string;
  description: string;
  template: string;
  active: boolean;

  labes: IView_Lang[];
}
