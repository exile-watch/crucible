import { CookiesProvider } from 'react-cookie';
import type { AppProps } from 'next/app';
import App from 'next/app';

import '../global-styles/styles.scss';

function ExileWatch({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

ExileWatch.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default ExileWatch;
