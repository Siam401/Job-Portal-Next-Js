'use client';

import { Skeleton } from 'primereact/skeleton';
import React from 'react';

const Loading = (props: any) => {
  return (
    <>
      <h2 className="text-[18px] font-bold text-[#333] mb-3 border-b-2">
        <Skeleton width="10rem" className="mb-2"></Skeleton>
      </h2>
      <div className="grid gap-3 mb-6 md:grid-cols-2 grid-cols-1">
        <div>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
          <Skeleton height="2rem" className="mb-2"></Skeleton>
        </div>
        <div>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
          <Skeleton height="2rem" className="mb-2"></Skeleton>
        </div>
        <div>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
          <Skeleton height="2rem" className="mb-2"></Skeleton>
        </div>
        <div>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
          <Skeleton height="2rem" className="mb-2"></Skeleton>
        </div>
        <div>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
          <Skeleton height="2rem" className="mb-2"></Skeleton>
        </div>
        <div>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
          <Skeleton height="2rem" className="mb-2"></Skeleton>
        </div>
      </div>
    </>
  );
};

export default Loading;
