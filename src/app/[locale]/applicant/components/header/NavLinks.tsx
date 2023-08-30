import Image from 'next/image';
import jobsSVG from '@/assets/icons/applicant/jobs.svg';
import careersSVG from '@/assets/icons/applicant/careers.svg';
import faqsSVG from '@/assets/icons/applicant/faqs.svg';
import Link from 'next/link';

const NavLinks = () => {
  const links = [
    {
      href: '/jobs',
      icon: jobsSVG,
      label: 'View Jobs',
    },
    {
      href: '/',
      icon: careersSVG,
      label: 'Career Home',
    },
    {
      href: '/faq',
      icon: faqsSVG,
      label: 'FAQs',
    },
  ];

  return (
    <div
      className="items-center justify-between w-full lg:flex lg:w-auto hidden"
      id="mobile-menu-2"
    >
      <ul className="flex font-medium lg:flex-row lg:space-x-8 lg:space-y-0 lg:my-0 space-y-6 my-8 me-10">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="flex px-2 text-[#000] font-semibold hover:text-[#39B54A] items-center"
            >
              <Image
                priority
                width={18}
                src={link?.icon}
                className="me-3"
                alt={link?.label}
              />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
