'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { openSidebar } from '@/redux/features/ui.slice';

const DrawerToggler = () => {
  // const isSidebarOpen = useSelector(
  //   (state: RootState) => state.ui.isSidebarOpen,
  // );

  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(openSidebar())}
      className="lg:hidden md:block"
      type="button"
      data-drawer-target="sidebar-multi-level-sidebar"
      data-drawer-toggle="sidebar-multi-level-sidebar"
      aria-controls="sidebar-multi-level-sidebar"
    >
      {/* Three lines */}
      <span className="block m-1 h-[2px] w-[15px] bg-[#000]"></span>
      <span className="block m-1 h-[2px] w-[35px] bg-[#000]"></span>
      <span className="block m-1 h-[2px] w-[25px] bg-[#000]"></span>
      <span className="block m-1 h-[2px] w-[30px] bg-[#000]"></span>
    </button>
  );
};

export default DrawerToggler;
