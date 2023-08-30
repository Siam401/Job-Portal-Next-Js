'use client';

import { getResumeStatus } from '@/app/api/applicant/resume';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function ProgressBarComponent() {
  const [resumeStatus, setResumeStatus] = useState(0);
  const { data, isLoading, isError, isFetched }: any = useQuery({
    queryKey: ['resume_status'],
    queryFn: () => getResumeStatus(),
  });

  useEffect(() => {
    if (data) {
      setResumeStatus(data[0].resume_completion_percentage);
    }
  }, [data]);

  return (
    <>
      <div className="w-full bg-[#d9d9d9] mb-[20px]">
        <div
          className="h-[40px] bg-[#004992] text-[20px] font-medium text-blue-100 text-center leading-[38px]"
          style={{ width: resumeStatus + '%' }}
        >
          {resumeStatus}%
        </div>
      </div>
    </>
  );
}
