import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { InputProps } from '../input';
import { useState } from 'react';
import { RadioInput } from '../element/RadioInput';

export const RadioGroupInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <>
      <div>
        <label
          className={
            'block mb-1 text-[15px] font-semibold text-gray-800' +
            (controller.fieldState.error ? `p-error` : '')
          }
        >
          {props.label}
          {props.required && <span className="text-[#FD0000] ml-1">*</span>}
        </label>
        <ul
          className={
            props.ulClassName ??
            'w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg'
          }
        >
          {props.data.map((data: any, index: number) => {
            return (
              <li
                className="w-full border-b border-gray-200 rounded-t-lg"
                key={index}
              >
                <div className="flex items-center p-2">
                  <RadioInput
                    name={props.name}
                    label={data.text}
                    value={data.value}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <small className="p-error">
          {controller.fieldState.error?.message ?? ''}
        </small>
      </div>
    </>
  );
};
