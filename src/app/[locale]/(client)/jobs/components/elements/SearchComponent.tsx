import { Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

type SearchComponentProps = {
  control: any;
  errors: any;
  name: string;
  placeholder: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
  showClear?: boolean;
};

const SearchComponent = ({
  control,
  errors,
  name,
  label,
  placeholder,
  className,
  ...rest
}: SearchComponentProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { error }, // invalid, isTouched, isDirty,
          // formState,
        }) => (
          <>
            {label ? (
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
            ) : (
              ''
            )}

            <div className="relative table w-full mb-4 sm:mb-0">
              <InputText
                id={name}
                {...rest}
                placeholder={placeholder}
                className={className}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 py-2 px-3.5 text-sm font-semibold h-full text-[#3298FF]"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </>
        )}
      />
    </>
  );
};

export default SearchComponent;
