import { CookiesProvider } from 'react-cookie';
import type { AppProps } from 'next/app';
import App from 'next/app';
import '@mantine/core/styles.css'

import {WritProvider} from "@exile-watch/writ-react";
import {createTheme, MantineColorsTuple, MantineProvider} from "@mantine/core";
import localFont from 'next/font/local'

const font = localFont({ src: '../fonts/Fontin-Regular.ttf' })

const sand: MantineColorsTuple = [
  "#fff9e6",
  "#fdf2d2",
  "#f9e4a4",
  "#f6d571",
  "#f4c848",
  "#f2c02e",
  "#f2bc21",
  "#d7a515",
  "#bf930a",
  "#a67e00"
]
const sapphire: MantineColorsTuple = [
  "#ecf1fe",
  "#d5dff7",
  "#a8bdf0",
  "#7798eb",
  "#5079e6",
  "#3a66e5",
  "#2e5ce5",
  "#234dcc",
  "#1c43b7",
  "#0c3aa1"
]

const theme = createTheme({
  primaryColor: 'sapphire',
  colors: {
    sand,
    sapphire
  }
});


function ExileWatch({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider forceColorScheme="dark" theme={theme}>
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
