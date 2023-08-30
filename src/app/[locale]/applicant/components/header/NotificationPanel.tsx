'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { useState } from 'react';
import notificationSVG from '@/assets/icons/applicant/notification.svg';
import Image from 'next/image';
import avatar from '@/assets/images/avatar.svg';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserDetail } from '@/app/api/applicant/layout';
import { humanizeTimestamp } from '@/services/Utility';
import Loader from '@/applicant/components/Loader';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSelectedId } from '@/redux/features/notification.slice';

/**
 * notification status
 * 0 = unseen
 * 1 = seen
 * 2 = read
 */

const NotificationPanel = (initialData: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetail(),
    // initialData,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5 * 10, // 1 minute
  });
  if (response?.success === false) {
    throw new Error((response?.message ?? '').toString());
  }

  const data = response?.data as any;

  const notifications = data?.notifications;
  const unseen = data?.notifications?.unseen;
  const profileImage = data?.user?.photo;

  const handleClickNotification = (id: number) => {
    refetch();
    setIsOpen(false);
    router.push('/applicant/notification');
    dispatch(setSelectedId(id));
    queryClient.invalidateQueries(['user']);
  };

  const handelViewAll = () => {
    queryClient.invalidateQueries(['user']);
    queryClient.invalidateQueries(['notificationList']);
    setIsOpen(false);
    router.push('/applicant/notification');
  };

  return (
    <>
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        {/* section: notification toggler */}
        <button
          type="button"
          className="flex relative items-center text-center h-[36px] w-[36px] rounded-full bg-[#CCDEF0] hover:bg-[#9bc8ff] ease-in-out duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            priority
            src={notificationSVG}
            className="mx-auto"
            alt="notification"
          />
          {unseen === 0 || unseen === undefined ? null : (
            <span className="absolute right-[-2px] top-[0] w-[12px] h-[12px] bg-[#ff0000] rounded-full border-white border-2"></span>
          )}
        </button>

        {/* section: notification dropdown panel */}
        <div
          className={
            'z-20 sm:w-[385px] w-[358px] bg-white shadow-lg shadow-[rgba(30,90,148,0.25)] absolute sm:right-[120px] right-0 top-[70px] mt-0 ' +
            (isOpen ? '' : 'hidden')
          }
        >
          <div className="block h-[40px] px-4 py-2 text-[16px] font-semibold text-center text-gray-700 bg-[#CCDEF0]">
            Notifications
          </div>
          <div className="divide-y divide-[#CCDEF0]">
            {isLoading ? (
              // section: skeleton
              <Loader isNotificationMenu />
            ) : notifications?.recent.length === 0 ? (
              <div className="flex items-center px-4 py-3 hover:bg-[rgba(34,168,1,0.11)] ease-in-out transition">
                <div className="w-full py-3 pl-3">
                  <span className="text-md font-semibold text-[#01468B] ">
                    No recent notifications
                  </span>
                </div>
              </div>
            ) : (
              // section: notification list
              notifications?.recent.map((item: any) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleClickNotification(item.id)}
                  className="flex items-center px-4 py-3 hover:bg-[rgba(34,168,1,0.11)] w-full ease-in-out transition text-left"
                >
                  <div className="flex-shrink-0">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        className="object-cover rounded-full w-14 h-14"
                        alt={item.title}
                      />
                    ) : (
                      <Image
                        priority
                        src={avatar}
                        className="object-cover rounded-full w-14 h-14"
                        alt={item.title}
                      />
                    )}
                  </div>
                  <div className="w-full pl-3">
                    <span
                      className={`text-md font-semibold
                    ${item.status === 2 ? 'text-[#01468B]' : 'text-[#22A801]'}
                    `}
                    >
                      {item.title}
                    </span>
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                      {item.subject}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-500">
                      {humanizeTimestamp(item.send_at)}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* section: view all link  */}
          <div className="bg-gray-100 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => handelViewAll()}
              className="block py-2 text-sm font-medium text-center text-gray-900 bg-[#CCDEF0] hover:bg-[#bfdfff] w-full"
            >
              <div className="inline-flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-[#01468B]"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                View all
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
