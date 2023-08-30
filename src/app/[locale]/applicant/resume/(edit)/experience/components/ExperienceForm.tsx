'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { use, useEffect, useRef, useState } from 'react';
// prettier-ignore
import { removeProfileInfo, saveProfileInfo, } from '@/app/api/applicant/experience';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { closeModal, openModal } from '@/redux/features/modal.slice';
import { toastActions } from '@/redux/features/toast.slice';
import { useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { defaultValues } from '../constant';
import { experienceFormSchema } from '../validation/expFormValidation';
import BasicFields from './BasicFields';
import Expertise from './Expertise';

const DynamicReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, // This ensures the component is only rendered on the client side
});

type ExperienceFormProps = {
  addNewForm: () => void;
  isLastChild: boolean;
  isFresher: boolean;
  isFetchedArray?: boolean;
  initialData?: any;
};

const ExperienceForm = ({
  addNewForm,
  isLastChild,
  isFresher,
  isFetchedArray = false,
  initialData,
}: ExperienceFormProps) => {
  const [isFetched, setIsFetched] = useState(isFetchedArray);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteFormId, setDeleteFormId] = useState<number>();
  const deleteFormRef = useRef<number>();

  const methods = useForm({
    resolver: yupResolver(experienceFormSchema),
    defaultValues: {
      ...defaultValues,
      is_fresher: isFresher,
      ...initialData,
    },
    mode: 'onTouched',
  });

  // prettier-ignore
  const { handleSubmit, formState: { errors , isDirty}, clearErrors, setValue , control} = methods;

  useEffect(() => {
    setInEditMode(isFresher);
  }, [isFresher]);

  useEffect(() => {
    if (isFresher) {
      clearErrors();
      setValue('is_fresher', true); // update the value of is_fresher field
    } else {
      setValue('is_fresher', false); // update the value of is_fresher field
    }
  }, [isFresher, clearErrors, setValue]);

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  // section: save experience
  const onSubmit = async (data: any) => {
    data.category = 'experience';
    data.is_fresher = isFresher ? 1 : 0;
    data.is_current = data.is_current ? 1 : 0;
    data.id = initialData?.id;

    const slicedData = { ...data };

    // remove expertise_name , expertise_year and expertise_month from data
    delete slicedData.expertise_name;
    delete slicedData.expertise_year;
    delete slicedData.expertise_month;
    delete slicedData.isFetched;

    setIsSaving(true);
    const response = await saveProfileInfo(slicedData);
    setIsSaving(false);

    if (response.success) {
      queryClient.invalidateQueries(['experience']);
      dispatch(
        toastActions.showToast({
          message: 'Experience has been saved successfully',
          type: 'success',
          summary: 'Success',
        }),
      );

      setIsFetched(true);
      setIsReadOnly(true);
      setInEditMode(false);
    } else {
      dispatch(
        toastActions.showToast({
          message: response.message ?? 'Something went wrong',
          type: 'error',
          summary: 'Error',
        }),
      );
    }
  };

  // section: delete experience

  const deleteProfileInfo = async (id: number) => {
    setIsDeleting(true);
    const response = await removeProfileInfo('experience', id);

    setIsDeleting(false);

    if (response.success) {
      queryClient.invalidateQueries(['experience']);
      dispatch(
        toastActions.showToast({
          message: 'Experience has been deleted successfully',
          type: 'success',
          summary: 'Success',
        }),
      );
      dispatch(closeModal('delete-experience'));
      setIsFetched(true);
      setIsReadOnly(true);
      setInEditMode(false);
    } else {
      dispatch(
        toastActions.showToast({
          message: response.message ?? 'Something went wrong',
          type: 'error',
          summary: 'Error',
        }),
      );
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className={'p-2 mb-8' + (isFetched === true ? ' bg-gray-200 ' : '')}
        >
          <div className="grid gap-3 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {/* section: Left Section */}
            <BasicFields
              isFresher={isFresher}
              isReadOnly={inEditMode ? false : isFetched}
            />

            <div className="md:col-span-2 col-span-1">
              {/* section: Right Section */}
              <div className="grid gap-3 grid-cols-1">
                <div className="flex flex-col">
                  <label
                    className={'block mb-1 text-md font-semibold text-gray-600'}
                  >
                    Responsibility
                  </label>

                  <div>
                    <Controller
                      name="responsibility"
                      control={control}
                      render={({ field }) => (
                        <DynamicReactQuill
                          theme="snow"
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          readOnly={isReadOnly || isFresher}
                          modules={{
                            toolbar: [
                              ['bold', 'italic', 'underline'],
                              [{ background: [] }, { color: [] }],
                              [{ list: 'bullet' }],
                            ],
                          }}
                          style={{ height: '80px' }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* section: expertise  */}

                <Expertise
                  isFresher={isFresher}
                  isReadOnly={inEditMode ? false : isFetched}
                  errors={errors}
                />

                {/* section: save & add button */}

                <div className="sm:flex justify-end block w-full sm:space-y-0 space-y-2 mb-1">
                  {!isFetched ? (
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      label="Save"
                      className="block min-w-[250px] sm:ms-2 ms-0 text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
                      severity="success"
                      loading={isSaving}
                      // disabled={!isDirty}
                    />
                  ) : null}

                  {isFetched && inEditMode ? (
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      label="Save"
                      className="block min-w-[250px] sm:ms-2 ms-0 text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
                      severity="success"
                      loading={isSaving}
                      // disabled={!isDirty}
                    />
                  ) : null}

                  <div className="flex justify-end ">
                    {isFetched && !inEditMode ? (
                      <Button
                        type="button"
                        onClick={() => setInEditMode(true)}
                        label="Edit"
                        severity="warning"
                        className="block min-w-[150px] ms-2 text-white bg-[#F25F0D] hover:bg-[#db560b] focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md w-auto px-5 py-2.5 text-center"
                      />
                    ) : null}

                    {isFetched ? (
                      <Button
                        type="button"
                        onClick={() => {
                          dispatch(openModal('delete-experience'));
                          deleteFormRef.current = initialData?.id;
                        }}
                        label="Delete"
                        severity="danger"
                        loading={isDeleting}
                        className="ms-2 text-white bg-[#F25F0D] hover:bg-[#db560b] focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md w-auto px-5 py-2.5 text-center"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {isLastChild ? (
          <div className="sm:flex justify-end block w-full mb-2">
            <Button
              label="Add Employment (If Required)"
              onClick={addNewForm}
              type="button"
              className="block min-w-[250px] text-white bg-[#F25F0D] hover:bg-[#db560b] focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
              disabled={isFresher || inEditMode || !isFetched}
            />
          </div>
        ) : null}

        {/* section: next button */}

        {isLastChild ? (
          <div className="sm:flex justify-end block w-full sm:space-y-0 space-y-2">
            <Link
              href="/applicant/resume/other"
              className="block min-w-[250px] mb-8 text-white bg-[#005DB9] hover:bg-[#004992] focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Next<i className="fa fa-circle-chevron-right ms-3"></i>
            </Link>
          </div>
        ) : null}
      </FormProvider>

      <ConfirmDialog
        id={'delete-experience'}
        handleDelete={() => {
          console.log('deleteFormRef.current', deleteFormRef.current);
          deleteProfileInfo(deleteFormRef.current as number);
        }}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ExperienceForm;
