import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <Link
        href="/"
        className="
        border-2 shadow-md rounded-md p-2 mt-4 hover:bg-neutral-100 transition duration-200 ease-in-out cursor-pointer hover:shadow-lg hover:border-neutral-800 hover:text-neutral-800 font-medium text-sm
      "
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
