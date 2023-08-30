'use client';

import Item from './Item';
import SidebarDropdown from './SidebarDropdown';

import dashboardSVG from '@/assets/icons/applicant/dashboard.svg';
import viewSVG from '@/assets/icons/applicant/view.svg';
import uploadResumeSVG from '@/assets/icons/applicant/upload-resume.svg';
import notificationSVG from '@/assets/icons/applicant/notification.svg';
import helpSVG from '@/assets/icons/applicant/help.svg';
import { getUserDetail } from '@/app/api/applicant/layout';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '@/redux/features/modal.slice';
import ModalContainer from '@/components/ui/ModalConainer';
import ModalContent from '../resume/ModalContent';

const SidebarItems = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetail(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5, // 1 minute
  });

  const dispatch = useDispatch();

  if (response?.success === false) {
    throw new Error((response?.message ?? '').toString());
  }

  const data = response?.data as any;

  const unseen = data?.notifications?.unseen;

  const handleClick = () => {
    dispatch(openModal('resumeUploadModal'));
  };

  const handleCloseModal = () => {
    dispatch(closeModal('resumeUploadModal'));
  };

  return (
    <>
      <ul className="space-y-2 font-medium">
        <Item
          link="/applicant/dashboard"
          icon={dashboardSVG}
          text="Dashboard"
        />
        <Item link="/applicant/resume/view" icon={viewSVG} text="View Resume" />
        <SidebarDropdown />
        <Item
          link=""
          type="button"
          icon={uploadResumeSVG}
          text="Upload Resume"
          handleClick={handleClick}
        />
        <Item
          link="/applicant/notification"
          icon={notificationSVG}
          text="Notification"
          showNotification
          notificationCount={unseen ? unseen : 0}
        />
        <Item link="help" icon={helpSVG} text="Help" />
      </ul>

      {/* section: resume modal */}
      <ModalContainer
        id="resumeUploadModal"
        header={
          <div className="flex items-start justify-between px-4 py-2">
            <h3 className="text-[20px] font-bold text-[#222]">Upload Resume</h3>
          </div>
        }
        content={<ModalContent />}
        dismissableMask={false}
        onHide={handleCloseModal}
        maskClassName="!bg-gray-900/50"
        className="w-[525px] max-w-full"
        headerClassName="!p-0"
      />
    </>
  );
};

export default SidebarItems;
