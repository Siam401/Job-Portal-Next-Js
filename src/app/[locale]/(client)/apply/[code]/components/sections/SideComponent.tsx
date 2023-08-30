import AboutCompanyComponent from '@/client/apply/[code]/components/sections/AboutCompanyComponent';
import SummaryComponent from '@/client/apply/[code]/components/sections/SummaryComponent';

export default function SideComponent({
  jobDetailData,
}: {
  jobDetailData: any;
}) {
  return (
    <>
      <div className="col-span-4 lg:mb-0 lg:mt-0 mt-12 mb-8">
        <div className="w-full bg-white rounded-lg shadow">
          <SummaryComponent jobDetailData={jobDetailData} />
          <AboutCompanyComponent jobDetailData={jobDetailData} />
        </div>
      </div>
    </>
  );
}
