import { FileUpload } from 'primereact/fileupload';

import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { InputProps } from '../input';

export const FileInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <div className="w-full flex flex-col mb-3">
      <label
        className={
          'block mb-1 text-md font-semibold text-gray-600' +
          (props.labelClassName ?? '') +
          (controller.fieldState.error ? `p-error` : '')
        }
      >
        {props.label}
        {props.required && <span className="text-[#FD0000] ml-1">*</span>}
      </label>
      <FileUpload
        ref={controller.field.ref}
        mode="basic"
        onSelect={controller.field.onChange}
        name={controller.field.name}
        maxFileSize={1000000}
      />
    </div>
  );
};
{
  /* <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} /> */
}
// <FormControl fullWidth>
//   <MuiFileInput
//     placeholder={props.placeholder}
//     label={props.label}
//     onChange={controller.field.onChange}
//     onBlur={controller.field.onBlur}
//     name={controller.field.name}
//     value={controller.field.value}
//     error={!!controller.fieldState.error}
//     helperText={controller.fieldState.error?.message}
//     fullWidth
//   />
// </FormControl>
