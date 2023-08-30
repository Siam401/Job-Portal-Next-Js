import ApplicationFormComponent from '@/client/apply/[code]/components/sections/ApplicationFormComponent';
import SummaryExperienceComponent from '@/client/apply/[code]/components/elements/SummaryExperienceComponent';
import SummaryAgeComponent from '@/client/apply/[code]/components/elements/SummaryAgeComponent';

export default function SummaryComponent({
  jobDetailData,
}: {
  jobDetailData: any;
}) {
  return (
    <>
      <div className="p-8 border-b border-gray-200">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
          Job Summary
        </h1>
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Published on:</b> {jobDetailData.summary.start_date}
        </p>
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Vacancy:</b> {jobDetailData.summary.vacancy}
        </p>
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Employment Status:</b> {jobDetailData.summary.job_type}
        </p>
        {jobDetailData.summary.is_experience_required && (
          <SummaryExperienceComponent jobDetailData={jobDetailData} />
        )}

        <SummaryAgeComponent jobDetailData={jobDetailData} />

        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Job Location:</b> {jobDetailData.summary.workplace}
        </p>
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Salary:</b> {jobDetailData.summary.salary}
        </p>
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Application Deadline:</b> {jobDetailData.summary.end_date}
        </p>

        <ApplicationFormComponent jobDetailData={jobDetailData} />
      </div>
    </>
  );
}
