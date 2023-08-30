'use client';

// prettier-ignore
import { useState } from 'react';
// prettier-ignore
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { expertiseSchema } from '../validation/expFormValidation';
import { Button } from 'primereact/button';

type ExpertiseProps = {
  isFresher: boolean;
  errors: any;
  isReadOnly?: boolean;
};

const Expertise = ({
  isFresher,
  errors,
  isReadOnly = false,
}: ExpertiseProps) => {
  const [isExpertiseValidationEnabled, setIsExpertiseValidationEnabled] =
    useState(false);

  const { control, setError, setValue, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expertise',
  });

  const addExpertise = async (data: any) => {
    setIsExpertiseValidationEnabled(true);

    const nullRemovedData = Object.keys(data).reduce((object: any, key) => {
      if (data[key] !== null) {
        object[key] = data[key];
      }
      return object;
    }, {});

    const { expertise_name, expertise_year, expertise_month } = nullRemovedData;

    try {
      const expertiseValidationResult = await expertiseSchema.isValid({
        name: expertise_name,
        year: expertise_year,
        month: expertise_month,
      });

      await expertiseSchema.validate({
        name: expertise_name,
        year: expertise_year,
        month: expertise_month,
      });

      if (expertiseValidationResult) {
        append({
          name: expertise_name,
          year: expertise_year ? expertise_year : 0,
          month: expertise_month ? expertise_month : 0,
        });

        // clear expertise_name , expertise_year and expertise_month
        setValue('expertise_name', '');
        setValue('expertise_year', 0);
        setValue('expertise_month', 0);
        setIsExpertiseValidationEnabled(false);
      }
    } catch (error: any) {
      if (error.path === 'name') {
        setError('expertise_name', {
          type: 'manual',
          message: error.message,
        });
      } else if (error.path === 'year') {
        setError('expertise_year', {
          type: 'manual',
          message: error.message,
        });
      } else if (error.path === 'month') {
        setError('expertise_month', {
          type: 'manual',
          message: error.message,
        });
      }
    }
  };

  return (
    <>
      <div className="mt-10">
        {
          // if fields is empty then return null
          fields.length === 0 ? null : (
            <>
              {fields.map((item: any, index) => (
                <div
                  key={item.id}
                  className="m-1 inline-flex items-center max-w-xs p-1 text-gray-500 bg-[rgba(0,61,122,0.5)] rounded-lg shadow"
                  role="alert"
                >
                  <div className="text-sm text-white ms-3">
                    <span className="font-bold me-1">
                      {item.name || 'Area of Expertise'}
                    </span>
                     | {item.year} Year | {item.month} Month
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="ms-auto text-white hover:text-[#FF0000] rounded-lg p-1 inline-flex items-center justify-center h-7 w-7"
                    aria-label="Close"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))}
            </>
          )
        }
      </div>

      {fields.length < 3 ? (
        <div className="p-4 bg-gray-300 rounded-lg">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
            <div className="col-span-2 md:col-span-2 sm:col-span-3">
              <label
                htmlFor="area"
                className="block mb-1 text-[15px] font-semibold text-gray-800"
              >
                Area of Expertise (Max 3)
              </label>
              <Controller
                name={`expertise_name`}
                control={control}
                render={({ field }) => (
                  <>
                    <InputText
                      {...field}
                      value={field.value as string}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Type here"
                      disabled={isReadOnly || isFresher}
                    />
                    {isExpertiseValidationEnabled ? (
                      <small className="p-error">
                        {errors.expertise_name?.message}
                      </small>
                    ) : null}
                  </>
                )}
              />
            </div>

            <div className="col-span-1 md:col-span-1 sm:col-span-3">
              <label
                htmlFor="Year"
                className="block mb-1 text-[15px] font-semibold text-gray-800"
              >
                Year
              </label>
              <Controller
                name={`expertise_year`}
                control={control}
                render={({ field }) => (
                  <>
                    <InputNumber
                      id={field.name}
                      inputRef={field.ref}
                      value={field.value}
                      onBlur={field.onBlur}
                      minFractionDigits={0}
                      maxFractionDigits={1}
                      min={0}
                      onValueChange={(e) => field.onChange(e as any)}
                      placeholder="Type here"
                      disabled={isReadOnly || isFresher}
                      className='w-full'
                    />
                    {isExpertiseValidationEnabled ? (
                      <small className="p-error">
                        {errors.expertise_year?.message}
                      </small>
                    ) : null}
                  </>
                )}
              />
            </div>

            <div className="col-span-1 md:col-span-1 sm:col-span-3">
              <label
                htmlFor="Month"
                className="block mb-1 text-[15px] font-semibold text-gray-800"
              >
                Month
              </label>
              <Controller
                name={`expertise_month`}
                control={control}
                render={({ field }) => (
                  <>
                    <InputNumber
                      id={field.name}
                      inputRef={field.ref}
                      value={field.value}
                      onBlur={field.onBlur}
                      min={0}
                      max={11}
                      onValueChange={(e) => field.onChange(e as any)}
                      placeholder="Type here"
                      disabled={isReadOnly || isFresher}
                      className='w-full'
                    />
                    {isExpertiseValidationEnabled ? (
                      <small className="p-error">
                        {errors.expertise_month?.message}
                      </small>
                    ) : null}
                  </>
                )}
              />
            </div>

            <div className="col-span-2 px-5 md:col-span-2 sm:col-span-3 sm:px-0">
              <Button
                label='Add Expertise'
                type="button"
                onClick={() => addExpertise(getValues())}
                disabled={isReadOnly || isFresher}
                className="sm:mt-6 mt-0 block rounded-lg w-full px-5 py-2.5 text-center"/>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-gray-200 rounded-lg">
          Delete one of the expertise to add new one
        </div>
      )}
    </>
  );
};

export default Expertise;
