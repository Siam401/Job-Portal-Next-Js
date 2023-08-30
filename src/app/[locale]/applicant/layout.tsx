import { getClientLayoutData } from '@/app/api/client/layout';
import { LayoutHeader } from '@/types/clientLayout';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SidebarSection from './components/sidebar/SidebarSection';
import Backdrop from './components/Backdrop';

const response: any = await getClientLayoutData();

const { message, success, data } = response;

if (!success) {
  throw new Error((message ?? 'Something went wrong').toString());
}

const header: LayoutHeader = data?.header;

const favicon = header.favicon;

const title = header.site_title;

const description = header.site_description;

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: title ? title : 'Site Title',
  description: header ? header?.site_description : 'Site Description',
  icons: {
    icon: {
      rel: 'icon',
      type: 'image/x-icon',
      sizes: '16x16',
      url: favicon ? favicon : '/favicon.ico',
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header data={data} />
      <Sidebar>
        <SidebarSection data={data} />
      </Sidebar>
      <main className="min-h-[calc(100vh-135px)] md:min-h-[calc(100vh-145px)] lg:min-h-[calc(100vh-240px)] lg:ml-64 ml-0 mt-[70px]">
        {children}
      </main>
      <Footer />
      <Backdrop />
    </>
  );
}
