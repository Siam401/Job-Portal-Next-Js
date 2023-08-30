'use client';

import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
}

type Notification = {
  id: number;
  avatarSrc: string;
  title: string;
  subject: string;
  send_at: string;
  status: number;
};

const NotificationList = ({ notifications }: NotificationListProps) => {
  return (
    <>
      {notifications?.length > 0 ? (
        <div className="divide-y divide-[#CCDEF0] border-b border-[#CCDEF0]">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full mt-10">
          <p className="text-gray-500 text-lg font-medium">
            No notifications to show
          </p>
        </div>
      )}
    </>
  );
};

export default NotificationList;
