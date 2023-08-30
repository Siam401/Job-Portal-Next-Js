import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { parseDateObject } from '@/services/Utility';
import { InputProps } from '../input';

export const DateInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  const checkInputDate = (value: any) => {
    if (value && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  };

  const prepareInputDate = (event: any) => {
    let value = event.value;

    if (value) {
      const { year, month, day }: any = parseDateObject(value);
      value = year + '-' + month + '-' + day;
    }
    controller.field.onChange(value);
  };

  return (
    <div className="flex flex-col w-full">
      <label
        className={
          'block mb-1 text-[15px] font-semibold text-gray-800 ' +
          +(props.labelClassName ?? '') +
          (controller.fieldState.error ? `p-error` : '')
        }
      >
        {props.label}
        {props.required && <span className="text-[#FD0000] ml-1">*</span>}
      </label>
      <Calendar
        value={checkInputDate(controller.field.value)}
        onChange={prepareInputDate}
        dateFormat={props.dateFormat ?? 'yy-mm-dd'}
        inputClassName={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus ${
          controller.fieldState.error ? `p-invalid` : ''
        }`}
        placeholder={props.placeholder}
        view={props.view ?? 'date'}
        selectionMode={props.selectionMode ?? 'single'}
        icon={props.icon}
        showIcon={props.showIcon ?? false}
        iconPos={props.iconPos ?? 'right'}
        minDate={props.minDate ?? null}
        maxDate={props.maxDate ?? null}
        disabled={props.readonly ?? false}
        readOnlyInput
        panelClassName="w-[340px]"
      />
      <small className="p-error">
        {controller.fieldState.error?.message ?? ''}
      </small>
    </div>
  );
};
