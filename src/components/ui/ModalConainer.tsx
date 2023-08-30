'use client';

import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { RootState } from '@/redux/store';
import { closeModal } from '@/redux/features/modal.slice';
import { useEffect } from 'react';

type ModalContainerProps = {
  id: string | number;
  content: React.ReactNode;
  dismissableMask?: boolean;
  isLocked?: boolean;

  className?: string;
  maskClassName?: string;
  headerClassName?: string;
  contentClassName?: string;

  header?: React.ReactNode;
  footer?: React.ReactNode;
  backdrop?: boolean;
  closable?: boolean;

  onHide?: () => void;
};

const ModalContainer = ({
  id,
  dismissableMask = true,
  isLocked = true,
  backdrop = true,
  closable = true,
  className,
  maskClassName,
  headerClassName,
  contentClassName,
  header,
  footer,
  content,
  onHide,
}: ModalContainerProps) => {
  const dispatch = useDispatch();
  const { modals, modalsById } = useSelector((state: RootState) => state.modal);

  const handleCloseModal = (modalId: string | number) => {
    onHide ? onHide() : dispatch(closeModal(modalId));
  };

  useEffect(() => {
    if (isLocked && modals.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [modals, isLocked]);

  return (
    <>
      {modals.map((modalId: string | number) => {
        const modal = modalsById[modalId];

        if (id !== modal.id) return null;
        return createPortal(
          <Dialog
            key={modal.id}
            visible={modal.visible}
            onHide={() => handleCloseModal(modal.id)}
            modal={backdrop}
            dismissableMask={dismissableMask}
            className={className}
            closable={closable}
            maskClassName={maskClassName}
            headerClassName={headerClassName}
            contentClassName={contentClassName}
            header={header}
            footer={footer}
          >
            {content}
          </Dialog>,
          document.body,
        );
      })}
    </>
  );
};

export default ModalContainer;
