'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { openModal } from '@/redux/features/modal.slice';
import { getResumeStatus } from '@/app/api/applicant/resume';
import { useSession } from 'next-auth/react';
import WarningDialog from '@/components/ui/WarningDialog';
import { checkEmpty } from '@/services/Utility';
import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from '@/app/api/applicant/layout';

export default function JobApplyButtonComponent({
  setVisibleRight,
  jobDetailData,
}: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session, status, update }: any = useSession();
  const [isApplyLoading, setApplyLoading] = useState<boolean>(false);
  const [isApplyDisable, setIsApplyDisable] = useState<boolean>(false);

  /**
   * apply button whether to show form or profile completion warning
   */
  const applyButton = async () => {
    setApplyLoading(true);
    if (status === 'authenticated') {
      const [data, success, message]: any = await getResumeStatus();
      if (success) {
        if (data.resume_completion_percentage >= 10) {
          setVisibleRight(true);
        } else {
          dispatch(openModal('waring-profile-update'));
        }
      } else {
        dispatch(openModal('waring-profile-update'));
      }
    } else {
      setVisibleRight(true);
    }
    setApplyLoading(false);
  };

  const { data: response }: any = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetail(),
  });

  useEffect(() => {
    if (!checkEmpty(response)) {
      if (response.success) {
        if (!checkEmpty(response.data)) {
          const appliedJobList = response.data.user.applicant.applied_jobs;
          appliedJobList.map((value: any) => {
            if (value === jobDetailData.code) {
              setIsApplyDisable(true);
            }
          });
        }
      }
    }
  }, [response]);

  return (
    <>
      <WarningDialog
        id="waring-profile-update"
        title="Warning !"
        description="please update your profile to apply"
        handleClick={() => {
          router.push('/applicant/resume/personal');
        }}
        btnLabel="Update profile"
      />

      <Button
        type="button"
        severity="success"
        className="table py-3 px-6 mt-5 mx-auto text-white !bg-[#39B54A] hover:!bg-[#2ea23e] focus:ring-[#fff] rounded-lg text-sm uppercase font-bold focus:outline-none focus:ring-[#e9e9e9] shadow-[0_4px_9px_-4px_#2cae3e] hover:shadow-none ease-in-out duration-300"
        data-drawer-target="drawer-right"
        data-drawer-show="drawer-right"
        data-drawer-placement="right"
        aria-controls="drawer-right"
        onClick={() => applyButton()}
        loading={isApplyLoading}
        disabled={isApplyDisable}
        label={isApplyDisable ? 'Already applied' : 'Apply to this position'}
      />
    </>
  );
}
