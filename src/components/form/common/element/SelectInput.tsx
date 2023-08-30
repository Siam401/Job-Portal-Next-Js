import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { InputProps } from '../input';

export interface SelectInputProps extends InputProps {
  options: object[];
}

export const SelectInput = (props: SelectInputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <div className="flex flex-col w-full">
      <label
        className={
          'block mb-1 text-[15px] font-semibold text-gray-800' +
          (props.labelClassName ?? '') +
          (controller.fieldState.error ? `p-error` : '')
        }
      >
        {props.label}
        {props.required && <span className="text-[#FD0000] ml-1">*</span>}
      </label>
      <Dropdown
        onChange={(e) => {
          if (props.onStateChange) {
            props.onStateChange(e.target.value);
          }
          controller.field.onChange(e);
        }}
        onBlur={controller.field.onBlur}
        name={controller.field.name}
        value={controller.field.value}
        ref={controller.field.ref}
        optionLabel={props.optionLabel ?? 'text'}
        optionValue={props.optionValue ?? 'value'}
        placeholder="Select an option"
        options={props.options}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full ${
          controller.fieldState.error ? `p-invalid` : ''
        }`}
        disabled={props.readonly}
      />
      <small className="p-error">
        {controller.fieldState.error?.message ?? ''}
      </small>
    </div>
  );
};
