import BannerCategoryComponent from '@/client/home/components/elements/BannerCategoryComponent';
import BannerSearchComponent from '@/client/home/components/elements/BannerSearchComponent';

export default function BannerComponent({ bannerSectionData }: any) {
  return (
    <>
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-24 bg-white bg-gradient-to-br from-[#3AB54B]/[0.15] via-[#ED6922]/[0.15] to-[#3399FF]/[0.15]">
        <div className="grid max-w-screen-xl grid-cols-1 px-4 mx-auto lg:grid-cols-5 place-items-center">
          <div className="lg:col-span-3 col-span-1 p-4 sm:p-8 bg-[#39B54A]/10 sm:rounded-tl-[30px] rounded-tl-[10px] sm:rounded-tr-[90px] sm:rounded-bl-[90px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] sm:text-start text-center">
            <h1 className="max-w-2xl mb-4 text-2xl font-bold leading-none tracking-tight text-gray-600 sm:text-4xl xl:text-5xl">
              {bannerSectionData.title}
            </h1>
            <p className="max-w-xl mb-6 font-light text-lg md:text-2xl text-[#39B54A] lg:mb-8">
              {bannerSectionData.subtitle}
            </p>

            {/* job search component in home section */}
            <BannerSearchComponent />

            <h3 className="text[14px] text-[#666] font-semibold uppercase mt-5 mb-2">
              POPULAR CATEGORIES
            </h3>

            {/* Popular category list component */}
            <BannerCategoryComponent items={bannerSectionData?.items} />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <img className="w-[500px]" src={bannerSectionData.image} alt="hero image"/>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white"></div>
      </section>
    </>
  );
}
