'use client';

import { deleteApplication } from '@/app/api/applicant/dashboard';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { closeModal, openModal } from '@/redux/features/modal.slice';
import { toastActions } from '@/redux/features/toast.slice';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import Loader from '@/applicant/components/Loader';
import { useState } from 'react';

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

type JobItemProps = {
  job: AppliedJobs;
  isLoading: boolean;
};

const JobItem = ({ job, isLoading }: JobItemProps) => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const response = await deleteApplication(job.id);
    if (response?.success === false) {
      setIsDeleting(false);
      dispatch(
        toastActions.showToast({
          message: response?.message ?? 'Something went wrong',
          type: 'error',
          summary: 'Error',
        }),
      );
    } else {
      setIsDeleting(true);
      dispatch(closeModal(`delete-job-${job.id}`));
      queryClient.invalidateQueries(['applications']);
      queryClient.invalidateQueries(['statistics']);
      dispatch(
        toastActions.showToast({
          message: 'Application deleted successfully',
          type: 'success',
          summary: 'Success',
        }),
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader isApplicationCard />
      ) : (
        <tr className="[&>*]:py-2 [&>*:first-child]:ps-2 [&>*:last-child]:pe-2 bg-[#edeef1]">
          <td className="sm:text-[15px] text-[10px] text-[#3d3d3d] font-medium sm:leading-6 leading-1">
            <b>Job Title:</b> {job.title}
            <br />
            <b>Wings:</b> {job.wing_name}
            <br />
          </td>
          <td className="sm:text-[15px] text-[10px] text-[#3d3d3d] font-medium sm:leading-6 leading-1">
            {job.job_type}
            <br />
            <b>Location:</b> {job.location}
            <br />
          </td>
          <td className="sm:text-[15px] text-[10px] text-[#3d3d3d] font-medium sm:leading-6 leading-1">
            {job.is_seen ? (
              <>
                Viewed by employer
                <i className="fa fa-check sm:w-[26px] sm:h-[26px] w-[16px] h-[16px] rounded-full bg-white text-[#22A801] sm:text-[14px] text-[10px] sm:leading-[26px] leading-[16px] text-center shadow ms-1"></i>
              </>
            ) : (
              <>
                Not Viewed
                <i className="fa fa-times sm:w-[26px] sm:h-[26px] w-[16px] h-[16px] rounded-full bg-white text-[#FF0303] sm:text-[14px] text-[10px] sm:leading-[26px] leading-[16px] text-center shadow ms-1"></i>
              </>
            )}
            <br />
            <b>Applied On:</b> {job.apply_date}
            <br />
          </td>
          <td>
            {job.stage === 1 ? (
              <button
                type="button"
                onClick={() => dispatch(openModal(`delete-job-${job.id}`))}
                className="block"
              >
                <i className="fa fa-times text-[20px] text-[#FF0303]"></i>
              </button>
            ) : null}
          </td>
        </tr>
      )}

      <ConfirmDialog
        id={`delete-job-${job.id}`}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default JobItem;
