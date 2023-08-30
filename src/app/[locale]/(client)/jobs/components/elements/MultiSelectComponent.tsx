'use client';
import { DropdownProps } from 'primereact/dropdown';
import { IconType, classNames } from 'primereact/utils';
import { Controller } from 'react-hook-form';

import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';

interface Options {
  value: any;
  text: string | number;
  // idea: when groping items should be required
  items?: any[];
}

type MultiSelectCompProps = {
  control: any;
  errors: any;
  name: string;
  placeholder: string;
  options: Options[];
  label?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  filterPlaceHolder?: string;
  filter?: boolean;
  showError?: boolean;
};

export const MultiSelectComp = ({
  control,
  errors,
  name,
  label,
  options,
  placeholder,
  className,
  filterPlaceHolder = '',
  showError = true,
  ...rest
}: MultiSelectCompProps) => {
  const getFormErrorMessage = (name: string) => {
    if (showError === false) {
      return null;
    }

    return errors[name as keyof typeof errors] ? (
      <small className="p-error">
        {errors[name as keyof typeof errors]?.message}
      </small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error }, // invalid, isTouched, isDirty,
        // formState,
      }) => (
        <>
          {
            label ? <label
            htmlFor={name}
            className={classNames({ 'p-error': errors.value })}
          ></label>: null
          }
          <MultiSelect
            id={name}
            name={name}
            value={value}
            options={options}
            onBlur={onBlur}
            onChange={(e) => {
              // console.log('MultiSelectComp onChange', e.value);
              // (e: MultiSelectChangeEvent) => setSelectedCities(e.value)
              return onChange(e.value);
            }}
            optionLabel="text"
            placeholder={placeholder}
            filterPlaceholder={filterPlaceHolder}
            // maxSelectedLabels={3}
            className={classNames({ 'p-invalid': error }, className)}
            {...rest}
          />
          {getFormErrorMessage(name)}
        </>
      )}
    />
  );
};

export default MultiSelectComp;
