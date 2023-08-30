'use client';

import { closeModal } from '@/redux/features/modal.slice';
import ModalContainer from './ModalConainer';
import Image from 'next/image';
import deleteSVG from '@/assets/icons/applicant/x-circle.svg';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';

type ConfirmDialogProps = {
  id: string | number;
  handleDelete: () => void;
  isLoading?: boolean;
};

const ConfirmDialog = ({
  id,
  handleDelete,
  isLoading = false,
}: ConfirmDialogProps) => {
  const dispatch = useDispatch();
  return (
    <>
      <ModalContainer
        id={id}
        dismissableMask
        isLocked
        closable={false}
        className="w-[520px] h-[auto] rounded-[10px] bg-white"
        maskClassName="!bg-gray-900/50"
        headerClassName="hidden"
        content={
          <div className="px-4 py-6 space-y-3">
            <div className="flex flex-col items-center justify-center pb-2">
              <Image
                priority
                src={deleteSVG}
                alt="icon"
                width={60}
                height={60}
                className="object-contain"
              />
              <p className="text-[27px] text-gray-600 font-semibold">
                Are you sure?
              </p>
              <p className="text-[15px] text-gray-500 font-semibold text-center">
                Do you really want to delete this? This process can&rsquo;t be undo.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <Button
                onClick={() => dispatch(closeModal(id))}
                type="button"
                data-modal-hide="deleteModal"
                className="rounded-lg px-5 py-2.5 text-center"
                label="No, Cancel"
                severity="secondary"/>
              <Button
                className="rounded-lg px-5 py-2.5 text-center"
                label="Yes, Delete"
                onClick={handleDelete}
                type="button"
                loading={isLoading}
                severity='warning'
              />
            </div>
          </div>
        }
      />
    </>
  );
};

export default ConfirmDialog;
