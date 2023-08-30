import { getHowToApplyData } from '@/app/api/client/howTo';
import HowToImage from '@/client/how-to/components/HowToImage';
import HowToSteps from '@/client/how-to/components/HowToSteps';

export default async function HowToApply() {
  let response = await getHowToApplyData();

  if (response && !response.success) {
    throw new Error(response.message ?? 'Something went wrong').toString();
  }

  const { title, subtitle, image, items } = response.data as any;

  return (
    <>
      <section className="bg-white">
        <div className="px-4 py-20 lg:pt-[140px] lg:pb-[80px] lg:grid lg:grid-cols-12 items-center max-w-screen-xl mx-auto lg:space-x-12">
          <div className="col-span-5 lg:mb-0 lg:mt-0 mt-12 mb-8">
            <HowToImage imgSrc={image} />
          </div>
          <div className="col-span-7">
            <div className="max-w-screen mx-auto">
              <h2 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-gray-600 ">
                {title}
              </h2>
              <p className="mb-6 font-lg text-gray-500 dark:text-gray-500 md:text-md">
                {subtitle}
              </p>
              <HowToSteps items={items} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
