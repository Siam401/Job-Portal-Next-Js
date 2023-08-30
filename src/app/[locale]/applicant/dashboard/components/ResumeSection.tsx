'use client';

import { getUserDetail } from '@/app/api/applicant/layout';
import { deleteResume, getResume } from '@/app/api/applicant/resume';
import deleteSVG from '@/assets/icons/applicant/delete.svg';
import documentSVG from '@/assets/icons/applicant/document.svg';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { closeModal, openModal } from '@/redux/features/modal.slice';
import { toastActions } from '@/redux/features/toast.slice';
import { parseDateObject } from '@/services/Utility';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

type ResumeSectionProps = {
  resumeData: any;
  userData: any;
};

const ResumeSection = ({ resumeData, userData }: ResumeSectionProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { data: session, update: updateSession }: any = useSession();
  const {
    data: response,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['isCvAttached'],
    queryFn: () => getResume(),
    initialData: resumeData,
  });

  const { data: userResponse, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetail(),
    initialData: userData,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
    // staleTime: 1000 * 60 * 5, // 1 minute
  });

  if (response?.success === false || userResponse?.success === false) {
    throw new Error(
      (
        response?.message ??
        userResponse?.message ??
        'Something went wrong'
      ).toString(),
    );
  }

  const resume = response.data?.resume;
  const data = userResponse?.data as any;
  const user = data?.user;

  const name = user?.name;

  const { day, year, month } = parseDateObject(response.data?.upload_time);
  const uploadedDate = `${day}.${month}.${year}`;

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteResume();
    setIsDeleting(false);

    if (response?.success === true) {
      queryClient.invalidateQueries(['isCvAttached']);
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: 'Resume deleted successfully.',
        }),
      );
      dispatch(closeModal('delete-resume'));

      await updateSession({
        ...session,
        user: {
          ...session?.user,
          applicant: {
            ...session?.user?.applicant,
            resume: null,
          },
        },
      });
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: (response?.message ?? 'Something went wrong').toString(),
        }),
      );
    }
  };

  // if (isLoading || userLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div>
        {/* section: title */}
        <h1 className="mb-3 text-[20px] font-semibold">Your Uploaded Resume</h1>

        {/* section: no cv attached card */}
        {!resume ? (
          <div className="mb-3 w-full py-2 flex items-center border-2 border-dashed bg-[#00ACF5]/10 border-[#00ACF5]/60 rounded-lg">
            <Image src={documentSVG} alt="doc" priority className="h-[50px]" />
            <div className="me-auto">
              <span className="text-[#FF0000] text-[16px] font-semibold">
                No CV attached yet
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-3 w-full py-2 flex items-center border-2 border-dashed bg-[#00ACF5]/10 border-[#00ACF5]/60 rounded-lg">
              {/* section: attached cv details card */}
              <Image
                src={documentSVG}
                alt="doc"
                priority
                className="h-[50px] w-[50px]"
              />
              <div className="me-auto">
                <span className="text-[#22A801] text-[16px] font-semibold">
                  {name}
                </span>
                <h3 className="text-[#535353]/90 text-[12px] font-semibold">
                  Uploaded: {uploadedDate}
                </h3>
              </div>
              <button
                className="flex h-[34px] w-[34px] rounded-[8px] bg-[#FF0000]/10 hover:bg-[#FF0000]/20 items-center justify-center me-4"
                onClick={() => dispatch(openModal('delete-resume'))}
              >
                <Image src={deleteSVG} alt="icon" />
              </button>
            </div>
            {/* section: download resume button */}

            <Link
              href={resume}
              target="_blank"
              download
              className="block min-w-[250px] text-white bg-[#F25F0D] hover:bg-[#db560b] font-semibold rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Download Resume
            </Link>
          </>
        )}
      </div>

      <ConfirmDialog
        id={'delete-resume'}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ResumeSection;
