import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { InputProps } from '../input';
import { useEffect, useState } from 'react';

export const CheckboxGroupInput = (props: InputProps) => {
  const { control, setValue, trigger } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  const [selectedData, setSelectedData] = useState<any>([]);
  const [formData, setFormData] = useState<any>([]);

  useEffect(() => {
    if (controller.formState.defaultValues) {
      if (controller.formState.defaultValues[props.name]) {
        setSelectedData(controller.formState.defaultValues[props.name]);
        setFormData(controller.formState.defaultValues[props.name]);
      }
    }
  }, [controller.formState.defaultValues]);

  const onDataChange = (e: CheckboxChangeEvent) => {
    let _selectedData = [...selectedData];
    let _formData = [...formData];
    let max: number = props.max ?? null;

    if (e.checked) {
      if (max) {
        if (_selectedData.length < max) {
          _selectedData.push(e.value);
          _formData.push(e.value);
        }
      } else {
        _selectedData.push(e.value);
        _formData.push(e.value);
      }
    } else {
      _selectedData = _selectedData.filter((data) => data !== e.value);
      _formData = _formData.filter((data) => data !== e.value);
    }
    setSelectedData(_selectedData);
    setFormData(_formData);
    setValue(props.name, _formData);
    trigger(props.name);
  };
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
            'w-full text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-lg h-[381px] overflow-y-auto'
          }
        >
          {props.data.map((data: any, index: number) => {
            return (
              <li
                className="w-full border-b border-gray-200 rounded-t-lg"
                key={index}
              >
                <div className="flex items-center p-2" key={data.text}>
                  <Checkbox
                    inputId={data.text}
                    name={controller.field.name}
                    value={data.value}
                    onChange={onDataChange}
                    checked={selectedData.some(
                      (item: any) => item === data.value,
                    )}
                  />
                  <label htmlFor={data.text} className="ml-2">
                    {data.text}
                  </label>
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
