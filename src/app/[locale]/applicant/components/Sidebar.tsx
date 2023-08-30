'use client';

import { RootState } from '@/redux/store';
import { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidebar } from '@/redux/features/ui.slice';

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen,
  );

  const dispatch = useDispatch();

  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed lg:top-[71px] top-[0] left-0 z-40 w-64 h-screen shadow transition-transform lg:translate-x-0 border-r  ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full transform-none'
        }}`}
        aria-label="Sidebar"
      >
        <button
          onClick={() => dispatch(closeSidebar())}
          type="button"
          data-drawer-hide="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          className="lg:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        {children}
      </aside>
    </>
  );
};

export default Sidebar;
