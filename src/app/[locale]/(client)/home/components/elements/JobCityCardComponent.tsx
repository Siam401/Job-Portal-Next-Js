export default function JobCityCardComponent({ items }: any) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {items &&
          items.map((value: JobSectionItem, index: number) => {
            return (
              <a
                href={'jobs?location=' + value.id}
                className="bg-white relative shadow-md shadow-[#3399FF]/10 rounded-full px-10 py-3 border-[#3399FF]/10 border-[1px] hover:shadow-none"
                key={index}
              >
                <h3 className="mb-2 text-[17px] font-bold text-gray-600 text-center">
                  <i className="fa-sharp fa-solid fa-map-location-dot text-[#FE0202] me-1"></i>{' '}
                  {value.name}
                </h3>
                <h6 className="table mx-auto my-2 bg-[#3399FE]/10 text-[12px] font-semibold uppercase px-4 py-1 rounded-full text-[#3399FF]">
                  <i className="fas fa-briefcase me-1"></i> {value.job_count}{' '}
                  Open Jobs
                </h6>
              </a>
            );
          })}
      </div>
    </>
  );
}
