import type { AppProps } from 'next/app';

import '../global-styles/styles.scss';

function ExileWatch({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default ExileWatch;
