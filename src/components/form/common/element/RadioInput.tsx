import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
// import { InputProps } from './TextInput';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { InputProps } from '../input';

export const RadioInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <>
      <RadioButton
        inputRef={controller.field.ref}
        inputId={props.value}
        name={controller.field.name}
        value={props.value}
        checked={controller.field.value === props.value}
        onChange={controller.field.onChange}
        className={`cursor-pointer me-3 text-gray-600 ${
          controller.fieldState.error ? `p-invalid` : ''
        }`}
        disabled={props.readonly}
      />
      <label
        htmlFor={props.value}
        className={
          'w-full text-sm pe-2 cursor-pointer me-3 text-gray-900 ' + (props.labelClassName ?? '')
        }
      >
        {props.label}
      </label>
    </>
  );
};
