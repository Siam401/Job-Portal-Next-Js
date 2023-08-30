'use client';

import JobItem from './JobItem';

type AppliedJobs = {
  title: string;
  wing_name: string;
  branch_name: string;
  is_seen: boolean;
  apply_date: string;
  location: string;
  id: number;
  job_type: string;
  stage: number;
};

type AppliedJobListProps = {
  jobs: AppliedJobs[];
  isLoading: boolean;
};

const AppliedJobList = ({ jobs, isLoading }: AppliedJobListProps) => {
  return (
    <>
      <div className="mt-1 xl:min-h-[450px] min-h-auto">
        <div className="mt-2 w-full">
          <table className="w-full border-separate border-spacing-y-3">
            <tbody>
              {jobs.map((job, index) => (
                <JobItem key={index} job={job} isLoading={isLoading} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AppliedJobList;
