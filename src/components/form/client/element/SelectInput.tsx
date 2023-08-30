import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { InputProps } from './TextInput';
import { Dropdown } from 'primereact/dropdown';

export interface SelectInputOption {
  value: string;
  title: string;
}

export interface SelectInputProps extends InputProps {
  options: SelectInputOption[];
}

export const SelectInput = (props: SelectInputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <div>
      {props.label && (
        <label
          className={
            `block mb-1 text-sm font-semibold text-gray-900 after:content-[' *
            '] after:text-[#FD0000] after:ml-1` +
            (controller.fieldState.error ? `p-error` : '')
          }
        >
          {props.label}
          {props.required && <span className="text-[#FD0000] ml-1">*</span>}
        </label>
      )}
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
        optionLabel="title"
        optionValue="value"
        placeholder="Select an option"
        options={props.options}
        className={`mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 ${
          controller.fieldState.error ? `p-invalid` : ''
        }`}
      />
      <p className="text-sm text-[#FD0000]">
        {controller.fieldState.error?.message ?? ''}
      </p>
    </div>
  );
};
