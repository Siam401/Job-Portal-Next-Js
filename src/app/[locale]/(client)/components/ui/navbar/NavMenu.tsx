import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEvent } from 'react';
interface NavMenuProps {
  links: { href: string; name: string }[];
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
}

const NavMenu = ({ links, onClick }: NavMenuProps) => {
  const inactiveClassName =
    'pl-2 pr-2 block text-[#000] hover:text-[#39B54A] border-b border-transparent hover:border-b hover:border-[#39B54A]';
  const activeClassName =
    'pl-2 pr-2 block text-[#39B54A] hover:text-[#39B54A] border-b border-[#39B54A]';

  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:space-y-0 lg:my-0 space-y-6 my-8">
      {links.map(({ href, name }) => {
        const className =
          pathname === href ? activeClassName : inactiveClassName;
        return (
          <li key={href} onClick={handleClick}>
            <Link href={href} className={className}>
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavMenu;
