import Configs from '@/config/settings.json';

export default function AboutCompanyComponent({
  jobDetailData,
}: {
  jobDetailData: any;
}) {
  return (
    <>
      <div className="p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
          About the company
        </h1>
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Name:</b> {jobDetailData.company.company_name}
        </p>
        {Configs.isGroupCompany === 1 && (
          <>
            <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
              <b>Wing Name:</b> {jobDetailData.company.wing_name}
            </p>
          </>
        )}
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Location:</b> {jobDetailData.company.address}
        </p>
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Website:</b>{' '}
          <a
            href={jobDetailData.company.website}
            target="blank"
            className="text-[#39B54A] underline"
          >
            {jobDetailData.company.website}
          </a>
        </p>
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Office Hours:</b> {jobDetailData.company.office_hours}
        </p>
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Weekend:</b> {jobDetailData.company.weekends}
        </p>
        <p className="my-3 text-[13px] font-normal text-gray-500 leading-5">
          <b>Current Jobs:</b> {jobDetailData.company.active_jobs}
        </p>
        {Configs.isGroupCompany === 1 ? (
          <>
            <a
              className="table mt-5 mx-auto py-2 px-5 ring-1 ring-[#39B54A] text-[13px] font-bold text-[#39B54A] rounded-full hover:bg-gray-100"
              href={'/jobs?company=' + jobDetailData.company.wing_code}
            >
              View all jobs of this company
            </a>
          </>
        ) : (
          <>
            <a
              className="table mt-5 mx-auto py-2 px-5 ring-1 ring-[#39B54A] text-[13px] font-bold text-[#39B54A] rounded-full hover:bg-gray-100"
              href={'/jobs?company=' + jobDetailData.company.company_code}
            >
              View all jobs of this company
            </a>
          </>
        )}
      </div>
    </>
  );
}
