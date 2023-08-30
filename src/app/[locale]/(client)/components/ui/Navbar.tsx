'use client';
import { MouseEvent, useRef } from 'react';
import Link from 'next/link';
import MenuToggler from './navbar/MenuToggler';
import NavMenu from './navbar/NavMenu';
import ProfileDropdown from './navbar/ProfileDropdown';
import { Session } from '@/types/session';

interface NavbarProps {
  links: { href: string; name: string }[];
  session: Session | null;
}

const Navbar = ({ links, session }: NavbarProps) => {
  const navMenuRef = useRef(null);

  const handleMenuToggler = (
    event: MouseEvent<HTMLButtonElement | HTMLLIElement>,
  ) => {
    const mobileMenu = navMenuRef.current as unknown as HTMLElement;
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  };

  const token = session?.token as string;
  const userName = session?.user?.name as string;
  const profileImage = session?.user?.photo as string;

  return (
    <>
      <div className="flex items-center lg:order-2">
        {/* section: sign in button */}
        {token ? (
          <ProfileDropdown userPhoto={profileImage} userName={userName} />
        ) : (
          <Link
            href="/signin"
            className="pt-2 pb-2 pl-5 pr-5 text-white bg-[#39B54A] hover:bg-[#2ea23e] focus:ring- rounded-full text-sm uppercase font-bold focus:outline-none focus:ring-[#e9e9e9]"
          >
            Sign In
          </Link>
        )}
        {/* section: Mobile menu toggler */}
        <MenuToggler onClick={handleMenuToggler} />
      </div>

      {/* section: nav links */}
      <div
        ref={navMenuRef}
        className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
      >
        <NavMenu links={links} onClick={handleMenuToggler} />
      </div>
    </>
  );
};

export default Navbar;
