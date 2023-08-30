'use client';

import { getNotificationList } from '@/app/api/applicant/notification';
import { RootState } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NotificationDetails from './details/NotificationDetails';
import NotificationList from './list/NotificationList';
import Loader from './Loader';

type NotificationSectionProps = {
  initialData: any;
  token?: string;
};

const NotificationSection = ({
  initialData,
  token,
}: NotificationSectionProps) => {
  const [page, setPage] = useState(1);

  const id = useSelector((state: RootState) => state.notification.selectedId);

  const { data: response, isLoading } = useQuery({
    queryKey: ['notificationList', page],
    queryFn: () =>
      getNotificationList(token, {
        page: page,
        paginate_count: 10,
      }),
    initialData,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return <Loader isNotificationDetails />;
  }

  if (response?.success === false) {
    throw new Error((response?.message ?? 'Something went wrong').toString());
  }

  const notifications = response.data?.data as any;

  const meta = response.data?.meta;

  let isListFetched = false;

  if (notifications) {
    isListFetched = true;
  }
  const total = meta?.total;
  const totalPages = meta?.last_page;
  const currentPage = meta?.current_page;
  const pageSize = meta?.per_page;

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const notificationsInPage = notifications.slice(start, end);

  const startRange = (currentPage - 1) * 10 + 1;
  const endRange =
    currentPage === meta?.last_page
      ? total
      : startRange + notificationsInPage.length - 1;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };
  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 mb-4">
        {/* section: left */}
        <div className="col">
          <div className="z-20 w-full bg-[#f4f4f4] sm:min-h-screen min-h-min border-e-2 border-[#01468B]">
            <div className="grid grid-cols-2 px-4 py-3 bg-gradient-to-b from-[#01468B] to-[#023161]">
              {/* section: title */}
              <h3 className="text-[18px] font-semibold text-[#fff]">
                Notifications
              </h3>

              {/* section: pagination */}
              <h4 className="text-end text-[#fff] flex items-center justify-end">
                <span
                  className={notifications.length === 0 ? 'hidden' : 'block'}
                  style={{ padding: '0 10px' }}
                >
                  {startRange} - {endRange} &nbsp;of {total}
                </span>
                <button
                  disabled={currentPage === 1}
                  className="block w-[26px] height-[20px] text-center border border-[#00264d] hover:bg-[#00264d] me-2"
                  onClick={handlePrevPage}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button
                  disabled={currentPage === totalPages}
                  className="block w-[26px] height-[20px] text-center border border-[#00264d] hover:bg-[#00264d]"
                  onClick={handleNextPage}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </h4>
            </div>

            {/* section: notification List */}
            <NotificationList notifications={notifications} />
          </div>
        </div>

        {/* section: right */}
        {isListFetched ? (
          id ? (
            <NotificationDetails id={id} />
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-center h-[80%]">
                <div className="text-gray-500 text-center">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    Select a notification
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Click on a notification to view its details
                  </p>
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default NotificationSection;
