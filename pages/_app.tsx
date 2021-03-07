import type { AppProps } from 'next/app';

import '#global-styles/styles.scss';

export default function ExileMonster({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
