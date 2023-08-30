import { NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session } from '@/types/session';

import {
  getApplications,
  getDashboardData,
} from '@/app/api/applicant/dashboard';
import ApplicationSummary from './components/ApplicationSummary';
import ProfileStatusCard from './components/status/ProfileStatusCard';
import ScheduleSummary from './components/ScheduleSummary';
import ResumeSection from './components/ResumeSection';
import { getResume } from '@/app/api/applicant/resume';
import { getUserDetail } from '@/app/api/applicant/layout';

const DashboardPage: NextPage = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const token = session?.token as string;

  const response = await getDashboardData(token);

  // prettier-ignore
  const applications = await getApplications( { page: 1, paginate_count: 5, }, 'all', token, );

  const resume = await getResume(token);

  const userResponse = await getUserDetail(token);

  const { message, success } = response;

  const { message: applicationsMessage, success: applicationsSuccess } =
    applications;

  const { message: resumeMessage, success: resumeSuccess } = resume;

  if (!success || !applicationsSuccess || !resumeSuccess || !userResponse) {
    let errorMessage = 'Something went wrong';

    if (message) {
      errorMessage = message;
    } else if (applicationsMessage) {
      errorMessage = applicationsMessage;
    } else if (resumeMessage) {
      errorMessage = resumeMessage;
    } else if (userResponse?.message) {
      errorMessage = userResponse?.message;
    }

    throw new Error(errorMessage.toString());
  }

  return (
    <>
      <div className="p-4 grid grid-cols-3 gap-4 mb-4">
        <div className="xl:col-span-2 col-span-3">
          <ProfileStatusCard initialData={response} />
          <div className="bg-white shadow rounded-lg border border-[#E5E7EB] overflow-hidden">
            <ApplicationSummary
              initialApplications={applications}
              initialStatistics={response}
            />
          </div>
        </div>

        <div className="xl:col-span-1 col-span-3">
          <div className="grid xl:grid-cols-1 lg:grid-cols-2 grid-cols-1 gap-3">
            <ScheduleSummary initialData={response} />
            <ResumeSection resumeData={resume} userData={userResponse} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
