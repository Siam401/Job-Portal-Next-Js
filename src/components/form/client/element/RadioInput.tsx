import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
// import { InputProps } from './TextInput';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';

export interface InputProps {
  name: string;
  value: string;
  placeholder?: string;
  label?: string;
  type?: string;
  readonly?: boolean;
  onStateChange?: (...args:any[]) => any;
}

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
        className="cursor-pointer me-3 text-gray-600"
        disabled={props.readonly}
      />
      <label
        htmlFor={props.value}
        className="cursor-pointer me-3 text-gray-600"
      >
        {props.label}
      </label>
    </>
  );
};
