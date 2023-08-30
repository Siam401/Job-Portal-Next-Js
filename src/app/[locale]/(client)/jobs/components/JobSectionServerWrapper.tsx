// prettier-ignore
import { getJobCategories, getJobList, getLocations, getWingList, } from '@/app/api/client/jobList';
import JobSection from '@/client/jobs/components/JobSection';

interface JobPageComponentProps {
  isHomePage?: boolean;
}

const JobPageComponent = async ({
  isHomePage = false,
}: JobPageComponentProps) => {
  let jobCategories: any = await getJobCategories();

  let wingList: any = await getWingList();

  let locations: any = await getLocations();

  let jobList: any = await getJobList();

  if (
    !jobCategories.success ||
    !wingList.success ||
    !locations.success ||
    !jobList
  ) {
    let errorMessage = 'Something went wrong';

    if (!jobCategories.success) {
      errorMessage = jobCategories.message;
    } else if (!wingList.success) {
      errorMessage = wingList.message;
    } else if (!locations.success) {
      errorMessage = locations.message;
    } else if (!jobList.success) {
      errorMessage = jobList.message;
    }

    throw new Error(errorMessage.toString());
  }

  const sectionClasses = isHomePage
    ? 'relative bg-gradient-to-br from-[#3AB54B]/[0.15] via-[#ED6922]/[0.15] to-[#3399FF]/[0.15] sm:py-14 py-10'
    : 'bg-white pt-14 pb-0';

  return (
    <>
      <section className={sectionClasses}>
        {isHomePage ? (
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white"></div>
        ) : null}
        <JobSection
          jobCategories={jobCategories.data}
          wingList={wingList.data}
          locations={locations.data}
          jobList={jobList}
        />
        {isHomePage ? (
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white"></div>
        ) : null}
      </section>
    </>
  );
};

export default JobPageComponent;
