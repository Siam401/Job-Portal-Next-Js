'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import useClickOutside from '@/hooks/useClickOutside';
import Image from 'next/image';
import avatar from '@/assets/images/avatar.svg';
import { useSession } from 'next-auth/react';

interface ProfileDropdownProps {
  userPhoto: string;
  userName: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userPhoto,
  userName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(userPhoto);
  const { data: session, status, update }: any = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.applicant.photo) {
        setProfileImage(session.user.applicant.photo);
      }
    }
  }, [update]);

  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={ref as React.RefObject<HTMLDivElement>}>
      <button
        data-dropdown-toggle="dropdown"
        className="flex items-center space-x-2 text-[#000] hover:text-[#39B54A]"
        onClick={toggleDropdown}
      >
        <div className="shrink-0">
          {profileImage ? (
            <img
              className="object-cover rounded-full h-9 w-9"
              src={profileImage}
              alt="Current profile photo"
            />
          ) : (
            <Image
              className="object-cover rounded-full h-9 w-9"
              src={avatar}
              alt="Current profile photo"
            />
          )}
        </div>
        <div className="hidden sm:block">
          {userName}
          <i
            className={`fa fa-angle-down transition-transform duration-300 ms-1 pt-0.5 ${
              isOpen ? 'rotate-180' : ''
            }`}
          ></i>
        </div>
      </button>
      {isOpen && (
        <div
          className={
            'z-10 bg-white divide-y divide-gray-100 shadow-xl w-44 block absolute right-0 top-[48px] mt-0 rounded-lg' +
            (isOpen ? '' : 'hidden')
          }
        >
          <ul
            className="py-2 text-sm font-semibold text-gray-700"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <Link
                href="/applicant/dashboard"
                onClick={toggleDropdown}
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#39B54A]"
              >
                <i className="w-4 text-center fa fa-light fa-chart-pie me-1"></i>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/applicant/resume/personal"
                onClick={toggleDropdown}
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#39B54A]"
              >
                <i className="w-4 text-center fa fa-light fa-pen-to-square me-1"></i>
                Edit Resume
              </Link>
            </li>
            <li>
              <Link
                href="/applicant/resume/view"
                onClick={toggleDropdown}
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#39B54A]"
              >
                <i className="w-4 text-center fa fa-light fa-file-download me-1"></i>
                View Resume
              </Link>
            </li>
          </ul>
          <ul
            className="py-2 text-sm font-semibold text-gray-700"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <Link
                href="/applicant/dashboard"
                onClick={toggleDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#39B54A]"
              >
                <i className="w-4 text-center fa fa-light fa-file-upload me-1"></i>
                Applied Jobs
              </Link>
            </li>
          </ul>
          <ul
            className="py-2 text-sm font-semibold text-gray-700"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <Link
                href="/signout"
                onClick={toggleDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#FE0101]"
              >
                <i className="w-4 text-center fa fa-light fa-arrow-right-from-bracket me-1"></i>
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
