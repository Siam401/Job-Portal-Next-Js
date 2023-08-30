'use client';
import { AuthApi } from '@/app/api/auth/auth';
import { toastActions } from '@/redux/features/toast.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { resetFormSchema } from '../validators/reset.schema';
import { ResetPasswordDTO } from '../../auth';
import { defaultResetInput } from '../shared/constant';
import { PasswordInput } from '@/components/form/client/element/PasswordInput';
import { Divider } from 'primereact/divider';

export default function FormComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form: UseFormReturn<ResetPasswordDTO, UseFormProps> =
    useForm<ResetPasswordDTO>({
      resolver: yupResolver(resetFormSchema),
      defaultValues: defaultResetInput,
    });

  const [loading, setLoading] = useState<boolean>(false);
  const username: string = useAppSelector((state: any) => state.auth.username);
  const token: string = useAppSelector((state: any) => state.auth.token);

  useEffect(() => {
    if (token == '') {
      router.push('/signin');
    } else {
      form.setValue('token', token);
    }
  }, [token]);

  const formSubmit = async (form: any) => {
    setLoading(true);
    const { message, success }: any = await AuthApi.resetPassword(form);

    if (!success) {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: message,
        }),
      );
      setLoading(false);
    } else {
      await signIn('credentials', {
        username: username,
        password: form.password,
        redirect: true,
        callbackUrl: '/applicant',
      });

      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: message,
        }),
      );
      setLoading(false);
    }
  };

  const passwordHeader = <div className="font-bold mb-3">Pick a password</div>;
  const suggestionFooter = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>At least one special character</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(formSubmit)}
        className="space-y-3 md:space-y-4"
        noValidate
        autoComplete="off"
      >
        <PasswordInput
          label="Type Password"
          name="password"
          placeholder="Type Password"
          required={true}
          feedback={true}
          header={passwordHeader}
          footer={suggestionFooter}
        />

        <PasswordInput
          label="Retype Password"
          name="confirm_password"
          placeholder="Retype Password"
          required={true}
        />

        <Button
          type="submit"
          severity="success"
          className="py-3 w-full text-[16px] font-medium rounded-lg text-center text-white bg-[#39B54A] hover:bg-[#2ea23e] focus:ring-2 focus:outline-none focus:ring-primary-300 shadow-[0_4px_9px_-4px_#2cae3e] hover:shadow-none ease-in-out duration-300"
          label="Request password reset"
          loading={loading}
        />
      </form>
    </FormProvider>
  );
}
