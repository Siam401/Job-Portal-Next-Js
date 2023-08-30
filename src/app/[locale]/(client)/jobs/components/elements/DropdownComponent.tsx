'use client';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { IconType, classNames } from 'primereact/utils';
import { Controller } from 'react-hook-form';

interface Options {
  value: any;
  text: any;
  // idea: when groping items should be required
  items?: any[];
}

type DropdownCompProps = {
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
  editable?: boolean;
  showClear?: boolean;
  showError?: boolean;

  // idea: when groping these 2 props should be required
  optionGroupLabel?: string;
  optionGroupChildren?: string;

  dropdownIcon?: IconType<DropdownProps>;

  filter?: boolean;
  filterIcon?: IconType<DropdownProps>;
  filterBy?: string;
  filterClearIcon?: IconType<DropdownProps>;
  filterMatchMode?:
    | 'endsWith'
    | 'startsWith'
    | 'contains'
    | 'equals'
    | 'notEquals';
  filterPlaceholder?: string;

  virtualScrollerOptions?: {
    itemSize?: number;
  };
};

export const DropdownComp = ({
  control,
  errors,
  name,
  label,
  options,
  placeholder,
  showClear,
  className,
  optionGroupChildren,
  showError = true,
  ...rest
}: DropdownCompProps) => {
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

  const groupedItemTemplate = (option: any) => {
    return (
      <div className="flex align-items-center">
        {/* <img alt={option.label} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} /> */}
        <div>{option.name}</div>
      </div>
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
        <div className=" tw-flex tw-flex-col">
          {label ? (
            <label
              htmlFor={name}
              className={classNames({ 'p-error': errors.value })}
            ></label>
          ) : null}
          <Dropdown
            id={name}
            value={value}
            optionLabel="text"
            placeholder={placeholder}
            options={options}
            onBlur={onBlur}
            showClear={showClear ? value : false}
            focusInputRef={ref}
            onChange={(e) => {
              console.log('e.value', e.value);
              return onChange(e.value);
            }}
            optionGroupTemplate={
              optionGroupChildren ? groupedItemTemplate : undefined
            }
            className={classNames({ 'p-invalid': error }, className)}
            {...rest}
          />
          {getFormErrorMessage(name)}
        </div>
      )}
    />
  );
};

export default DropdownComp;
