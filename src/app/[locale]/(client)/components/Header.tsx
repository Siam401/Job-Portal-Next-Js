import Navbar from './ui/Navbar';
import CompanyLogo from '../../../../components/layouts/CompanyLogo';
import { Session } from '@/types/session';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

type HeaderProps = {
  data: any;
};

const Header = async ({ data }: HeaderProps) => {
  const session: Session | null = await getServerSession(authOptions);

  const links = [
    { href: '/', name: 'Home' },
    { href: '/jobs', name: 'Jobs' },
    { href: '/how-to', name: 'How to Apply' },
    { href: '/faq', name: 'FAQ' },
    { href: 'http://nextitltd.com/', name: 'Return to Main Website' },
  ];

  return (
    <>
      <header className="fixed z-20 w-full shadow backdrop-blur-lg">
        <nav className="border-gray-200 py-2.5">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-2 mx-auto">
            <CompanyLogo
              imgSrc={data?.logo}
              imgClass="h-15 mr-3 h-10"
              linkClass="flex items-center"
              alt="next-logo"
            />

            <Navbar links={links} session={session} />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
