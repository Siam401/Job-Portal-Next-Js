import { NextPage } from 'next';
import EmploymentHistory from './components/EmploymentHistory';
import { getProfileInfo } from '@/app/api/applicant/experience';
import { Session } from '@/types/session';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/[locale]/(client)/(auth)/utils/auth';

const ExperiencePage: NextPage = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const token = session?.token as string;

  const employment = await getProfileInfo('experience', token);

  if (employment?.success === false) {
    throw new Error((employment?.message ?? 'Something went wrong').toString());
  }

  return (
    <>
      <EmploymentHistory initialData={employment} />
    </>
  );
};

export default ExperiencePage;
