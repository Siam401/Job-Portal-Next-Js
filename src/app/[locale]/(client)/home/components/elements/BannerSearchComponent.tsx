export default function BannerSearchComponent() {
  return (
    <>
      <form action="jobs">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <input
            // type="search"
            id="default-search"
            className="block w-full sm:h-[80px] h-[50px] py-[13px] sm:px-[40px] px-6 sm:text-lg text-md text-gray-900 rounded-full bg-gray-50 shadow-md focus-visible:outline-none"
            placeholder="Search Jobs"
            name="search"
            required
          />
          <button
            type="submit"
            className="sm:w-[65px] sm:h-[65px] w-[44px] h-[44px] text-white absolute sm:right-2 right-[3px] sm:bottom-2 bottom-[3px] bg-[#3399FE] hover:bg-[#3399FE]/90 font-medium rounded-full text-sm flex items-center justify-center"
          >
            <i className="text-2xl fa fa-search"></i>
          </button>
        </div>
      </form>
    </>
  );
}
