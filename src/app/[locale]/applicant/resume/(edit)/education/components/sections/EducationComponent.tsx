'use client';

import TrainingComponent from './TrainingComponent';
import AcademicComponent from './AcademicComponent';
import CertificationComponent from './CertificationComponent';
import Link from 'next/link';

export default function EducationComponent({ educationLevel, countries }: any) {
  return (
    <>
      <div className="mb-4">
        <AcademicComponent educationLevel={educationLevel} />
      </div>


      <div className="mb-4">
        <TrainingComponent countries={countries} />
      </div>


      <div className="mb-10">
        <CertificationComponent />
      </div>


      <div className="flex justify-end w-full space-y-0">
        
        <Link href="/applicant/resume/experience"
          className="min-w-[275px] text-white bg-[#005DB9] hover:bg-[#004992] focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md w-auto px-5 py-2.5 text-center"
        >
          Next<i className="fa fa-circle-chevron-right ms-3"></i>
        </Link>
      </div>

    </>
  );
}
