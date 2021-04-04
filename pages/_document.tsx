import { Cookies } from 'react-cookie';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    let theme;
    if (ctx.req && 'cookies' in ctx.req) {
      const { req }: any = ctx;
      theme = req.cookies.theme || 'dark';
    } else {
      const cookies = new Cookies();
      theme = cookies.get('theme') === 'dark' ? 'dark' : 'light';
    }

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, theme };
  }

  render() {
    const { theme }: any = this.props;

    return (
      <Html className={theme}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
