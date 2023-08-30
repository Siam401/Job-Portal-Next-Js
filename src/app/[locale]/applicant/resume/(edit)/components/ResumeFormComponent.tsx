import React, { useEffect, useState } from 'react';
import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ProfileApi from '@/app/api/applicant/profile';
import { checkEmpty, objectNullToString } from '@/services/Utility';
import { useAppDispatch } from '@/redux/hook';
import { toastActions } from '@/redux/features/toast.slice';

import { closeModal } from '@/redux/features/modal.slice';
import { useQueryClient } from '@tanstack/react-query';
import FormActionComponent from './FormActionComponent';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default function ResumeFormComponent({
  FieldComponent,
  infoData,
  formSchema,
  defaultInput,
  sectionKey,
}: any) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [academicId, setAcademicId] = useState<number>(0);

  const CustomFormElements = React.cloneElement(FieldComponent, {
    isDisable: isDisable,
  });

  const form: UseFormReturn<any, UseFormProps> = useForm<any>({
    resolver: yupResolver(formSchema),
    defaultValues: defaultInput,
  });

  useEffect(() => {
    if (!checkEmpty(infoData)) {
      const formData = objectNullToString(infoData);
      setAcademicId(infoData.id);
      setIsDisable(true);
      setEditMode(true);
      form.reset(formData);
    } else {
      setAcademicId(0);
      setEditMode(false);
      setIsDisable(false);
    }
  }, [infoData]);

  const academicFormSubmit = async (formData: any) => {
    setIsSaveLoading(true);
    formData.category = sectionKey;
    formData.id = academicId;
    const { message, success } = await ProfileApi.saveProfileInfo(formData);
    if (success) {
      queryClient.invalidateQueries(['resume_status']);
      queryClient.invalidateQueries([sectionKey + '_info']);
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: String(message),
        }),
      );
      if (academicId > 0) {
        setIsDisable(true);
        setEditMode(true);
        setIsSaveLoading(false);
      }
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: String(message),
        }),
      );
      setIsSaveLoading(false);
    }
  };

  const deleteInfo = async () => {
    setIsDeleteLoading(true);
    const response: any = await ProfileApi.deleteProfileInfo(
      sectionKey,
      academicId,
    );

    if (response.success) {
      queryClient.invalidateQueries(['resume_status']);
      queryClient.invalidateQueries([sectionKey + '_info']);
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: String(response.message),
        }),
      );
      dispatch(closeModal('delete_confirm_' + sectionKey));
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: String(response.message),
        }),
      );
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(academicFormSubmit)}
          noValidate
          autoComplete="off"
        >
          {CustomFormElements}

          <FormActionComponent
            editMode={editMode}
            setEditMode={setEditMode}
            setIsDisable={setIsDisable}
            isSaveLoading={isSaveLoading}
            infoData={infoData}
            isDeleteLoading={isDeleteLoading}
            dialogId={'delete_confirm_' + sectionKey}
          />
        </form>
      </FormProvider>

      <ConfirmDialog
        id={'delete_confirm_' + sectionKey}
        handleDelete={deleteInfo}
      />
    </>
  );
}
