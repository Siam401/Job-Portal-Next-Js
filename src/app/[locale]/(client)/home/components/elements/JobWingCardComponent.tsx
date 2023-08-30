export default function JobWingCardComponent({ items }: any) {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 mt-8 brightness-75 contrast-200 lg:gap-6">
        {items &&
          items.map((value: JobSectionItem, index: number) => {
            return (
              <a
                href={'jobs?company=' + value.id}
                className="block opacity-75 hover:opacity-100"
                key={index}
              >
                <span className="block text-center py-3 px-6 bg-white/60 rounded-tl-[10px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[5px] border-[1px] border-white shadow-xl hover:border-gray-200 hover:shadow-none hover:bg-white">
                  <img
                    className="w-auto h-8 mx-auto lg:h-10 lg:w-auto"
                    src={value.logo ? value.logo : ''}
                    loading="lazy"
                  />
                  <h6 className="my-2 bg-[#3399FE]/10 text-[12px] font-semibold uppercase px-2 py-1 rounded-md text-[#3399FF]">
                    <i className="fas fa-briefcase me-1"></i> {value.job_count}{' '}
                    Open Jobs
                  </h6>
                </span>
                <h4 className="mt-2 text-[15px] font-semibold text-[#39B54A]">
                  {value.name}
                </h4>
              </a>
            );
          })}
      </div>
    </>
  );
}
