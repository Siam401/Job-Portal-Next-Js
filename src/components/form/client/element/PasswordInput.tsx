'use client';

import { Password } from 'primereact/password';
import { useEffect } from 'react';
import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';

export interface InputProps {
  name: string;
  placeholder?: string;
  label?: string;
  value?: any;
  readonly?: boolean;
  onStateChange?: (...args:any[]) => any;
  required?: boolean;
  feedback?: boolean;
  toggleMask?: boolean;
  header?: any;
  footer?: any;
}

export const PasswordInput = (props: InputProps) => {
  const { control, setValue } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  useEffect(() => {
    if (props.value) {
      setValue(props.name, props.value);
    }
  }, []);

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
      <Password
        placeholder={props.placeholder}
        onChange={(e) => {
          if (props.onStateChange) {
            props.onStateChange(e.target.value);
          }
          controller.field.onChange(e);
        }}
        // onChange={controller.field.onChange}
        onBlur={controller.field.onBlur}
        name={controller.field.name}
        value={props.value ? props.value : controller.field.value}
        ref={controller.field.ref}
        inputClassName={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 ${
          controller.fieldState.error ? `p-invalid` : ''
        }`}
        className="w-full"
        readOnly={props.readonly}
        toggleMask={props.toggleMask ?? true}
        feedback={props.feedback ?? false}
        header={props.header ?? ''}
        footer={props.footer ?? ''}
      />
      <p className="text-sm text-[#FD0000]">
        {controller.fieldState.error?.message ?? ''}
      </p>
    </div>
  );
};
