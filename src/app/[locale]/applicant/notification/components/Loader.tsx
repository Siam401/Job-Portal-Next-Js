'use client';

import React from 'react';
import { Skeleton } from 'primereact/skeleton';

type Props = {
  isNotificationList?: boolean;
  isNotificationDetails?: boolean;
};

const Loader = ({ isNotificationList, isNotificationDetails }: Props) => {
  const containerClass = isNotificationList
    ? 'sm:grid-cols-2 grid-cols-1'
    : isNotificationDetails
    ? 'sm:grid-cols-1 grid-cols-1'
    : '';
  return (
    <div className={`grid  mb-4 ${containerClass} `}>
      <div className="col">
        {isNotificationList ? (
          <div className="z-20 w-full bg-[#f4f4f4] sm:min-h-screen min-h-min border-e-2 border-[#01468B]">
            <div className="grid grid-cols-2 px-4 py-3 bg-gradient-to-b from-[#01468B] to-[#023161]">
              <h3 className="text-[18px] font-semibold text-[#fff]">
                Notifications
              </h3>
              <h4 className="text-end text-[#fff] flex items-center justify-end">
                &nbsp;&nbsp;&nbsp;
                <button className="block w-[26px] height-[20px] text-center border border-[#00264d] hover:bg-[#00264d] me-2">
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button className="block w-[26px] height-[20px] text-center border border-[#00264d] hover:bg-[#00264d]">
                  <i className="fa fa-chevron-right"></i>
                </button>
              </h4>
            </div>
            <div className="divide-y divide-[#CCDEF0] border-b border-[#CCDEF0]">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-7 px-4 py-3 hover:bg-[rgba(34,168,1,0.11)] ease-in-out transition bg-white opacity-100"
                >
                  <div className="col-span-5 flex items-center">
                    <Skeleton shape="circle" width="56px" height="56px" />
                    <div className="pl-3">
                      <span className="text-md text-[#01468B] font-bold">
                        <Skeleton width="100px" height="20px" />
                      </span>
                      <div className="text-gray-500 text-sm my-1.5">
                        <Skeleton width="160px" height="14px" />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="float-right space-y-2">
                      <Skeleton width="80px" height="14px" />
                      <Skeleton
                        className="float-right"
                        width="40px"
                        height="20px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="col ml-4 mt-2">
        {isNotificationDetails ? (
          <div className="z-20 w-full bg-[#fff] min-h-screen">
            <div className="divide-y divide-[#CCDEF0] ">
              <div className="grid grid-cols-7 px-4 py-3 bg-white">
                <div className="col-span-5 flex items-center">
                  <Skeleton shape="circle" width="56px" height="56px" />
                  <div className="pl-3">
                    <span className="text-md font-semibold text-[#22A801]">
                      <Skeleton width="100px" height="20px" />
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="float-right space-y-2">
                    <Skeleton width="80px" height="14px" />
                    <Skeleton
                      className="float-right"
                      width="40px"
                      height="20px"
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 py-6 text-[#555] text-[14px] font-semibold">
                <Skeleton width="160px" height="14px" />
                <br />
                <Skeleton width="240px" height="14px" />
                <div className="my-3"></div>
                {[...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    width="100%"
                    height="14px"
                    className="my-2"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Loader;
