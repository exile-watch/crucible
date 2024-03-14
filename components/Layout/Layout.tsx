import {
  AppShell,
  useDisclosure,
  useMediaQuery,
} from "@exile-watch/writ-react";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
const Header = dynamic(() => import("./Header/Header"));
const SidebarEncountersDesktop = dynamic(
  () =>
    import("#features/encounters/_components/Sidebar/SidebarEncountersDesktop"),
);
import styles from "./styles.module.scss";

import cx from "classnames";
import localFont from "next/font/local";
import Main from "./Main/Main";

// @ts-ignore
const font = localFont({
  src: "../../fonts/Fontin-Regular.ttf",
  variable: "--global-font-fontin",
});

type LayoutProps = {
  children?: ReactNode;
  label?: string;
  sublabel?: string;
  title?: string | Array<{ name: string; isMap?: boolean; redirect: string }>;
  isWithoutSidebar?: boolean;
};

const Layout = ({
  children,
  title,
  label,
  sublabel,
  isWithoutSidebar = false,
}: LayoutProps) => {
  const [isOpen, { toggle }] = useDisclosure(false);
  const { isMobile, isTablet } = useMediaQuery();
  const withSidebar =
    isWithoutSidebar === false || (isWithoutSidebar === true && isMobile);
  const navbar = withSidebar
    ? { breakpoint: "md", width: 250, collapsed: { mobile: !isOpen } }
    : { breakpoint: 0, width: 0, collapsed: { mobile: !isOpen } };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={navbar}
      withBorder={false}
      className={cx(styles.appShell, font.variable)}
    >
      <Header isOpen={isOpen} toggle={toggle} />

      {withSidebar && (
        <AppShell.Navbar
          className={cx(styles.navbar, { [styles.navbarMobile]: isTablet })}
        >
          <SidebarEncountersDesktop isOpen={isOpen} toggle={toggle} />
        </AppShell.Navbar>
      )}

      <Main label={label} sublabel={sublabel} title={title}>
        {children}
      </Main>
    </AppShell>
  );
};

export { Layout };
