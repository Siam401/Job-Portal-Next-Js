import AboutListComponent from "@/client/home/components/elements/AboutListComponent";

export default function AboutComponent({ aboutSectionData }: any) {
  return (
    <>
      <section className="bg-white">
        <div className="max-w-screen-xl px-3 py-10 mx-auto sm:py-20">
          <div className="items-center gap-12 lg:grid lg:grid-cols-2 xl:gap-16">
            <img
              className="justify-center mx-auto mb-10 rounded-lg lg:mb-0 lg:flex"
              src={aboutSectionData.image}
              alt="feature image 2"
            />
            <div className="sm:text-lg">
              <p className="table px-2 mb-3 text-[15px] font-bold text-[#39B54A] bg-[#39B54A]/10 rounded-md">
                {aboutSectionData.title}
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-600">
                {aboutSectionData.subtitle}
              </h2>
              <p className="mb-8 text-sm font-normal text-gray-500">
                {aboutSectionData.description}
              </p>

              {/* list  */}
              <AboutListComponent items={aboutSectionData.items} />

              <p className="mb-8 text-sm font-normal text-gray-500">
                {aboutSectionData.extra &&
                  aboutSectionData.extra.map((value: any, index: number) => {
                    return <div key={index}>{value.text}</div>;
                  })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}