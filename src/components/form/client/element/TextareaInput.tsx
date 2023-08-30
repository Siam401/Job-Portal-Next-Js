import { InputTextarea } from 'primereact/inputtextarea';
import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';

export interface InputProps {
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
  readonly?: boolean;
  className?: string;
  required?: boolean;
}

export const TextareaInput = (props: InputProps) => {
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

      <InputTextarea
        ref={controller.field.ref}
        placeholder={props.placeholder}
        value={controller.field.value}
        onChange={controller.field.onChange}
        onBlur={controller.field.onBlur}
        rows={5}
        className={`form-control bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 ${
          controller.fieldState.error ? `p-invalid` : ''
        }`}
      />
      <p className="text-sm text-[#FD0000]">
        {controller.fieldState.error?.message ?? ''}
      </p>
    </div>
  );
};