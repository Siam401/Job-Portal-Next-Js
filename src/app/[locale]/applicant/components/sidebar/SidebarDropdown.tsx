'use client';

import { useEffect, useState } from 'react';
import Item from './Item';
import Image from 'next/image';
import editResumeSVG from '@/assets/icons/applicant/edit-resume.svg';
import { usePathname } from 'next/navigation';

const SidebarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    if (pathName.includes('/applicant/resume') && !pathName.includes('/view')) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [pathName]);

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center w-full p-2 text-[#01468B] text-base transition duration-75 group  font-semibold rounded-md hover:bg-gray-100 grayscale hover:grayscale-0"
        aria-controls="dropdown-example"
        data-collapse-toggle="dropdown-example"
      >
        {/* section: dropdown icon */}
        <span className="w-[26px]">
          <Image
            priority
            src={editResumeSVG}
            className="mx-auto"
            alt="edit-resume"
          />
        </span>
        {/* section: dropdown title */}
        <span className="flex-1 ml-3 text-left whitespace-nowrap">
          Edit Resume
        </span>
        {/* section: dropdown arrow */}
        <svg
          className={`w-6 h-6 transition-transform ${
            isOpen ? ' transform rotate-180' : ''
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {/* section: dropdown items */}
      <ul
        id="dropdown-example"
        className={'py-2 space-y-2 border-y' + (isOpen ? '' : ' hidden')}
      >
        <Item
          isDropdownItem
          link="/applicant/resume/personal"
          text="Personal Information"
        />
        <Item
          isDropdownItem
          link="/applicant/resume/education"
          text="Education & Training"
        />
        <Item
          isDropdownItem
          link="/applicant/resume/experience"
          text="Employment"
        />
        <Item
          isDropdownItem
          link="/applicant/resume/other"
          text="Other Information"
        />
        <Item isDropdownItem link="/applicant/resume/photo" text="Photograph" />
      </ul>
    </li>
  );
};

export default SidebarDropdown;
