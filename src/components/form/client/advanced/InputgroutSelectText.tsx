import { makeOptionArray } from '@/services/Utility';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';

export interface SelectInputOption {
  value: string;
  title: string;
}

export interface InputProps {
  dropdownName: string;
  dropdownPlaceholder?: string;
  dropdownLabel?: string;
  dropdownOptionLabel?: string;
  dropdownOptionValue?: string;
  dropdownReadonly?: boolean;
  dropdownOnStateChange?: (...args:any[]) => any;
  dropdownOptions: SelectInputOption[];
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
  keyfilter?: any;
  readonly?: boolean;
  onStateChange?: (...args:any[]) => any;
  required?: boolean;
}

export const InputgroutSelectText = (props: InputProps) => {
  const { control } = useFormContext();

  const dropController: UseControllerReturn = useController({
    name: props.dropdownName,
    control,
  });

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
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <Dropdown
            onChange={(e) => {
              if (props.dropdownOnStateChange) {
                props.dropdownOnStateChange(e.target.value);
              }
              dropController.field.onChange(e);
            }}
            onBlur={dropController.field.onBlur}
            name={dropController.field.name}
            value={dropController.field.value}
            ref={dropController.field.ref}
            optionLabel={props.dropdownOptionLabel}
            optionValue={props.dropdownOptionValue}
            placeholder="Select an option"
            options={props.dropdownOptions}
            className={`${dropController.fieldState.error ? `p-invalid` : ''}`}
          />
        </span>
        <InputText
          placeholder={props.placeholder}
          keyfilter={props.keyfilter}
          type={props.type ?? 'text'}
          onChange={(e) => {
            if (props.onStateChange) {
              props.onStateChange(e.target.value);
            }
            controller.field.onChange(e);
          }}
          // onChange={controller.field.onChange}
          onBlur={controller.field.onBlur}
          name={controller.field.name}
          value={controller.field.value}
          ref={controller.field.ref}
          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 ${
            controller.fieldState.error ? `p-invalid` : ''
          }`}
          readOnly={props.readonly}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1">
        <div>
          <p className="text-sm text-[#FD0000]">
            {dropController.fieldState.error?.message ?? ''}
            {dropController.fieldState.error &&
              controller.fieldState.error &&
              ' | '}
            {controller.fieldState.error?.message ?? ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputgroutSelectText;
