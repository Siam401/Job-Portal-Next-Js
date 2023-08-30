'use client';

import { closeModal } from '@/redux/features/modal.slice';
import ModalContainer from './ModalConainer';
import Image from 'next/image';
import alertSVG from '@/assets/icons/alert-circle.svg';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';

type WarningDialogProps = {
  id: string | number;
  handleClick?: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  btnLabel?: string;
};

const WarningDialog = ({
  id,
  handleClick = () => {},
  isLoading = false,
  title,
  description,
  btnLabel,
}: WarningDialogProps) => {
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
          <div className="py-6 px-4 space-y-3">
            <div className="flex flex-col items-center justify-center pb-2">
              <Image
                priority
                src={alertSVG}
                alt="icon"
                width={60}
                height={60}
                className="object-contain"
              />
              <p className="text-[27px] text-gray-600 font-semibold">
                {title ? title : 'Warning'}
              </p>
              <p className="text-[15px] text-gray-500 font-semibold text-center">
                {description ? description : 'Something went wrong.'}
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                className="!text-white focus:!ring-2 focus:!outline-none focus:!ring-blue-300 !font-semibold !rounded-lg !text-md !px-5 !py-2.5 !text-center !border-none"
                label={btnLabel ? btnLabel : 'Close'}
                onClick={() => {
                  handleClick();
                  dispatch(closeModal(id));
                }}
                type="button"
                severity="warning"
                loading={isLoading}
              />
            </div>
          </div>
        }
      />
    </>
  );
};

export default WarningDialog;
