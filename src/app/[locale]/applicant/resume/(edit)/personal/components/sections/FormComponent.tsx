'use client';

import AddressDetailComponent from '@/applicant/resume/(edit)/personal/components/elements/AddressDetailComponent';
import CareerDetailComponent from '@/applicant/resume/(edit)/personal/components/elements/CareerDetailComponent';
import DisabilityComponent from '@/applicant/resume/(edit)/personal/components/elements/DisabilityComponent';
import OtherComponent from '@/applicant/resume/(edit)/personal/components/elements/OtherComponent';
import PersonalDetailComponent from '@/applicant/resume/(edit)/personal/components/elements/PersonalDetailComponent';
import PreferredAreaComponent from '@/applicant/resume/(edit)/personal/components/elements/PreferredAreaComponent';
import { useAppDispatch } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';
import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { PersonalDTO } from '../../personal';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalFormSchema } from '../../validators/personal.schema';
import { defaultPersonalInput } from '../../shared/constant';
// import Loading from '@/applicant/resume/(edit)/loading';
import ProfileApi from '@/app/api/applicant/profile';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useFetchNStore from '@/hooks/useFetchNStore';
import { toastActions } from '@/redux/features/toast.slice';
import CommonApi from '@/app/api/common/data';
import { checkEmpty, objectNullToString } from '@/services/Utility';
import Link from 'next/link';
import Loader from '../../../components/Loader';
import { useSession } from 'next-auth/react';
import { getUserDetail } from '@/app/api/applicant/layout';

export default function PersonalFormComponent({
  functionData,
  skillData,
}: any) {
  const formOptions: any = useFetchNStore('formOptions');
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const router = useRouter();
  let submitRef = useRef<any>();

  const { data: session, update: updateSession }: any = useSession();
  const { data: userInfo }: any = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetail(),
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isNextLoading, setIsNextLoading] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<any>(defaultPersonalInput);

  const form: UseFormReturn<PersonalDTO, UseFormProps> = useForm<PersonalDTO>({
    resolver: yupResolver(personalFormSchema),
    defaultValues: defaultPersonalInput,
  });

  const fatchProfile = async () => {
    const response: any = await ProfileApi.getProfileInfo('personal');

    if (response.success) {
      if (!checkEmpty(response.data)) {
        const data = objectNullToString(response.data);
        data.has_disability
          ? (data.has_disability = 1)
          : (data.has_disability = 0);
        form.reset(data);
        setProfileInfo(data);
      }
    }
  };

  useEffect(() => {
    fatchProfile();
  }, []);

  async function sessionUpdate() {
    await updateSession({
      ...session,
      user: userInfo.data.user,
    });
  }

  useEffect(() => {
    if (!checkEmpty(userInfo)) {
      if (userInfo.success) {
        if (!checkEmpty(userInfo.data)) {
          sessionUpdate();
        }
      }
    }
  }, [userInfo]);

  const personalFormSubmit = async (formData: PersonalDTO) => {
    setLoading(true);
    formData.category = 'personal';
    if (formData.is_same_address) {
      formData['permanent_address'] = formData.present_address;
    }
    const { data, message, success } = await ProfileApi.saveProfileInfo(
      formData,
    );
    if (success) {
      queryClient.invalidateQueries(['resume_status']);
      updateSession();
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: String(message),
        }),
      );
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: String(message),
        }),
      );
    }
    setLoading(false);
  };

  const handleNext = async (formData: PersonalDTO) => {
    setIsNextLoading(true);
    formData.category = 'personal';
    if (formData.is_same_address) {
      formData['permanent_address'] = formData.present_address;
    }
    const { data, message, success } = await ProfileApi.saveProfileInfo(
      formData,
    );
    if (success) {
      queryClient.invalidateQueries(['resume_status']);
      updateSession();
      router.push('/applicant/resume/education');
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: String(message),
        }),
      );
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: String(message),
        }),
      );
      setIsNextLoading(false);
    }
  };

  if (formOptions.isLoading) {
    // return <Loading />;
    return <Loader />;
  }

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(personalFormSubmit)}
          noValidate
          autoComplete="off"
          ref={submitRef}
        >
          <div className="grid grid-cols-1 gap-3 2xl:grid-cols-2">
            <div className="col">
              <div className="bg-[#f2f3f8] pt-2 pb-5 px-4 rounded-lg mb-4 border border-[#e2e2e2]">
                <PersonalDetailComponent
                  formOptions={formOptions}
                  ProfileInfo={profileInfo}
                />
              </div>
              <div className="bg-[#f2f3f8] pt-2 pb-5 px-4 rounded-lg mb-4 border border-[#e2e2e2]">
                <AddressDetailComponent ProfileInfo={profileInfo} />
              </div>
            </div>
            <div className="col">
              <div className='bg-[#f2f3f8] pt-2 pb-5 px-4 rounded-lg mb-4 border border-[#e2e2e2]'>
                <CareerDetailComponent formOptions={formOptions} />
              </div>
              <div className='bg-[#f2f3f8] pt-4 pb-5 px-4 rounded-lg mb-4 border border-[#e2e2e2]'>
                <PreferredAreaComponent
                  functionData={functionData}
                  skillData={skillData}/>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 mb-6 2xl:grid-cols-3 sm:grid-cols-2">
            <div className="col-span-2 bg-[#f2f3f8] pt-2 pb-5 px-4 rounded-lg mb-4 border border-[#e2e2e2]">
              <OtherComponent />
            </div>
            <div className="col-span-2 mb-4 2xl:col-span-1">
              <div className="2xl:w-full md:w-[500px] w-full float-right bg-[#f2f3f8] pt-2 pb-5 px-4 rounded-lg border border-[#e2e2e2]">
                <DisabilityComponent />
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full mb-4 space-x-2">
            <Button
              severity="success"
              label="Save"
              loading={isLoading}
              className="rounded-lg w-auto px-10 py-2.5 text-center"
            />
            <Button
              type="button"
              severity='info'
              label="Save & Next"
              icon="fa fa-circle-chevron-right"
              iconPos="right"
              className="rounded-lg w-auto px-10 py-2.5 text-center"
              onClick={form.handleSubmit(handleNext)}
              loading={isNextLoading}
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
