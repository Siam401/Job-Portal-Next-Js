import { InputText } from 'primereact/inputtext';
import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { InputProps } from '../input';

export const TextInput = (props: InputProps) => {
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
      <InputText
        keyfilter={props.keyfilter}
        placeholder={props.placeholder}
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
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus ${
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