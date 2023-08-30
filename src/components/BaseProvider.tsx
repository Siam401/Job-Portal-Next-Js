'use client';

import { useMemo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CommonClientData from './CommonClientData';

type Props = {
  children: React.ReactNode;
  session: any;
};

const BaseProvider = ({ children, session }: Props) => {
  // const [queryClient] = React.useState(() => new QueryClient());

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime: 1000 * 60 * 5,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
    [],
  );

  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
          <CommonClientData />
        </QueryClientProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default BaseProvider;
