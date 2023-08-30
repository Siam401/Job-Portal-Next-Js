'use client';

import AcademicQualification from './tables/AcademicQualification';
import ApplicationInformation from './tables/ApplicationInformation';
import CareerObjective from './tables/CareerObjective';
import CareerSummary from './tables/CareerSummary';
import Experience from './tables/Experience';
import LanguageProficiency from './tables/LanguageProficiency';
import PersonalDetails from './tables/PersonalDetails';
import PrimaryDetails from './tables/PrimaryDetails';
import ProfessionalQualification from './tables/ProfessionalQualification';
import Reference from './tables/Reference';
import SpecialQualification from './tables/SpecialQualification';
import Specialization from './tables/Specialization';
import TrainingSummary from './tables/TrainingSummary';

type TableSectionProps = {
  resumeData: any;
};

const TableSection = ({ resumeData }: TableSectionProps) => {
  const {
    basic,
    personal,
    total_experience,
    experiences,
    educations,
    trainings,
    certifications,
    specialization,
    languages,
    references,
    career,
  } = resumeData.data as any;
  const { career_objective, career_summary, special_qualification } = basic;
  return (
    <>
      <div
        id="resume-table"
        // className="p-5"
        style={{
          width: '800px',
          padding: '20px',
          // margin: '0 auto',
          // fontFamily: 'Verdana, Geneva, sans-serif',
          // lineHeight: '22px',
          // color: '#000',
          // fontSize: '11px',
          // fontWeight: 400,
          // letterSpacing: '0px',
        }}
      >
        <PrimaryDetails basic={basic} />
        <CareerObjective objective={career_objective} />
        <CareerSummary summary={career_summary} />
        <SpecialQualification qualification={special_qualification} />
        <Experience
          experiences={experiences}
          total_experience={total_experience}
        />
        <AcademicQualification educations={educations} />
        <TrainingSummary trainings={trainings} />
        <ProfessionalQualification certifications={certifications} />
        <ApplicationInformation career={career} />
        <Specialization specialization={specialization} />
        {/* <ExtraCurricularActivities /> */}
        <LanguageProficiency languages={languages} />
        <PersonalDetails personal={personal} />
        <Reference references={references} />
      </div>
    </>
  );
};

export default TableSection;
