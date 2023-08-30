'use client';
import { AuthApi } from '@/app/api/auth/auth';
import authSlice from '@/redux/features/auth.slice';
import { toastActions } from '@/redux/features/toast.slice';
import { useAppDispatch } from '@/redux/hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { forgetFormSchema } from '../validators/forget.schema';

export default function FormComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { control, handleSubmit, formState, reset } = useForm<any>({
    resolver: yupResolver(forgetFormSchema),
  });

  const { errors }: { errors: any } = formState;

  const [loading, setLoading] = useState<boolean>(false);

  const formSubmit = async (form: any) => {
    setLoading(true);
    const { message, success }: any = await AuthApi.forgetPassword(form);

    if (success) {
      dispatch(authSlice.actions.setUserName(form.username));
      router.push('/otp-verification');
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: message,
        }),
      );
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: message,
        }),
      );
    }
    setLoading(false);
  };

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(formSubmit)}
      noValidate
    >
      <Controller
        name="username"
        control={control}
        rules={{ required: 'username is required.' }}
        defaultValue=""
        render={({ field, fieldState }) => (
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-900 text-md"
            >
              Your email or mobile number
            </label>
            <InputText
              id={field.name}
              value={field.value}
              className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-3 ${
                fieldState.error ? `p-invalid` : ''
              }`}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              placeholder="Enter email or mobile number"
            />
            <p className="text-sm text-[#FD0000]">
              {errors?.username?.message ?? ''}
            </p>
          </div>
        )}
      />

      <Button
        type="submit"
        severity="success"
        className="py-3 w-full text-[16px] font-medium rounded-lg text-center text-white bg-[#39B54A] hover:bg-[#2ea23e] focus:ring-2 focus:outline-none focus:ring-primary-300 shadow-[0_4px_9px_-4px_#2cae3e] hover:shadow-none ease-in-out duration-300"
        label="Request password reset"
        loading={loading}
      />
    </form>
  );
}
