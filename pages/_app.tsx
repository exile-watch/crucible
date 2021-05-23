import { CookiesProvider } from 'react-cookie';
import { Provider as StoreProvider } from 'react-redux';
import type { AppProps } from 'next/app';
import App from 'next/app';

import { store } from '#store';

import { initSentry } from '../sentry';

import '#design-system/styles/styles.scss';

initSentry();

function ExileWatch({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </CookiesProvider>
  );
}

ExileWatch.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default ExileWatch;
