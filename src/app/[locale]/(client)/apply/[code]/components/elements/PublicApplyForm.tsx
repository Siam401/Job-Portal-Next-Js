'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { TextInput } from '@/components/form/client/element/TextInput';
import { TextareaInput } from '@/components/form/client/element/TextareaInput';
import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApplyDTO } from '@/client/apply/apply';
import {
  applyFormSchemaWithSession,
  applyFormSchemaWithoutSession,
} from '@/client/apply/[code]/validators/apply.schema';
import ApplyApi from '@/app/api/client/apply';
import { useAppDispatch } from '@/redux/hook';
import { toastActions } from '@/redux/features/toast.slice';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import PublicApplyFormBasic from './PublicApplyFormBasic';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  defaultApplyInput,
  defaultApplyInputWithSession,
} from '../../shared/constant';
import { checkAuthentication } from '@/app/api/auth/auth';
import JobApplyButtonComponent from './JobApplyButtonComponent';
import { useQueryClient } from '@tanstack/react-query';

export default function PublicApplyForm({
  jobDetailData,
}: {
  jobDetailData: any;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session, status, update }: any = useSession();
  const isLogIn: boolean = checkAuthentication();
  const queryClient = useQueryClient();
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const [jobCode, setJobCode] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  const form: UseFormReturn<ApplyDTO, UseFormProps> = useForm<ApplyDTO>({
    resolver: yupResolver(
      isLogIn ? applyFormSchemaWithSession : applyFormSchemaWithoutSession,
    ),
    defaultValues: isLogIn ? defaultApplyInputWithSession : defaultApplyInput,
  });

  /**
   * put session data in apply form
   */
  useEffect(() => {
    if (status === 'authenticated') {
      form.setValue('first_name', session.user.applicant.first_name);
      form.setValue('last_name', session.user.applicant.last_name ?? '');
      form.setValue('email', session.user.applicant.email ?? '');
      form.setValue('mobile', session.user.applicant.mobile ?? '');
      form.setValue('gender', session.user.applicant.gender);
    }
  }, [update]);

  /**
   * form generate logics
   */
  useEffect(() => {
    setJobCode(jobDetailData.code);
    form.setValue('show_photo', false);
    form.setValue('show_cover_letter', false);
    form.setValue('job_code', jobDetailData.code);
    form.setValue('country_code', '880');
    jobDetailData.form.inputs &&
      jobDetailData.form.inputs.map((value: string) => {
        value == 'photo'
          ? form.setValue('show_photo', true)
          : form.unregister('photo');
        value == 'cover_letter'
          ? form.setValue('show_cover_letter', true)
          : form.unregister('cover_letter');
      });
    jobDetailData.form.questions &&
      jobDetailData.form.questions.map((value: any, index: number) => {
        form.setValue(`questions.${index}.question`, '');
        form.setValue(`questions.${index}.answer`, '');
        form.setValue(`questions.${index}.is_required`, false);
      });
  }, [jobDetailData]);

  /**
   * Form submit fuction
   * @param form
   */
  const applyFormSubmit = async (form: ApplyDTO) => {
    setLoading(true);
    const [data, message, success] = await ApplyApi.create(form);
    if (success) {
      queryClient.invalidateQueries(['user']);
      resetForm();
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: String(message),
        }),
      );
    } else {
      setLoading(false);
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: String(message),
        }),
      );
    }
  };

  /**
   * form reset function
   */
  const resetForm = () => {
    form.reset(defaultApplyInput);
    form.setValue('show_photo', false);
    form.setValue('show_cover_letter', false);
    form.setValue('job_code', jobDetailData.code);
    setLoading(false);
    setVisibleRight(false);
    router.push('/apply/' + jobCode);
  };

  return (
    <>
      <JobApplyButtonComponent
        setVisibleRight={setVisibleRight}
        jobDetailData={jobDetailData}
      />

      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        className="p-sidebar-lg sm:!w-[60rem] !w-[97%]"
        showCloseIcon={false}
      >
        <button
          type="button"
          data-drawer-hide="drawer-right"
          aria-controls="drawer-right"
          className="absolute inline-flex items-center top-5 left-5"
          onClick={() => setVisibleRight(false)}
        >
          <i className="fa-solid fa-xmark h-[20px] w-[20px] text-red-200 bg-red-500 rounded-full text-sm leading-sm hover:text-white"></i>
          <span className="sr-only">Close menu</span>
        </button>
        {status != 'authenticated' && (
          <h5
            id="drawer-navigation-label"
            className="text-sm font-medium text-center text-red-600"
          >
            ! You are going to apply without sign in
          </h5>
        )}
        <div className="pt-3 w-[500px] max-w-full m-auto">
          <div className="w-full">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
              Apply
              {status != 'authenticated' && ' without signin'}
            </h1>
            <p className="pb-5 mt-0 text-center text-gray-500 text-md">
              Please fill up the require forms to apply your job now.
            </p>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(applyFormSubmit)}
                noValidate
                autoComplete="off"
                className="space-y-3 md:space-y-4"
              >
                <PublicApplyFormBasic jobDetailData={jobDetailData} />

                {jobDetailData.form.inputs &&
                  jobDetailData.form.inputs.indexOf('cover_letter') > -1 && (
                    <TextareaInput
                      label="Cover Letter"
                      name="cover_letter"
                      placeholder="Type your cover letter here"
                      required={true}
                    />
                  )}

                {jobDetailData.form.questions &&
                  jobDetailData.form.questions.map(
                    (value: any, index: number) => {
                      return (
                        <div key={index}>
                          <TextInput
                            type="hidden"
                            name={`questions.${index}.question`}
                            value={value.question}
                          />
                          <TextInput
                            label={value.question}
                            name={`questions.${index}.answer`}
                            placeholder="Your answer"
                            required={value.is_required ? true : false}
                          />
                          <TextInput
                            type="hidden"
                            name={`questions.${index}.is_required`}
                            value={value.is_required ? true : false}
                          />
                        </div>
                      );
                    },
                  )}

                <Button
                  type="submit"
                  severity="success"
                  className="block py-3 w-full text-sm font-semibold rounded-lg text-center text-white bg-[#39B54A] hover:bg-[#2ea23e] focus:ring-2 focus:outline-none focus:ring-primary-300 shadow-[0_4px_9px_-4px_#2cae3e] hover:shadow-none ease-in-out duration-300"
                  label="Apply Now"
                  loading={isLoading}
                />
                {status != 'authenticated' && (
                  <>
                    <Link
                      className="table mx-auto py-2 px-5 ring-1 ring-[#39B54A] text-[13px] font-bold text-[#39B54A] rounded-full hover:bg-gray-100"
                      href="/signup"
                    >
                      Apply after Registration
                    </Link>
                    <p className="mb-6 text-center text-gray-500 text-md">
                      Already have an account?{' '}
                      <Link
                        href="/signin"
                        className="font-medium text-[#39B54A] hover:underline"
                      >
                        Sign in
                      </Link>
                    </p>
                  </>
                )}
              </form>
            </FormProvider>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
