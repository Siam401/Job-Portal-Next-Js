import JobWingCardComponent from '@/client/home/components/elements/JobWingCardComponent';

export default function JobWingComponent({ jobWingSectionData }: any) {
  return (
    <>
      <section className="relative bg-gradient-to-br from-[#3AB54B]/[0.15] via-[#ED6922]/[0.15] to-[#3399FF]/[0.15] py-20 pb-24">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FDFFFC]"></div>
        <div className="max-w-screen-xl mx-auto border-gray-300 text-center">
          <p className="table mx-auto px-2 mb-3 text-[15px] font-bold text-[#39B54A] bg-[#39B54A]/10 rounded-md">
            {jobWingSectionData.title}
          </p>
          <a
            href="customers.html"
            className="text-3xl font-bold tracking-tight text-gray-600"
          >
            {jobWingSectionData.subtitle}
          </a>
          <JobWingCardComponent items={jobWingSectionData.items} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white"></div>
      </section>
    </>
  );
}
