import { CookiesProvider } from 'react-cookie';
import type { AppProps } from 'next/app';
import App from 'next/app';

import { initSentry } from '../sentry';
import {WritProvider} from "@exile-watch/writ-react";

initSentry();

function ExileWatch({ Component, pageProps }: AppProps) {
  return (
      <WritProvider>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </WritProvider>
  );
}

ExileWatch.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default ExileWatch;
