import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import BaseProvider from '@/components/BaseProvider';

// section: style imports
import '@/assets/styles/primereact.scss';
import '@/assets/styles/global.scss';

type Props = {
  children: ReactNode;
  params: { locale: string };
  session: any;
};

export default async function LocaleLayout({
  children,
  session,
  params: { locale },
}: Props) {
  let messages;
  try {
    messages = (await import(`../../../languages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <BaseProvider session={session}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </BaseProvider>
      </body>
    </html>
  );
}
