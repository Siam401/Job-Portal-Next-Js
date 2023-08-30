'use client';

import Link from 'next/link';
import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { SignInDTO } from '@/app/[locale]/(client)/(auth)/auth';
import { signInFormSchema } from '@/app/[locale]/(client)/(auth)/signin/validators/signin.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultSignInInput } from '@/app/[locale]/(client)/(auth)/signin/shared/constant';
import { TextInput } from '@/components/form/client/element/TextInput';
import { CheckboxInput } from '@/components/form/client/element/CheckboxInput';
import { signIn } from 'next-auth/react';
import { useAppDispatch } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toastActions } from '@/redux/features/toast.slice';
import { Button } from 'primereact/button';
import { PasswordInput } from '@/components/form/client/element/PasswordInput';

export default function FormComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form: UseFormReturn<SignInDTO, UseFormProps> = useForm<SignInDTO>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: defaultSignInInput,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const signInFormSubmit = async (form: SignInDTO) => {
    setLoading(true);
    const data = await signIn('credentials', {
      username: form.username,
      password: form.password,
      remember: form.remember,
      redirect: false,
    });

    if (data && data.error) {
      setLoading(false);
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: 'Login credentials mismatched',
        }),
      );
    } else {
      resetForm();
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: 'Login Successful',
        }),
      );
      router.push('/user');
    }
  };

  const resetForm = () => {
    form.reset(defaultSignInInput);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(signInFormSubmit)}
        className="space-y-4 md:space-y-6"
        noValidate
        autoComplete="on"
      >
        <TextInput
          type="email"
          label="Your email or mobile number"
          name="username"
          placeholder="Enter email or mobile number"
          required={true}
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Password"
          required={true}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <CheckboxInput name="remember" label="Remember me" />
          </div>
          <Link
            href={'/forget-password'}
            className="text-sm font-medium hover:underline text-[#39B54A] hover:text-[#2ea23e]"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          severity="success"
          className="block py-3 w-full text-[16px] font-medium rounded-lg text-center text-white bg-[#39B54A] hover:bg-[#2ea23e] focus:ring-2 focus:outline-none focus:ring-primary-300 shadow-[0_4px_9px_-4px_#2cae3e] hover:shadow-none ease-in-out duration-300"
          label="Sign in"
          loading={loading}
        />
      </form>
    </FormProvider>
  );
}
