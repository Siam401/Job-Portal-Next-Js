'use client';

import {
  getApplications,
  getDashboardData,
} from '@/app/api/applicant/dashboard';
import { useQuery } from '@tanstack/react-query';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { TabPanel, TabView } from 'primereact/tabview';
import { useState } from 'react';
import AppliedJobList from './applied-job/AppliedJobList';
import StatusCard from './status/StatusCard';

type ApplicationSummaryProps = {
  initialApplications: any;
  initialStatistics: any;
};

const ApplicationSummary = ({
  initialApplications,
  initialStatistics,
}: ApplicationSummaryProps) => {
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['applications', activeIndex, page],
    queryFn: () =>
      getApplications(
        {
          page: page,
          paginate_count: 5,
        },
        activeIndex === 0 ? 'all' : 'month',
      ),
    initialData: initialApplications,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  if (response?.success === false) {
    throw new Error((response?.message ?? '').toString());
  }

  const jobs = response.data?.data;

  const { data: statResponse, isLoading: statLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => getDashboardData(),
    initialData: initialStatistics,
  });

  const statistics = statResponse?.data?.statistics;

  const handleTabChange = (e: any) => {
    setActiveIndex(e.index);
  };

  // Handle the page change event for the paginator
  const onPageChange = async (event: PaginatorPageChangeEvent) => {
    setPage(event.page + 1);
  };

  const from = response.data?.meta?.from;
  const per_page = response.data?.meta?.per_page;
  const total = response.data?.meta?.total;

  let headerClass = `w-1/2 md:text-[20px] text-[16px] font-semibold`;

  return (
    <>
      <TabView
        className="customJobTabHeader"
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      >
        {/* section: all application tab*/}
        <TabPanel header="All Time" headerClassName={headerClass}>
          <div className="grid grid-cols-3 space-x-3 ">
            <StatusCard
              textColor="text-[#00D5FF]"
              iconClass="fa fa-briefcase"
              bgColor="bg-[#00D5FF]/[.2]"
              value={statistics?.all?.applied_jobs}
              label="Applied Job"
            />
            <StatusCard
              textColor="text-[#F25F0D]"
              iconClass="fa fa-eye"
              bgColor="bg-[#F25F0D]/[.2]"
              value={statistics?.all?.resume_viewed}
              label="Resume Viewed"
            />
            <StatusCard
              textColor="text-[#01468B]"
              iconClass="fa fa-calendar"
              bgColor="bg-[#01468B]/[.2]"
              value={statistics?.all?.total_schedules}
              label="Schedule"
            />
          </div>
          <AppliedJobList jobs={jobs} isLoading={isFetching} />
          {jobs.length > 0 ? (
            <Paginator
              className="table !p-0 mx-auto"
              onPageChange={onPageChange}
              first={from ?? 0}
              rows={per_page}
              totalRecords={total}
              // rowsPerPageOptions={[5, 10, 20]}
            />
          ) : null}
        </TabPanel>

        {/* section: this month application tab  */}
        <TabPanel header="This Month" headerClassName={headerClass}>
          <div className="grid grid-cols-3 space-x-3">
            <StatusCard
              textColor="text-[#00D5FF]"
              iconClass="fa fa-briefcase"
              bgColor="bg-[#00D5FF]/[.2]"
              value={statistics?.month?.applied_jobs}
              label="Applied Job"
            />
            <StatusCard
              textColor="text-[#F25F0D]"
              iconClass="fa fa-eye"
              bgColor="bg-[#F25F0D]/[.2]"
              value={statistics?.month?.resume_viewed}
              label="Resume Viewed"
            />
            <StatusCard
              textColor="text-[#01468B]"
              iconClass="fa fa-calendar"
              bgColor="bg-[#01468B]/[.2]"
              value={statistics?.month?.total_schedules}
              label="Schedule"
            />
          </div>
          <AppliedJobList jobs={jobs} isLoading={isFetching} />
          {jobs.length > 0 ? (
            <Paginator
              className="table !p-0 mx-auto"
              onPageChange={onPageChange}
              first={from ?? 0}
              rows={per_page}
              totalRecords={total}
              // rowsPerPageOptions={[5, 10, 20]}
            />
          ) : null}
        </TabPanel>
      </TabView>
    </>
  );
};

export default ApplicationSummary;
