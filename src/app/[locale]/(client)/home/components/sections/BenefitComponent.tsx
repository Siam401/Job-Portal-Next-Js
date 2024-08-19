import BenefitCardComponent from '@/client/home/components/elements/BenefitCardComponent';
import Link from 'next/link';

export default function BenefitComponent({ benefitSectionData }: any) {
  return (
    <>
      <section className="bg-[#fdfffc]">
        <div className="grid items-center max-w-screen-xl gap-10 px-3 py-10 mx-auto lg:grid-cols-6 lg:py-20">
          <div className="col-span-2 mb-10 lg:mb-0">
            <p className="table px-2 mb-3 text-[15px] font-bold text-[#39B54A] bg-[#39B54A]/10 rounded-md">
              {benefitSectionData.title}
            </p>
            <h2 className="mt-3 mb-4 text-3xl font-bold tracking-tight text-gray-600">
              {benefitSectionData.subtitle}
            </h2>
            <p className="mb-8 text-sm font-normal text-gray-500">
              {benefitSectionData.description}
            </p>
            <div className="pt-6 mt-6 space-y-4 border-t border-[#e5e5e5]">
              <div className="flex place-items-center">
                <Link
                  className="text-base font-semibold text-[#3298FF] hover:text-[#000]"
                  href="/jobs"
                >
                  Explore All Jobs
                  <i className="ml-2 fa fa-arrow-right"></i>
                </Link>
              </div>
              <div className="flex place-items-center">
                <a
                  target="blank"
                  href="/contact.php"
                  className="text-base font-semibold text-[#3298FF] hover:text-[#000]"
                >
                  Contact Us
                  <i className="ml-2 fa fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          {/* card component */}
          <BenefitCardComponent items={benefitSectionData.items} />
        </div>
      </section>
    </>
  );
}
