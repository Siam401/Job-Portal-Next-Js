'use client';
import { AuthApi } from '@/app/api/auth/auth';
import { toastActions } from '@/redux/features/toast.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import Link from 'next/link';
import authSlice from '@/redux/features/auth.slice';

export default function FormComponent() {
  const dispatch = useAppDispatch();
  const inputRefs = useRef<any>([]);
  const router = useRouter();

  const { control, handleSubmit, formState, reset, setValue } = useForm<any>();

  const { errors }: { errors: any } = formState;

  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(Date.now() + 60000);

  const username: string = useAppSelector((state: any) => state.auth.username);

  useEffect(() => {
    if (username == '') {
      router.push('/signin');
    } else {
      setValue('username', username);
    }
  }, [username]);

  const otpSubmit = async (form: any) => {
    resetForm();
    form.otp = form.otp.join('');
    setLoading(true);
    const { data, message, success }: any = await AuthApi.otpVerify(form);

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
      dispatch(authSlice.actions.setToken(data.token));
      router.push('/reset-password');
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: message,
        }),
      );
    }
  };

  const resendOtp = async () => {
    resetForm();
    setValue('username', username);
    setResendLoading(true);
    const { message, success }: any = await AuthApi.resendPassword({
      username: username,
    });
    if (success) {
      setCurrentTimeIndex(currentTimeIndex + 1);
      setCurrentTime(Date.now() + 60000);
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: message,
        }),
      );
      setIsDisable(true);
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: message,
        }),
      );
    }
    setResendLoading(false);
  };

  const renderer = (props: CountdownRenderProps) => {
    if (props.completed) {
      return '';
    } else {
      return (
        <span>
          in {props.minutes}:{props.seconds} Mins
        </span>
      );
    }
  };

  const resetForm = () => {
    reset();
    setValue('username', username);
  };

  return (
    <>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(otpSubmit)}
        noValidate
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-md font-medium text-gray-900"
          >
            Enter the OTP
          </label>
          <div className="flex space-x-2 items-center text-center">
            {Array.from(Array(6), (e, i) => {
              return (
                <div key={i}>
                  <Controller
                    name={`otp[${i}]`}
                    control={control}
                    rules={{ required: 'OTP is required.' }}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <>
                        <span className="p-float-label">
                          <InputText
                            ref={(ref: any) => (inputRefs.current[i] = ref)}
                            keyfilter="int"
                            maxLength={1}
                            id={field.name}
                            value={field.value}
                            className={`lg:w-[48px] w-[38px] bg-gray-50 border border-gray-300 text-gray-900 text-md text-center rounded-md focus:ring-primary-600 focus:border-primary-600 block py-3 ${
                              fieldState.error ? `p-invalid` : ''
                            }`}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              const nextIndex = i + 1;
                              if (nextIndex < 6) {
                                inputRefs.current[i + 1].focus();
                              }
                            }}
                          />
                        </span>
                      </>
                    )}
                  />
                </div>
              );
            })}
            <p className="text-sm text-[#FD0000]">{errors?.message ?? ''}</p>
          </div>
          <p className="mt-2 text-md text-gray-500">
            Resend code available{' '}
            <Countdown
              date={currentTime}
              key={currentTimeIndex}
              renderer={renderer}
              onComplete={() => {
                setIsDisable(false);
              }}
            />
          </p>
        </div>
        <Button
          type="submit"
          severity="success"
          className="py-3 w-full text-[16px] font-medium rounded-lg text-center text-white bg-[#39B54A] hover:bg-[#2ea23e] focus:ring-2 focus:outline-none focus:ring-primary-300 shadow-[0_4px_9px_-4px_#2cae3e] hover:shadow-none ease-in-out duration-300"
          label="Verify"
          loading={loading}
        />
      </form>
      <div className="flex justify-between">
        <Link
          href="/signin"
          className="text-sm font-medium hover:underline text-[#39B54A] hover:text-[#2ea23e]"
        >
          <i className="fa fa-arrow-left"></i> Go back to Sign in
        </Link>
        <Button
          type="submit"
          className="text-sm font-semibold hover:underline !text-[#39B54A] !hover:text-[#2ea23e]"
          icon="fa fa-redo"
          label="Resend OTP"
          loading={resendLoading}
          disabled={isDisable}
          onClick={resendOtp}
          link
        />
      </div>
    </>
  );
}
