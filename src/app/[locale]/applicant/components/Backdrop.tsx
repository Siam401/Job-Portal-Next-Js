'use client';
import { closeSidebar } from '@/redux/features/ui.slice';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

const Backdrop = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen,
  );

  const dispatch = useDispatch();
  const className =
    'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30 lg:hidden marker:' +
    (isSidebarOpen ? ' block' : ' hidden');

  return (
    <>
      <div onClick={() => dispatch(closeSidebar())} className={className}></div>
    </>
  );
};

export default Backdrop;
