import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NextPage } from 'next';
import { QueryClient } from 'react-query/';
import { QueryClientProvider } from 'react-query';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session}>
      <Provider store={store} >
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </Provider>
    </SessionProvider>)
}
