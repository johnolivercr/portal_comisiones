import { IPagination } from "../common/pagination.interface";


export default interface IPatient extends IPagination
{
    id: number,
    short_name: string,
    code: string,
    create_date: Date,
    program_date: Date,
    active: string
}


export const newInterfaceUser = (): IPatient => {
  return {
      id: 0,
      short_name: '',
      code: '',
      create_date: new Date(),
      program_date: new Date(),
      active: '',

      page_number: 0,
      rows_page: 0,
      total_row: 0

  }
}
