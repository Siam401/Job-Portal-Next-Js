'use client';

// prettier-ignore
import { useState } from 'react';
// prettier-ignore
import { useFieldArray, useFormContext } from 'react-hook-form';

type ExpertiseProps = {
  isFresher: boolean;
  errors: any;
  isReadOnly?: boolean;
};

const Expertise = ({ isFresher, isReadOnly = false }: ExpertiseProps) => {
  const { control, setError, setValue, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expertise',
  });

  const [expertise, setExpertise] = useState({
    expertise_name: '',
    expertise_year: 0,
    expertise_month: 0,
  });

  const [errors, setErrors] = useState({
    expertise_name: '',
    expertise_year: '',
    expertise_month: '',
  });

  const validateExpertiseName = () => {
    if (expertise.expertise_name.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_name: 'Expertise name is required',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_name: '',
      }));
    }
  };

  const validateExpertiseYear = () => {
    if (isNaN(expertise.expertise_year) || expertise.expertise_year < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_year: 'Invalid year',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_year: '',
      }));
    }
  };

  const validateExpertiseMonth = () => {
    if (
      isNaN(expertise.expertise_month) ||
      expertise.expertise_month < 0 ||
      expertise.expertise_month > 11
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_month: 'Invalid month',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_month: '',
      }));
    }
  };

  const validateYearMonthCombination = () => {
    if (expertise.expertise_year === 0 && expertise.expertise_month === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_year: 'Year and month cannot both be 0',
        expertise_month: 'Year and month cannot both be 0',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_year: '',
        expertise_month: '',
      }));
    }
  };

  const addExpertise = () => {
    if (expertise.expertise_name.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_name: 'Expertise name is required',
      }));
      return;
    }

    if (isNaN(expertise.expertise_year) || expertise.expertise_year < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_year: 'Invalid year',
      }));
      return;
    }

    if (
      isNaN(expertise.expertise_month) ||
      expertise.expertise_month < 0 ||
      expertise.expertise_month > 11
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_month: 'Invalid month',
      }));
      return;
    }

    if (expertise.expertise_year === 0 && expertise.expertise_month === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expertise_year: 'Year and month both cannot be 0',
        expertise_month: 'Year and month both cannot be 0',
      }));
      return;
    }

    // Add expertise to the field array
    append({
      name: expertise.expertise_name,
      year: expertise.expertise_year,
      month: expertise.expertise_month,
    });

    // Reset form fields and errors after successful addition
    setExpertise({
      expertise_name: '',
      expertise_year: 0,
      expertise_month: 0,
    });
    setErrors({
      expertise_name: '',
      expertise_year: '',
      expertise_month: '',
    });
  };

  return (
    <>
      <div>
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
                  <div className="ml-3 text-sm text-white">
                    <span className="font-bold">
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
        <div className="bg-gray-200 p-4 rounded-lg">
          <div className="grid grid-cols-6 gap-3">
            <div className="md:col-span-2 sm:col-span-3 col-span-1">
              <label
                htmlFor="area"
                className="block mb-1 text-md font-semibold text-gray-600"
              >
                Area of Expertise (Max 3)
              </label>
              <input
                type="text"
                value={expertise.expertise_name}
                onChange={(e) => {
                  setExpertise({
                    ...expertise,
                    expertise_name: e.target.value,
                  });
                  validateExpertiseName();
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Type here"
              />
              {errors.expertise_name && (
                <small className="p-error">{errors.expertise_name}</small>
              )}
            </div>

            <div className="md:col-span-1 sm:col-span-3 col-span-1">
              <label
                htmlFor="Year"
                className="block mb-1 text-md font-semibold text-gray-600"
              >
                Year
              </label>
              <input
                type="number"
                value={expertise.expertise_year}
                onChange={(e) => {
                  setExpertise({
                    ...expertise,
                    expertise_year: Number(e.target.value),
                  });
                  validateExpertiseYear();
                  validateYearMonthCombination();
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Type here"
              />
              {errors.expertise_year && (
                <small className="p-error">{errors.expertise_year}</small>
              )}
            </div>

            <div className="md:col-span-1 sm:col-span-3 col-span-1">
              <label
                htmlFor="Month"
                className="block mb-1 text-md font-semibold text-gray-600"
              >
                Month
              </label>
              <input
                type="number"
                value={expertise.expertise_month}
                onChange={(e) => {
                  setExpertise({
                    ...expertise,
                    expertise_month: Number(e.target.value),
                  });
                  validateExpertiseMonth();
                  validateYearMonthCombination();
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Type here"
              />
              {errors.expertise_month && (
                <small className="p-error">{errors.expertise_month}</small>
              )}
            </div>

            <div className="md:col-span-2 sm:col-span-3 col-span-1 sm:px-0 px-5">
              <button
                type="button"
                onClick={addExpertise}
                className="sm:mt-6 mt-0 block text-white bg-[#F25F0D] hover:bg-[#db560b] focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md w-full px-5 py-2.5 text-center"
              >
                Add Expertise
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 p-4 rounded-lg">
          Delete one of the expertise to add new one
        </div>
      )}
    </>
  );
};

export default Expertise;
