import { InputTextarea } from 'primereact/inputtextarea';
import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { InputProps } from '../input';

export const TextareaInput = (props: InputProps) => {
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

      <InputTextarea
        ref={controller.field.ref}
        placeholder={props.placeholder}
        value={controller.field.value}
        onChange={controller.field.onChange}
        onBlur={controller.field.onBlur}
        rows={props.rows ?? '3'}
        className={`w-full ${controller.fieldState.error ? `p-invalid` : ''}`}
        disabled={props.readonly}
      />
      <small className="p-error">
        {controller.fieldState.error?.message ?? ''}
      </small>
    </div>
  );
};