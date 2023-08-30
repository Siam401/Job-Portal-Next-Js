import CompanyLogo from '../../../../components/layouts/CompanyLogo';
import SocialLinks from './ui/SocialLinks';

import CopyrightText from './ui/CopyrightText';

type FooterProps = {
  data: any;
};

const Footer = async ({
  data: { logo, footer, social_links },
}: FooterProps) => {
  return (
    <>
      <footer className="relative bg-gray-100">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white"></div>
        <div className="max-w-screen-xl pt-24 mx-auto lg:pt-20 pb-14">
          <div className="text-center">
            {logo && (
              <CompanyLogo
                imgSrc={logo}
                imgClass="sm:h-[44px] h-[35px]"
                linkClass="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white"
                alt="next-logo"
              />
            )}

            {footer && <CopyrightText text={footer.footer_text} />}

            {social_links && <SocialLinks socialLinks={social_links} />}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
