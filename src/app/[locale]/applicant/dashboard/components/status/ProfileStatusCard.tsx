'use client';

import React from 'react';

import avatarSVG from '@/assets/images/avatar.svg';
import Image from 'next/image';
import { ProgressBar } from 'primereact/progressbar';
import { getDashboardData } from '@/app/api/applicant/dashboard';
import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from '@/app/api/applicant/layout';
import Link from 'next/link';

type Props = {
  initialData: any;
};

const ProfileStatusCard = ({ initialData }: Props) => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: () => getDashboardData(),
    initialData,
  });

  const { data: userResponse, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetail(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5, // 1 minute
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (response?.success === false || userResponse?.success === false) {
    throw new Error(
      (
        response?.message ??
        userResponse?.message ??
        'Something went wrong'
      ).toString(),
    );
  }

  const { resume_completion_percentage: percentage } = response.data;

  const data = userResponse?.data as any;
  const user = data?.user;

  const profileImage = user?.photo ? user?.photo : null;

  return (
    <>
      <div className="flex bg-white shadow rounded-lg border border-[#E5E7EB] md:p-[20px] p-[10px] md:pb-[20px] pb-[24px] mb-3 relative">
        {profileImage ? (
          <img
            className="md:w-[105px] md:h-[105px] w-[55px] h-[55px] border border-[#014283] rounded-lg object-cover object-center"
            src={profileImage}
            alt="user"
          />
        ) : (
          <Image
            priority
            src={avatarSVG}
            alt="user"
            className="md:w-[105px] md:h-[105px] w-[55px] h-[55px] border border-[#014283] rounded-lg object-cover object-center"
          />
        )}
        <div className="ml-3 max-w-[80%] w-[690px]">
          <h1 className="text-[#3d3d3d] md:text-[28px] text-[16px] font-semibold md:mb-[15px] sm:mb-0">
            {user?.name}
          </h1>

          <ProgressBar
            value={percentage}
            showValue={false}
            color="#023B75"
            className="md:h-[10px] bg-[#d9d9d9] h-[4px] rounded-none"
          ></ProgressBar>
          <h4 className="text-[#3D3D3D] md:text-[16px] text-[13px] font-semibold md:mt-[10px] sm:mt-0">
            Your Resume Completion Status
            <span className="text-[#E92C2C] font-bold ps-1">{percentage}%</span>
          </h4>
        </div>
        <div className="absolute right-[20px] md:bottom-[20px] bottom-[10px]">
          <Link
            href="/applicant/resume/personal"
            className="block text-[#22A801] md:text-[16px] text-[14px] font-semibold mt-[10px] underline"
          >
            Update Resume
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileStatusCard;
