'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <button
        onClick={() => {
          router.back();
        }}
        className="px-2 py-3 mt-4 text-sm font-medium transition duration-200 ease-in-out border-2 rounded-md shadow-md cursor-pointer hover:bg-neutral-100 hover:shadow-lg hover:border-neutral-800 hover:text-neutral-800">
        Go back to previous page
      </button>
    </div>
  );
}
