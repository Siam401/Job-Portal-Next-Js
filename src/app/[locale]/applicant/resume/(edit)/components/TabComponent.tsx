'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabComponent() {
  const links = [
    {
      href: '/applicant/resume/personal',
      name: 'Personal Information',
      icon: 'fa fa-user',
    },
    {
      href: '/applicant/resume/education',
      name: 'Education & Training',
      icon: 'fa fa-graduation-cap',
    },
    {
      href: '/applicant/resume/experience',
      name: 'Employment',
      icon: 'fa fa-briefcase',
    },
    {
      href: '/applicant/resume/other',
      name: 'Other Information',
      icon: 'fa fa-file-lines',
    },
    { href: '/applicant/resume/photo', name: 'Photo', icon: 'fa fa-camera' },
  ];

  const inactiveClassName =
    'flex flex-col items-center w-full lg:pe-5 pe-0 opacity-70 hover:opacity-100';
  const activeClassName =
    'flex flex-col items-center w-full lg:pe-5 pe-0 opacity-100 hover:opacity-100 xl:pb-1 pb-0 xl:border-b-2 border-0 border-white';

  const pathname = usePathname();

  return (
    <>
      <div className="w-full bg-gradient-to-b from-[#003D7A] to-[#0060C0]">
        <ul className="py-3 2xl:px-16 md:px-8 px-0 grid grid-cols-5 gap-3">
          {links.map((value: any, index: number) => {
            return (
              <li className="2xl:pe-5 pe-0" key={index}>
                <Link
                  href={value.href}
                  className={
                    pathname === value.href
                      ? activeClassName
                      : inactiveClassName
                  }
                >
                  <i
                    className={
                      value.icon +
                      ' text-white text-[30px] w-full xl:text-start text-center'
                    }
                  ></i>
                  <h3 className="w-full 2xl:text-[18px] text-[16px] text-white font-semibold text-start xl:block hidden">
                    {value.name}
                  </h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
