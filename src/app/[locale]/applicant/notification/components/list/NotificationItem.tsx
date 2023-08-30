'use client';

import { getUserDetail } from '@/app/api/applicant/layout';
import { setSelectedId } from '@/redux/features/notification.slice';
import { RootState } from '@/redux/store';
import { humanizeTimestamp } from '@/services/Utility';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '@/assets/images/avatar.svg';
import { useRef } from 'react';
import { deleteNotification } from '@/app/api/applicant/notification';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { closeModal, openModal } from '@/redux/features/modal.slice';
import { toastActions } from '@/redux/features/toast.slice';

/**
 * notification status
 * 0 = unseen
 * 1 = seen
 * 2 = read
 */

interface NotificationItemProps {
  id: number;
  title: string;
  subject: string;
  send_at: string;
  status: number;
}

const NotificationItem = ({
  id,
  title,
  subject,
  send_at,
  status,
}: NotificationItemProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLElement>(null);
  // const [currentStatus, setCurrentStatus] = useState(status);

  const selectedId = useSelector(
    (state: RootState) => state.notification.selectedId,
  );

  const activeDivClass =
    selectedId === id ? 'bg-white opacity-100' : 'opacity-70 hover:opacity-100';

  const activeTitleClass = selectedId === id ? 'font-bold' : 'font-semibold';

  const readTitleClass = status === 2 ? 'text-[#01468B]' : 'text-[#22A801]';

  const { data: response, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetail(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5, // 1 minute
  });

  if (response?.success === false) {
    throw new Error((response?.message ?? '').toString());
  }

  const data = response?.data as any;

  const user = data?.user;

  const handleClick = () => {
    dispatch(setSelectedId(id));
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation(deleteNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notificationList']);
      queryClient.invalidateQueries(['notification', id]);
      dispatch(closeModal(id));
      dispatch(setSelectedId(null));
      dispatch(
        toastActions.showToast({
          message: 'Notification deleted successfully',
          type: 'success',
          summary: 'Success',
        }),
      );
    },
  });

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`grid grid-cols-7 px-4 py-3 hover:bg-[rgba(34,168,1,0.11)] ease-in-out transition ${activeDivClass} cursor-pointer`}
      >
        <div className="flex items-center col-span-5">
          {user ? (
            <img
              src={user?.photo}
              alt="profile_image"
              className="object-cover rounded-full w-14 h-14"
            />
          ) : (
            <Image
              priority
              src={avatar}
              className="object-cover rounded-full w-14 h-14"
              alt="profile_image"
            />
          )}
          <div className="pl-3">
            <span
              ref={ref}
              className={`text-md ${readTitleClass} ${activeTitleClass}`}
            >
              {title}
            </span>
            <div className="text-gray-500 text-sm mb-1.5">{subject}</div>
          </div>
        </div>
        <div className="col-span-2 text-end">
          <div className="text-xs text-blue-600">
            {humanizeTimestamp(send_at)}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(openModal(`delete-notification-${id}`));
            }}
            className="block float-right justify-end mt-2 text-[#ff0000]">
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>

      <ConfirmDialog
        id={`delete-notification-${id}`}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default NotificationItem;
