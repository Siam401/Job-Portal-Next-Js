'use client';

import { ReactNode } from 'react';
import ToastMessage from '../ui/ToastMessage';
import { useSession } from 'next-auth/react';
// import FrontLayout from '../../app/[locale]/(client)/components/FrontendLayout';

interface Props {
  children: ReactNode;
}

const MasterLayout = ({ children }: Props) => {
  const { data: session } = useSession();

  return (
    <>
      {/* <FrontLayout>
        <main className="layout-wrapper">{children}</main>
      </FrontLayout> */}
      <footer className="mt-4 py-4 border-t bg-slate-100">
        {/* <ToastMessage /> */}
        <p className="text-center">Project © Copyright 2023</p>
      </footer>
    </>
  );
};

export default MasterLayout;
