import Link from 'next/link';
import DrawerToggler from './header/DrawerToggler';
import NavLinks from './header/NavLinks';
import NotificationPanel from './header/NotificationPanel';
import ProfilePanel from './header/ProfilePanel';
import homeSVG from '@/assets/icons/applicant/home.svg';
import Image from 'next/image';
import CompanyLogo from '@/components/layouts/CompanyLogo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session } from '@/types/session';
import { getUserDetail } from '@/app/api/applicant/layout';

type HeaderProps = {
  data: any;
};

const Header = async ({ data }: HeaderProps) => {
  const session: Session | null = await getServerSession(authOptions);
  const token = session?.token as string;

  const userResponse = await getUserDetail(token);

  return (
    <>
      <header className="fixed w-full shadow backdrop-blur-lg z-20 top-[0]">
        <nav className="border-gray-200 py-2.5">
          <div className="flex flex-wrap items-center justify-between lg:px-10 px-2 mx-auto">
            <div className="flex">
              <DrawerToggler />
              <CompanyLogo
                imgClass="lg:h-10 h-7 me-3 lg:ms-0 ms-2"
                imgSrc={data?.logo}
                alt="next it"
              />
            </div>

            <div className="flex items-center lg:order-2 lg:space-x-7 space-x-2">
              <NavLinks />
              <span>
                {/* section: home icon */}
                <Link
                  href="/applicant/dashboard"
                  className="flex items-center text-center h-[36px] w-[36px] rounded-full bg-[#CCDEF0] hover:bg-[#9bc8ff] ease-in-out duration-300"
                >
                  {/* <img src={homeSVG} alt="home icon" className='mx-auto' /> */}
                  <Image
                    priority
                    src={homeSVG}
                    className="mx-auto"
                    alt="home icon"
                  />
                </Link>
              </span>
              <span>
                <NotificationPanel initialData={userResponse} />
              </span>
              <span className="block h-[18px] w-[2px] bg-[#CCDEF0]"></span>

              <ProfilePanel initialData={userResponse} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
