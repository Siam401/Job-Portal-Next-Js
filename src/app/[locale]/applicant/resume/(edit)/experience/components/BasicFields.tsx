'use client';

// prettier-ignore
import { CheckboxInput } from '@/components/form/common/element/CheckboxInput';
import { DateInput } from '@/components/form/common/element/DateInput';
import { TextInput } from '@/components/form/common/element/TextInput';
import { useFormContext } from 'react-hook-form';

type BasicFieldsProps = {
  isFresher: boolean;
  isReadOnly?: boolean;
};

const BasicFields = ({ isFresher, isReadOnly = false }: BasicFieldsProps) => {
  const { watch } = useFormContext();

  const isCurrent = watch('is_current');

  const currentDate = new Date();
  return (
    <>
      <div className="col-span-1 md:col-span-2">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* section: company name */}
          <div>
            <TextInput
              name="company_name"
              placeholder="Enter company name"
              readonly={isReadOnly || isFresher}
              label="Company Name"
              required={!isFresher}
            />
          </div>

          {/* section: company business */}
          <div>
            <TextInput
              name="company_business"
              placeholder="Enter company business"
              readonly={isReadOnly || isFresher}
              label="Company Business"
            />
          </div>

          {/* section: Designation */}
          <div>
            <TextInput
              name="designation"
              placeholder="Enter designation"
              readonly={isReadOnly || isFresher}
              label="Designation"
              required={!isFresher}
            />
          </div>

          {/* section: Department */}

          <div>
            <TextInput
              name="department"
              placeholder="Enter department"
              readonly={isReadOnly || isFresher}
              label="Department"
            />
          </div>

          {/* section: Employment Period */}

          <div>
            <div className="flex items-center w-full text-[15px] font-semibold text-gray-800">
              <label htmlFor="employment_period" className="block">
                Employment Period 
                <span className={'text-[#FD0000] ms-1' + (isFresher ? '' : 'hidden')}>
                  *
                </span>
              </label>
              <div className="flex items-center ms-1">
                <CheckboxInput
                  name="is_current"
                  label="Currently Working"
                  readonly={isReadOnly || isFresher}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className='flex flex-col w-full'>
                <DateInput
                  name="start_date"
                  placeholder="Select date start"
                  showIcon
                  maxDate={currentDate}
                  iconPos="left"
                  readonly={isReadOnly || isFresher}
                />
              </div>

              <span className="mx-2 text-gray-500">to</span>

              <div className='flex flex-col w-full'>
                <DateInput
                  name="end_date"
                  placeholder="Select date end"
                  showIcon
                  value={isCurrent ? null : formatDate(currentDate.toString())}
                  maxDate={currentDate}
                  iconPos="left"
                  readonly={isReadOnly || isCurrent || isFresher}
                />
              </div>
            </div>
          </div>

          {/* section: Company Location */}

          <div>
            <TextInput
              name="location"
              placeholder="Enter location"
              readonly={isReadOnly || isFresher}
              label="Company Location"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicFields;

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
