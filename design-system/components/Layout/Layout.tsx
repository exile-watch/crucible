import { ReactNode } from 'react';
import cx from 'classnames';
import Head from 'next/head';

import useActiveFeature from '#hooks/useActiveFeature';

import Sidebar from './Sidebar/Sidebar';
import TopbarDesktop from './Topbar/TopbarDesktop';

import styles from './Layout.module.scss';

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: LayoutProps) => {
  const activeFeature = useActiveFeature();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <div
        className={cx(
          'theme-transition-scope',
          styles.container,
          activeFeature ? styles.featureContainer : styles.noFeatureContainer
        )}
      >
        <TopbarDesktop />
        <Sidebar />
        <div className={cx('p-3', styles.content)}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
