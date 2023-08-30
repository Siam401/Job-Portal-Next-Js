import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

import { getJobList } from '@/app/api/client/jobList';
import { JobList } from '@/types/jobs';
import { Skeleton } from 'primereact/skeleton';

interface JobTableProps {
  initialData: {
    data: JobList;
    links: {
      first: string;
      last: string;
      prev: string;
      next: string;
    };
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: {
        url: string | null;
        label: string;
        active: boolean;
      }[];
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
  filterQry?: any;
}

const JobTable = ({ initialData, filterQry }: JobTableProps) => {
  // Set the number of rows to display per page
  const params = useSearchParams();
  const pathname = usePathname();

  let filterQryObject = filterQry ? filterQry : null;

  // Fetch the job list data using the useQuery hook
  const {
    data: fetchedData,
    refetch,
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['jobList'],
    queryFn: () => getJobList(filterQryObject),
    initialData: initialData,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    throw new Error('Something went wrong'.toString());
  }

  // Extract the data, links, and meta properties from the fetched data
  const {
    data,
    meta: { current_page, from, last_page, links, path, per_page, to, total },
  } = fetchedData as any;

  // Refetch the data whenever the filter query object changes
  useEffect(() => {
    if (pathname.includes('jobs')) {
      if (
        filterQryObject !== null &&
        Object.values(filterQryObject).some((value) => value !== '')
      ) {
        refetch();
      }
    } else {
      refetch();
    }
  }, [filterQryObject]);

  // Handle the page change event for the paginator
  const onPageChange = async (event: PaginatorPageChangeEvent) => {
    if (event.page + 1 === current_page) {
      return;
    } else {
      const page = event.page + 1;
      filterQryObject = { ...filterQryObject, page };
      refetch();
    }
  };

  if (pathname.includes('search')) {
    const search = params.get('search');
    filterQryObject = { ...filterQryObject, search };
    refetch();
  }

  const showCount = pathname.includes('jobs')
    ? Object.values(filterQryObject || {}).every((value) => value === '')
      ? false
      : true
    : false;

  const startIndex = (current_page - 1) * per_page + 1;
  const endIndex = Math.min(startIndex + per_page - 1, total);

  return (
    <>
      <>
        {/* section: search count */}

        {showCount && (
          <h2 className="mt-3 mb-4 font-bold text-center text-gray-500 text-md md:text-xl">
            Found {total} jobs relevant on your search
          </h2>
        )}

        <div className="flex flex-col">
          <div className="w-full overflow-x-auto">
            <div className="inline-block min-w-full py-2">
              <div className="overflow-hidden job-table">
                {/* section: DataTable */}
                <DataTable
                  value={data}
                  stripedRows
                  currentPageReportTemplate="{currentPage} of {totalPages}"
                >
                  <Column
                    header="No."
                    body={(rowData, column) => {
                      if (isFetching) {
                        return (
                          <Skeleton
                            width="100%"
                            height="20px"
                            className="my-3 mx-auto"
                          />
                        );
                      } else {
                        const index =
                          (current_page - 1) * per_page + column.rowIndex + 1;
                        return <span className="text-gray-500">{index}</span>;
                      }
                    }}
                  ></Column>
                  <Column
                    header="Job Post"
                    body={(rowData, column) => {
                      if (isFetching) {
                        return (
                          <Skeleton
                            width="100%"
                            height="20px"
                            className="my-3 mx-auto"
                          />
                        );
                      } else {
                        return (
                          <Link
                            href={`apply/${rowData.code}`}
                            className="text-[#39B54A] hover:underline text-[16px] font-semibold"
                          >
                            {rowData.title}
                          </Link>
                        );
                      }
                    }}
                  ></Column>
                  <Column
                    header="Job Category"
                    body={(rowData) => {
                      return isFetching ? (
                        <Skeleton
                          width="100%"
                          height="20px"
                          className="my-3 mx-auto"
                        />
                      ) : (
                        <span>{rowData.job_category}</span>
                      );
                    }}
                  ></Column>
                  <Column
                    header="Vacancy"
                    body={(rowData) => {
                      return isFetching ? (
                        <Skeleton
                          width="100%"
                          height="20px"
                          className="my-3 mx-auto"
                        />
                      ) : (
                        <span>{rowData.vacancy}</span>
                      );
                    }}
                  ></Column>
                  <Column
                    header="DeadLine"
                    body={(rowData) => {
                      return isFetching ? (
                        <Skeleton
                          width="100%"
                          height="20px"
                          className="my-3 mx-auto"
                        />
                      ) : (
                        <span>{rowData.end_date}</span>
                      );
                    }}
                  ></Column>
                  <Column
                    header="Apply"
                    body={(rowData) => {
                      return isFetching ? (
                        <Skeleton
                          width="100%"
                          height="20px"
                          className="my-3 mx-auto"
                        />
                      ) : (
                        <Link href={`apply/${rowData.code}`}>
                          <i className="fas fa-arrow-up-right-from-square rounded-full h-[43px] w-[43px] leading-[43px] text-center text-[#ffffff] bg-[#3298FF] hover:bg-[#000]"></i>
                        </Link>
                      );
                    }}
                  ></Column>
                </DataTable>
              </div>
            </div>
          </div>

          {/* section: paginator */}
          <nav className="table mx-auto my-4" aria-label="Page navigation">
            {pathname.includes('jobs') ? (
              <>
                {total > 0 && (
                  <>
                    <span className="block mb-4 text-sm text-center text-gray-700 w-100">
                      Showing&nbsp;
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {startIndex}&nbsp;
                      </span>
                      to&nbsp;
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {endIndex}&nbsp;
                      </span>
                      of&nbsp;
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {total}&nbsp;
                      </span>
                      Jobs
                    </span>
                    <Paginator
                      className="table p-0 mx-auto mt-4 paginator-pan"
                      aria-label="Page navigation example"
                      onPageChange={onPageChange}
                      first={from ?? 0}
                      rows={per_page}
                      totalRecords={total}
                      // rowsPerPageOptions={[5, 10, 20]}
                    />
                  </>
                )}
              </>
            ) : (
              <Link
                href="jobs"
                className="block py-4 px-12 text-white bg-[#39B54A] hover:bg-[#2ea23e]  rounded-full text-sm uppercase font-bold focus:outline-none focus:ring-[#e9e9e9]"
              >
                Explore All
              </Link>
            )}
          </nav>
        </div>
      </>
    </>
  );
};

export default JobTable;
