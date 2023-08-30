'use client';

import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { SignUpDTO } from '@/app/[locale]/(client)/(auth)/auth';
import { signUpFormSchema } from '@/app/[locale]/(client)/(auth)/signup/validators/signup.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultSignUpInput } from '@/app/[locale]/(client)/(auth)/signup/shared/constant';
import { useState } from 'react';
import { TextInput } from '@/components/form/client/element/TextInput';
import { FileInput } from '@/components/form/client/element/FileInput';
import PhotoComponent from '@/app/[locale]/(client)/(auth)/signup/components/sections/PhotoComponent';
import { RadioInput } from '@/components/form/client/element/RadioInput';
import { Divider } from 'primereact/divider';
import { AuthApi } from '@/app/api/auth/auth';
import { useAppDispatch } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import { toastActions } from '@/redux/features/toast.slice';
import { Button } from 'primereact/button';
import { PasswordInput } from '@/components/form/client/element/PasswordInput';

export default function FormComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form: UseFormReturn<SignUpDTO, UseFormProps> = useForm<SignUpDTO>({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: defaultSignUpInput,
  });

  const { errors }: { errors: any } = form.formState;

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>();

  const signUpFormSubmit = async (form: SignUpDTO) => {
    setLoading(true);
    const { success, message }: any = await AuthApi.registration(form);

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
      router.push('/signin');
      resetForm();
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

  const resetForm = () => {
    form.reset(defaultSignUpInput);
    setSelectedFile(null);
  };

  const getFormErrorMessage = (name: any) => {
    return errors[name] ? (
      <p className="text-sm text-[#FD0000]">{errors[name].message}</p>
    ) : (
      <p className="text-sm text-[#FD0000]"></p>
    );
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
        onSubmit={form.handleSubmit(signUpFormSubmit)}
        className="space-y-3 md:space-y-4"
        noValidate
        autoComplete="off"
      >
        <div>
          <label
            htmlFor="text"
            className="block mb-1 text-sm font-semibold text-gray-900 after:content-['*'] after:text-[#FD0000] after:ml-1"
          >
            Applicant&lsquo;s Name
          </label>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <TextInput name="first_name" placeholder="First Name" />
            <TextInput name="last_name" placeholder="Last Name" />
          </div>
        </div>

        <TextInput
          label="Email"
          name="email"
          placeholder="name@company.com"
          required={true}
        />

        <TextInput
          label="Mobile Number"
          name="mobile"
          placeholder="Mobile Number"
          required={true}
        />

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-900 after:content-['*'] after:text-[#FD0000] after:ml-1">
            Gender
          </label>
          <fieldset className="mb-5">
            <RadioInput name="gender" label="Male" value="male" />
            <RadioInput name="gender" label="Female" value="female" />
            <RadioInput name="gender" label="Other" value="other" />
            {getFormErrorMessage('gender')}
          </fieldset>
        </div>

        <div className="fileInput">
          <FileInput label="CV/Resume" name="resume" required={true} />
        </div>

        <div className="photoInput">
          <PhotoComponent
            getFormErrorMessage={getFormErrorMessage}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </div>

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
          label="Registration"
          loading={loading}
        />
      </form>
    </FormProvider>
  );
}
