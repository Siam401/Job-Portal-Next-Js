'use client';

import Link from 'next/link';
import Image from 'next/image';

type CompanyLogoProps = {
  linkClass?: string;
  imgSrc: string;
  imgClass: string;
  alt: string;
  href?: string;
};

const CompanyLogo = ({
  alt,
  imgSrc,
  linkClass,
  imgClass,
  href = '/',
}: CompanyLogoProps) => {
  return (
    <>
      <Link href={href} className={`flex items-center ${linkClass}`}>
        <img src={imgSrc} className={imgClass} alt={alt} />
      </Link>
    </>
  );
};

export default CompanyLogo;
