import { getClientLayoutData } from '@/app/api/client/layout';
import { LayoutHeader } from '@/types/clientLayout';
import Footer from './components/Footer';
import Header from './components/Header';

const response: any = await getClientLayoutData();

const { message, success, data } = response;

if (!success) {
  throw new Error((message ?? 'Something went wrong').toString());
}

const header: LayoutHeader = data?.header;

const favicon = header.favicon;

const title = header.site_title;

const description = header?.site_description;

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: title ? title : 'Site Title',
  description: description ?? 'Site Description',
  icons: {
    icon: {
      rel: 'icon',
      type: 'image/x-icon',
      sizes: '16x16',
      url: favicon ? favicon : '/favicon.ico',
    },
  },
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header data={data} />
      <main className="w-full mx-auto min-h-[calc(100vh-135px)] md:min-h-[calc(100vh-145px)] lg:min-h-[calc(100vh-240px)]">
        {children}
      </main>
      <Footer data={data} />
    </>
  );
}
