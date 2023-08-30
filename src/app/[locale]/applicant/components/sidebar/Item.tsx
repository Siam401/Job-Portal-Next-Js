'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { classNames } from 'primereact/utils';

type ItemProps = {
  link: string;
  text: string;
  icon?: StaticImageData;
  notificationCount?: number;
  showNotification?: boolean;
  isDropdownItem?: boolean;
  type?: string;
  handleClick?: () => void;
};

const Item = ({
  link,
  text,
  icon,
  notificationCount,
  showNotification = false,
  isDropdownItem = false,
  type = 'link',
  handleClick,
}: ItemProps) => {
  const pathName = usePathname();

  let isActive = pathName === link;

  if (pathName === '/applicant' && link === '/applicant/dashboard') {
    isActive = true;
  }
  const className =
    'flex items-center w-full p-2 text-base grayscale ' +
    (isDropdownItem
      ? 'font-semibold text-[#01468B] rounded-md hover:bg-gray-100 hover:grayscale-0 transition duration-75 pl-12 group '
      : 'font-semibold text-[#01468B] rounded-md hover:bg-gray-100 hover:grayscale-0') +
    (isActive ? ' bg-[#CCDEF0] !grayscale-0' : '');

  return (
    <li>
      {type === 'link' ? (
        <Link href={link} className={className}>
          <span className={isDropdownItem ? 'hidden' : 'w-[26px]'}>
            {icon ? (
              <Image priority src={icon} className="mx-auto" alt="text" />
            ) : null}
          </span>
          <span
            className={classNames(isActive ? 'text-[#01468B]' : '', 'ml-3')}
          >
            {text}
          </span>
          {showNotification && notificationCount !== 0 ? (
            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
              {notificationCount}
            </span>
          ) : null}
        </Link>
      ) : (
        <button type="button" className={className} onClick={handleClick}>
          <span className={isDropdownItem ? 'hidden' : 'w-[26px]'}>
            {icon ? (
              <Image priority src={icon} className="mx-auto" alt="text" />
            ) : null}
          </span>
          <span className="ml-3">{text}</span>
        </button>
      )}
    </li>
  );
};

export default Item;
