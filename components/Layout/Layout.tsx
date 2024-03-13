import {
  AppShell,
  Flex,
  Stack,
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
import { PageTitle } from "../PageTitle/PageTitle";

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
  const renderSidebar =
    isWithoutSidebar === false || (isWithoutSidebar === true && isMobile);
  const withPageTitle = title || label;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={
        renderSidebar
          ? { breakpoint: "md", width: 250, collapsed: { mobile: !isOpen } }
          : { breakpoint: 0, width: 0, collapsed: { mobile: !isOpen } }
      }
      withBorder={false}
      className={cx(styles.appShell, font.variable)}
    >
      <AppShell.Header
        className={cx(styles.header, {
          [styles.headerMobile]: isTablet,
        })}
      >
        <Header isOpen={isOpen} toggle={toggle} />
      </AppShell.Header>

      {renderSidebar && (
        <AppShell.Navbar
          className={cx(styles.navbar, { [styles.navbarMobile]: isTablet })}
        >
          <SidebarEncountersDesktop isOpen={isOpen} toggle={toggle} />
        </AppShell.Navbar>
      )}

      <AppShell.Main mr="md">
        <Stack>
          {withPageTitle && (
            <PageTitle label={label} sublabel={sublabel} title={title} />
          )}
          <Flex
            mt="md"
            px="md"
            display="block"
            className={
              withPageTitle
                ? styles.mainContainer
                : styles.mainContainerWithoutPageTitle
            }
          >
            {children}
          </Flex>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};

export { Layout };
