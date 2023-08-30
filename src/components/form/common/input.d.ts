export interface InputProps {
  name: string;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  value?: any;
  type?: string;
  readonly?: boolean;
  required?: boolean;
  onStateChange?: (...args:any[]) => any;
  optionLabel?: string;
  optionValue?: string;
  keyfilter?: any;
  customFunction?: any;
  data?: any;
  ulClassName?: any;
  max?: any;
  selectionMode?: any;
  dateFormat?: any;
  view?: any;
  icon?: any;
  showIcon?: boolean;
  iconPos?: any;
  maxDate?: date;
  minDate?: date;
  rows?: any;
}
