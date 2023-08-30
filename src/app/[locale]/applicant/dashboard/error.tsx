'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Error({ error, reset }: any) {
  React.useEffect(() => {
    console.log('logging error:', error);
  }, [error]);
  const router = useRouter();

  const handleReload = () => {
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Error</h2>
      <p className="text-sm">{error?.message}</p>
      <div>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={handleReload}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
