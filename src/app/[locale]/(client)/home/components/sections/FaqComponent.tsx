import PageApi from '@/app/api/client/section';
import FaqQaComponent from '@/client/home/components/elements/FaqQaComponent';

export default async function FaqComponent(prop: FaqProp) {
  const isHome = prop.home;
  const faqSectionData: any = prop.faqData ?? (await PageApi.getSection('faq'));

  return (
    <>
      <section className="bg-white">
        <div
          className={`${
            isHome
              ? 'px-3 py-10 lg:py-20 lg:grid lg:grid-cols-12 max-w-screen-xl mx-auto'
              : 'px-3 py-10 pt-[100px] lg:py-[150px] lg:grid lg:grid-cols-12 max-w-screen-xl mx-auto'
          }`}
        >
          <div className="col-span-4 lg:mb-0 mb-14">
            <div className="flex justify-center">
              <img
                className="snap-center"
                src={faqSectionData.image}
                alt="img"
              />
            </div>
          </div>
          <div className="col-span-8">
            <div className="mx-auto max-w-screen">
              {isHome && (
                <p className="table px-2 mb-3 text-[15px] font-bold text-[#39B54A] bg-[#39B54A]/10 rounded-md">
                  {faqSectionData.title}
                </p>
              )}
              <h2 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-gray-600 ">
                {faqSectionData.subtitle}
              </h2>
              <p className="mb-6 text-lg font-medium text-gray-500">
                {faqSectionData.description}
              </p>
              <div className="mx-auto max-w-screen">
                {/* QnA list */}
                <FaqQaComponent items={faqSectionData.items} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
