import { useEffect, useRef, useState } from 'react';
import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';

export interface InputProps {
  name: string;
  ref?: any;
  placeholder?: string;
  label?: string;
  type?: string;
  readonly?: boolean;
  customFunction?: (...args:any[]) => any;
  required?: boolean;
}

export const FileInput = (props: InputProps) => {
  const fileRef = useRef<any>(null);
  const { control, setValue, getValues, trigger } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  const fileValue = getValues(props.name);

  useEffect(() => {
    if (!fileValue && fileRef.current != null) {
      fileRef.current.value = null;
    }
  }, [fileValue]);

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
      <input
        type="file"
        ref={fileRef}
        name={controller.field.name}
        onChange={(e: any) => (
          props.customFunction ?? null,
          setValue(props.name, e.target.files[0]),
          trigger(props.name)
        )}
        className="block w-full px-4 py-2 mb-2 text-sm text-gray-700 border border-gray-300 rounded-full cursor-pointer bg-gray-50"
      />
      <p className="text-sm text-[#FD0000]">
        {controller.fieldState.error?.message ?? ''}
      </p>
    </div>
  );
};
