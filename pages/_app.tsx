import "@mantine/core/styles.css";
import type { AppProps } from "next/app";

import { meta } from "@exile-watch/seo";
import { WritProvider } from "@exile-watch/writ-react";
import { DefaultSeo } from "next-seo";

function ExileWatch({ Component, pageProps }: AppProps) {
  return (
    <WritProvider>
      <DefaultSeo {...meta} />
      <Component {...pageProps} />
    </WritProvider>
  );
}

export default ExileWatch;
