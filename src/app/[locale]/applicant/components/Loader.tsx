'use client';

import { Skeleton } from 'primereact/skeleton';
import React from 'react';

type Props = {
  isProfileMenu?: boolean;
  isNotificationMenu?: boolean;
  isApplicationCard?: boolean;
};

const Loader = ({
  isProfileMenu,
  isNotificationMenu,
  isApplicationCard,
}: Props) => {
  return (
    <>
      {isProfileMenu ? (
        <div className="h-[50px]">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            type="button"
            className="items-center space-x-2 text-[#000] hover:text-[#39B54A]"
          >
            <div className="shrink-0">
              <Skeleton shape="circle" width="50px" height="50px" />
            </div>
          </button>
        </div>
      ) : null}

      {isNotificationMenu
        ? [...Array(4)].map((_, index) => (
            <a
              key={index}
              className="flex items-center px-4 py-3 hover:bg-[rgba(34,168,1,0.11)] ease-in-out transition"
              href="#"
            >
              <div className="flex-shrink-0">
                <Skeleton shape="circle" width="56px" height="56px" />
              </div>
              <div className="w-full pl-3 py-1">
                <span className="text-md font-semibold text-[#01468B] ">
                  <Skeleton width="100px" height="20px" />
                </span>
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400 py-1">
                  <Skeleton width="160px" height="14px" />
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  <Skeleton width="80px" height="14px" />
                </div>
              </div>
            </a>
          ))
        : null}

      {isApplicationCard ? (
        <>
          <tr className="[&>*]:py-2 [&>*:first-child]:ps-2 [&>*:last-child]:pe-2 bg-[#edeef1]">
            <td className="sm:text-[15px] text-[10px] text-[#3d3d3d] font-medium sm:leading-6 leading-1">
              <Skeleton width="80%" height="50px" />
            </td>
            <td className="sm:text-[15px] text-[10px] text-[#3d3d3d] font-medium sm:leading-6 leading-1">
              <Skeleton width="60%" height="50px" />
            </td>
            <td className="sm:text-[15px] text-[10px] text-[#3d3d3d] font-medium sm:leading-6 leading-1">
              <Skeleton width="60%" height="50px" />
            </td>
            {/* <td>
              <Skeleton width="10%" height="50px" />
            </td> */}
          </tr>
        </>
      ) : null}
    </>
  );
};

export default Loader;
