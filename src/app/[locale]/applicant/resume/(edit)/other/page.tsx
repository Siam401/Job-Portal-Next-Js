import { NextPage } from 'next';
import { Session } from '@/types/session';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/[locale]/(client)/(auth)/utils/auth';
import SpecializationSection from './components/SpecializationSection';
import LanguageSection from './components/LanguageSection';
import ReferenceSection from './components/ReferenceSection';
import Link from 'next/link';
import { getProfileInfo } from '@/app/api/applicant/experience';

const ExperiencePage: NextPage = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const token = session?.token as string;

  const specialization = await getProfileInfo('specialization', token);

  if (specialization?.success === false) {
    let errorMessage = 'Something went wrong';

    if (specialization?.message) {
      errorMessage = specialization.message;
    }
    throw new Error(errorMessage.toString());
  }

  return (
    <>
      <SpecializationSection initialData={specialization} />
      <LanguageSection />
      <ReferenceSection />
      <div className="flex justify-end space-y-0">
        <Link
          href="/applicant/resume/photo"
          className="mb-8 min-w-[275px] text-white bg-[#005DB9] hover:bg-[#004992] focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md w-auto px-5 py-2.5 text-center"
        >
          Next<i className="fa fa-circle-chevron-right ms-3"></i>
        </Link>
      </div>
    </>
  );
};

export default ExperiencePage;
