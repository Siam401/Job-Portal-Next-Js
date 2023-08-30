import JobCityCardComponent from '@/client/home/components/elements/JobCityCardComponent';

export default function JobCityComponent({ jobCitySectionData }: any) {
  return (
    <>
      <section className="bg-white">
        <div className="items-center max-w-screen-xl px-3 mx-auto py-14 lg:py-20">
          <div className="mb-8 text-center">
            <p className="table mx-auto px-2 mb-3 text-[15px] font-bold text-[#39B54A] bg-[#39B54A]/10 rounded-md">
              {jobCitySectionData.title}
            </p>
            <h2 className="mt-1 mb-2 text-4xl font-extrabold tracking-tight text-center text-gray-600">
              {jobCitySectionData.subtitle}
            </h2>
            <p className="mb-8 font-normal text-center text-gray-500 text-md">
              {jobCitySectionData.description}
            </p>
          </div>
          <JobCityCardComponent items={jobCitySectionData.items} />
        </div>
      </section>
    </>
  );
}
