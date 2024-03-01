import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';

import {WritProvider} from "@exile-watch/writ-react";
import localFont from 'next/font/local'

const font = localFont({ src: '../fonts/Fontin-Regular.ttf' })

function ExileWatch({ Component, pageProps }: AppProps) {
  return (
    <WritProvider>
      <Component className={font.className} {...pageProps}  />
      <SpeedInsights />
    </WritProvider>
  );
}

export default ExileWatch;
