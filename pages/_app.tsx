import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';

import {MantineProvider} from "@mantine/core";
import localFont from 'next/font/local'
import {theme} from "../theme";

const font = localFont({ src: '../fonts/Fontin-Regular.ttf' })

function ExileWatch({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider forceColorScheme="dark" theme={theme}>
      <Component className={font.className} {...pageProps}  />
      <SpeedInsights />
    </MantineProvider>
  );
}

export default ExileWatch;
