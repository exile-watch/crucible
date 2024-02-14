import { CookiesProvider } from 'react-cookie';
import type { AppProps } from 'next/app';
import App from 'next/app';
import '@mantine/core/styles.css'

import { initSentry } from '../sentry';
import {WritProvider} from "@exile-watch/writ-react";
import {MantineProvider} from "@mantine/core";
import localFont from 'next/font/local'

const font = localFont({ src: '../fonts/Fontin-Regular.ttf' })
initSentry();

function ExileWatch({ Component, pageProps }: AppProps) {
  return (
      <MantineProvider forceColorScheme="dark">
        <CookiesProvider>
          <Component className={font.className} {...pageProps}  />
        </CookiesProvider>
      </MantineProvider>
  );
}

ExileWatch.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default ExileWatch;
