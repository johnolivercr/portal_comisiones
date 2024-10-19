export interface Column {
  field: string;
  label: string;
  icon: string;
  type: ColumnType;
  action?: (...args: any) => void;
  format: string;
  hide_on_mobile?: boolean;
}

export enum ColumnType {
  TEXT = 'TEXT',
  BUTTON = 'BUTTON',
  IMAGE = 'IMAGE',
  IMAGE_BUTTON = 'IMAGE_BUTTON',
  CHECKBOX = 'CHECKBOX',
  STATE = 'STATE',
}
