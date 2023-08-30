import { NextPage } from 'next';
import NotificationSection from './components/NotificationSection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session } from '@/types/session';
import { getNotificationList } from '@/app/api/applicant/notification';


const NotificationPage: NextPage = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const token = session?.token as string;

  const response = await getNotificationList(token);

  const { message, success } = response;

  if (!success) {
    throw new Error((message ?? 'Something went wrong').toString());
  }

  return (
    <>
      <NotificationSection initialData={response} token={token} />
    </>
  );
};

export default NotificationPage;
