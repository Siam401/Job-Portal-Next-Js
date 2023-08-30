'use client';

import ContentHeader from './ContentHeader';
import NotificationContent from './NotificationContent';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotificationDetail } from '@/app/api/applicant/notification';
import Loader from '../Loader';

interface NotificationDetailsProps {
  id: number;
}

type NotificationDetails = {
  id: number;
  date: string;
  title: string;
  subject: string;
  send_at: string;
  content: string;
};

const NotificationDetails = ({ id }: NotificationDetailsProps) => {
  const queryClient = useQueryClient();
  const {
    data: response,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['notification', id],
    queryFn: () => getNotificationDetail(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loader isNotificationDetails />;
  }

  if (response?.success === false) {
    throw new Error((response?.message ?? '').toString());
  }

  const { data } = response as any;

  const notification = data as NotificationDetails;

  if (isFetched) {
    queryClient.invalidateQueries(['notificationList']);
  }
  return (
    <>
      <div className="col">
        <div className="z-20 w-full bg-[#fff] min-h-screen">
          <div className="divide-y divide-[#CCDEF0] ">
            <ContentHeader
              title={notification.title}
              send_at={notification.send_at}
              id={notification.id}
            />
            <NotificationContent
              content={notification.content}
              subject={notification.subject}
              date={notification.date}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDetails;
