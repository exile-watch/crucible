import { ReactNode } from 'react';
import cx from 'classnames';
import Head from 'next/head';

import Sidebar from '#components/Layout/Sidebar/Sidebar';
import useActiveModule from '#hooks/useActiveModule';

import TopbarDesktop from './Topbar/TopbarDesktop';

import styles from './Layout.module.scss';

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: LayoutProps) => {
  const activeModule = useActiveModule();
  console.log(activeModule);
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
          styles.container,
          activeModule ? styles.moduleContainer : styles.noModuleContainer
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
