import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';
import { InputProps } from '../input';

export const CheckboxInput = (props: InputProps) => {
  const { control, setValue, getValues, trigger } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <div className='flex items-center ms-1'>
      <Checkbox
        ref={controller.field.ref}
        name={controller.field.name}
        value={controller.field.value}
        checked={controller.field.value}
        onBlur={controller.field.onBlur}
        onChange={(e: any) => (
          props.customFunction ? props.customFunction(e) : null,
          controller.field.onChange(e.checked)
        )}
        disabled={props.readonly}
      />
      <label
        className={
          props.labelClassName ??
          'w-full ms-2 text-sm font-semibold text-gray-500'
        }
      >
        {props.label}
      </label>
    </div>
  );
};
