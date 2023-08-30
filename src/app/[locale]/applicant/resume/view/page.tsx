import { Session } from '@/types/session';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { viewResume } from '@/app/api/applicant/resume';

// import: tables
import ViewResumeComponent from './components/ViewResumeComponent';

const page = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const token = session?.token as string;

  const resumeData = await viewResume(token);

  if (resumeData?.success === false) {
    throw new Error((resumeData?.message ?? 'Something went wrong').toString());
  }

  return (
    <>
      <ViewResumeComponent resumeData={resumeData} />
    </>
  );
};

export default page;
