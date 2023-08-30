'use client';

import { SocialLinks } from '@/types/clientLayout';

type SocialLinksProps = {
  socialLinks: SocialLinks[];
};

const SocialLinks = ({ socialLinks }: SocialLinksProps) => {
  return (
    <ul className="flex justify-center mt-5 space-x-5">
      {socialLinks.map(({ title, url, icon_image, icon_type }) => (
        <li key={url}>
          <a
            target="_blank"
            href={url}
            className="text-gray-500 hover:text-gray-900"
          >
            <span dangerouslySetInnerHTML={{ __html: icon_image }} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
