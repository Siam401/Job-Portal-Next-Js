'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import useClickOutside from '@/hooks/useClickOutside';
import avatar from '@/assets/images/avatar.svg';
import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from '@/app/api/applicant/layout';
import Loader from '@/applicant/components/Loader';
import { useDispatch } from 'react-redux';
import { setAppliedJob } from '@/redux/features/appliedJobList.slice';
import ModalContainer from '@/components/ui/ModalConainer';
import { openModal } from '@/redux/features/modal.slice';
import ModalContentForm from '../change-password/ModalContentForm';

const ProfilePanel = (initialData: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideChangePassword, setHideChangePassword] = useState(false);

  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetail(),
    initialData,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5 * 10, // 1 minute
  });

  if (response?.success === false) {
    throw new Error((response?.message ?? '').toString());
  }

  const data = response?.data as any;

  const user = data?.user;

  const applied_jobs = data?.user.applicant.applied_jobs;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppliedJob(applied_jobs));
  }, [applied_jobs]);

  // const { email, mobile } = user;

  // useEffect(() => {
  //   if (!email && !mobile) {
  //     setHideChangePassword(true);
  //   }
  // }, [email, mobile]);

  return (
    <>
      {isLoading ? (
        <Loader isProfileMenu />
      ) : (
        <div ref={ref as React.RefObject<HTMLDivElement>} className="h-[50px]">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            type="button"
            className="items-center space-x-2 text-[#000] hover:text-[#39B54A]"
          >
            <div className="shrink-0">
              {user?.photo ? (
                <img
                  src={user?.photo}
                  alt="profile_image"
                  className="h-[50px] w-[50px] object-cover rounded-full"
                />
              ) : (
                <Image
                  priority
                  src={avatar}
                  className="h-[50px] w-[50px] object-cover rounded-full"
                  alt="profile_image"
                />
              )}
            </div>
          </button>
          <div
            className={
              'z-10 bg-white rounded-lg shadow-lg shadow-[rgba(30,90,148,0.25)] w-[310px] absolute right-0 top-[70px] mt-0 ' +
              (isOpen ? '' : 'hidden')
            }
          >
            <ul
              className="py-3 px-3 text-sm text-gray-700 text-center font-semibold bg-[#CCDEF0]"
              aria-labelledby="dropdownDividerButton"
            >
              <div className="mb-2 text-center shrink-0">
                {user?.photo ? (
                  <img
                    src={user?.photo}
                    alt="profile_image"
                    className="h-[80px] w-[80px] object-cover rounded-full mx-auto"
                  />
                ) : (
                  <Image
                    priority
                    src={avatar}
                    className="h-[80px] w-[80px] object-cover rounded-full mx-auto"
                    alt="profile"
                  />
                )}
              </div>
              <p className="text-lg text-gray-900" role="none">
                {user?.name}
              </p>
              <p className="text-sm text-gray-600" role="none">
                {user?.email}
              </p>
            </ul>

            {/* section: change password  */}
            {!user?.mobile && !user?.email ? null : (
              <ul
                className="font-semibold text-gray-700"
                aria-labelledby="dropdownDividerButton"
              >
                <li>
                  <button
                    onClick={() => {
                      setIsOpen(!isOpen);
                      dispatch(openModal('password-change-modal'));
                    }}
                    className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#39B54A]"
                  >
                    <i className="w-4 text-center fa fa-light fa-key"></i>{' '}
                    Change Password
                  </button>
                </li>
              </ul>
            )}

            {/* section: sign out */}
            <ul
              className="p-3 font-semibold text-gray-700 border-t"
              aria-labelledby="dropdownDividerButton"
            >
              <li>
                <Link
                  href="/signout"
                  className="block px-4 py-4 rounded-lg text-center text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-[#FE0101] ease-in-out transition"
                >
                  <i className="w-4 text-center me-1 fa fa-light fa-arrow-right-from-bracket"></i>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <ModalContainer
        maskClassName="!bg-gray-900/50"
        className="relative w-full max-w-[520px] max-h-full"
        id="password-change-modal"
        header={
          <h3 className="text-[20px] font-bold text-[#222]">Change Password</h3>
        }
        content={<ModalContentForm />}
      />
    </>
  );
};

export default ProfilePanel;
