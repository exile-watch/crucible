import "@mantine/core/styles.css";
import type { AppProps } from "next/app";

import { WritProvider } from "@exile-watch/writ-react";

function ExileWatch({ Component, pageProps }: AppProps) {
  return (
    <WritProvider>
      <Component {...pageProps} />
    </WritProvider>
  );
}

export default ExileWatch;
