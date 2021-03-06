import {ReactNode} from 'react'
import Head from 'next/head'
import SidebarDesktop from "./Sidebar/SidebarDesktop";
import styles from './Layout.module.scss'
import TopbarDesktop from "./Topbar/TopbarDesktop";
import cx from "classnames";

type LayoutProps = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.container}>
        <SidebarDesktop/>
        <div className={styles.contentWrapper}>
          <TopbarDesktop />
          <div className={cx("p-3", styles.content)}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
