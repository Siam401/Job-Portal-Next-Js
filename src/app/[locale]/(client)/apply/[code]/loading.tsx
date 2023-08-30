'use client';
import { Skeleton } from 'primereact/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <>
      <div className="col-span-8">
        <div className="bg-white max-w-screen mx-auto p-4 md:p-8 rounded-lg">
          <h2 className="mb-3 text-2xl md:text-4xl font-bold leading-tight tracking-tight text-gray-600 ">
            <Skeleton height="2rem" width="20rem" className="mb-2"></Skeleton>
          </h2>
          <div className="relative mb-3">
            <ul className="flex flex-wrap text-center text-gray-500 dark:text-gray-400">
              <li className="flex pr-4 items-center text-[16px]">
                <i className="fa-solid fa-building mr-2 text-[#39B54A]"></i>{' '}
                <Skeleton width="5rem" className="mb-2"></Skeleton>
              </li>
              <li className="flex pr-4 items-center text-[16px]">
                <i className="fa-solid fa-clock mr-2 text-[#39B54A]"></i>{' '}
                <Skeleton width="5rem" className="mb-2"></Skeleton>
              </li>
              <li className="flex pr-4 items-center text-[16px]">
                <i className="fa-sharp fa-solid fa-location-dot mr-2 text-[#39B54A]"></i>{' '}
                <Skeleton width="5rem" className="mb-2"></Skeleton>
              </li>
            </ul>
          </div>
          <div className="card">
            <div className="border-round border-1 surface-border p-4">
              <ul className="m-0 p-0 list-none">
                <li className="mb-3">
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="border-round border-1 surface-border p-4">
              <ul className="m-0 p-0 list-none">
                <li className="mb-3">
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="border-round border-1 surface-border p-4">
              <ul className="m-0 p-0 list-none">
                <li className="mb-3">
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex">
                    <div style={{ flex: '1' }}>
                      <Skeleton width="100%" className="mb-2"></Skeleton>
                      <Skeleton width="75%"></Skeleton>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 lg:mb-0 lg:mt-0 mt-12 mb-8">
        <div className="w-full bg-white rounded-lg shadow">
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
              <Skeleton height="2rem" width="10rem" className="mb-2"></Skeleton>
            </h1>
            <div className="card">
              <div className="border-round border-1 surface-border py-4">
                <ul className="m-0 p-0 list-none">
                  <li className="mb-3">
                    <div className="flex">
                      <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex">
                      <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex">
                      <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex">
                      <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
              <Skeleton height="2rem" width="10rem" className="mb-2"></Skeleton>
            </h1>
            <div className="card">
              <div className="border-round border-1 surface-border py-4">
                <ul className="m-0 p-0 list-none">
                  <li className="mb-3">
                    <div className="flex">
                      <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex">
                      <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex">
                      <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex">
                      <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
