'use client';
import { useState } from 'react';

import FilterForm from '@/client/jobs/components/FilterForm';
import JobTable from '@/client/jobs/components/JobTable';

interface JobSectionProps {
  jobCategories: any;
  wingList: any;
  locations: any;
  jobList: any;
}

const JobSection = ({
  jobCategories,
  wingList,
  locations,
  jobList,
}: JobSectionProps) => {
  const [filterQry, setFilterQry] = useState(null);

  const getQryParams = (params: any) => {
    setFilterQry(params);
  };
  return (
    <>
      <div className="max-w-screen-xl px-3 py-10 mx-auto sm:py-14">
        <div className="grid grid-cols-1 gap-1 border-b border-gray-300 xl:grid-cols-7">
          <h1 className="col-span-1 text-4xl font-extrabold tracking-tight text-center text-gray-600 xl:col-span-2 sm:text-start">
            Available Jobs
          </h1>

          <FilterForm
            jobCategories={jobCategories}
            wingList={wingList}
            locations={locations}
            sendQryParams={getQryParams}
          />
        </div>

        <div className="w-full py-8">
          <div className="bg-white relative shadow-[0px_0px_25px_rgba(56,152,226,0.1)] rounded-[10px] px-[15px] py-[10px]">
            {jobList ? (
              <JobTable initialData={jobList} filterQry={filterQry} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSection;
