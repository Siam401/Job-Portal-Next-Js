'use client';
import { MouseEvent } from 'react';

type MenuTogglerProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const MenuToggler = ({ onClick }: MenuTogglerProps) => {
  //
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        data-collapse-toggle="mobile-menu-2"
        type="button"
        className="pl-2 pr-2 inline-flex items-center ml-1 text-sm text-gray-500 rounded-sm lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="mobile-menu-2"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <i className="fa fa-bars text-lg"></i>
      </button>
    </>
  );
};

export default MenuToggler;
