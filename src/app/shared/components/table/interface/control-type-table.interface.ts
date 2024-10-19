//import { IMultiLang } from "@app/shared/interfaces/common/multi-lang.interface";
import { Column } from "./column.interface";

export interface IControlTypeTable {
  title: any[];
  search: boolean;
  search_text: any[];
  columns: Column[];
}
