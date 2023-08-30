import BannerComponent from '@/client/home/components/sections/BannerComponent';
import AboutComponent from '@/client/home/components/sections/AboutComponent';
import BenefitComponent from '@/client/home/components/sections/BenefitComponent';
import FaqComponent from '@/client/home/components/sections/FaqComponent';
import JobWingComponent from '@/client/home/components/sections/JobWingComponent';
import JobCityComponent from '@/client/home/components/sections/JobCityComponent';
import PageApi from '@/app/api/client/section';
import JobSectionServerWrapper from '@/app/[locale]/(client)/jobs/components/JobSectionServerWrapper';
import Configs from '@/config/settings.json';

export default async function HomePage() {
  const homePageData: any = await PageApi.getHome();

  if (homePageData && !homePageData.success) {
    throw new Error(homePageData.message ?? 'Something went wrong').toString();
  }

  return (
    <>
      {homePageData.data.banner?.is_active && (
        <BannerComponent bannerSectionData={homePageData.data.banner} />
      )}
      {homePageData.data.about_us?.is_active && (
        <AboutComponent aboutSectionData={homePageData.data.about_us} />
      )}
      {homePageData.data.facilities_benefits?.is_active && (
        <BenefitComponent
          benefitSectionData={homePageData.data.facilities_benefits}
        />
      )}

      {homePageData.data.job_wings?.is_active &&
        Configs.isGroupCompany === 1 && (
          <JobWingComponent jobWingSectionData={homePageData.data.job_wings} />
        )}

      {homePageData.data.job_cities?.is_active && (
        <JobCityComponent jobCitySectionData={homePageData.data.job_cities} />
      )}

      <JobSectionServerWrapper isHomePage={true} />

      {homePageData.data.faq?.is_active && (
        <FaqComponent home={true} faqData={homePageData.data.faq} />
      )}
    </>
  );
}
