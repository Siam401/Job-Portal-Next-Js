import Image from 'next/image';
import Link from 'next/link';
import jobsSVG from '@/assets/icons/applicant/jobs.svg';
import careersSVG from '@/assets/icons/applicant/careers.svg';
import faqsSVG from '@/assets/icons/applicant/faqs.svg';


const Footer = async () => {
  return (
    <>
      <div className="items-center justify-between lg:w-auto lg:hidden block fixed bottom-0 left-0 top-auto w-full bg-gray-100 z-50 drop-shadow-[0px_3px_15px_rgba(0,0,0,0.15)]">
        <ul className="grid grid-cols-3 gap-3 py-3">
          <li>
            <Link
              href="/jobs"
              className="px-2 block text-[#000] font-semibold hover:text-[#39B54A] text-center"
            >
              <Image
                priority
                src={jobsSVG}
                className="mx-auto"
                alt="jobs icon"
              />
            </Link>
          </li>
          <li>
            <Link
              href="../index.html"
              className="px-2 block text-[#000] font-semibold hover:text-[#39B54A] text-center"
            >
              <Image
                priority
                src={careersSVG}
                className="mx-auto"
                alt="careers icon"
              />
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="px-2 block text-[#000] font-semibold hover:text-[#39B54A] text-center"
            >
              <Image
                priority
                src={faqsSVG}
                className="mx-auto"
                alt="faqs icon"
              />
            </Link>
          </li>
        </ul>
      </div>
      <footer className="bg-gray-100 relative">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white"></div>
        <div className="max-w-screen-xl py-2 mx-auto lg:py-20 md:p-8 lg:p-10"></div>
      </footer>
    </>
  );
};

export default Footer;
