import {
  AppShell,
  Flex,
  Title,
  useDisclosure,
  useMediaQuery,
} from "@exile-watch/writ-react";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
const Header = dynamic(() => import("./Header/Header"));
const SidebarEncountersDesktop = dynamic(
  () =>
    import("#features/encounters/components/Sidebar/SidebarEncountersDesktop"),
);
import styles from "./styles.module.scss";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
  isWithoutSidebar?: boolean;
};

const Layout = ({ children, title, isWithoutSidebar = false }: LayoutProps) => {
  const [isOpen, { toggle }] = useDisclosure(false);
  const { isMobile } = useMediaQuery();

  const renderSidebar =
    isWithoutSidebar === false || (isWithoutSidebar === true && isMobile);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={
        renderSidebar
          ? { breakpoint: "md", width: 250, collapsed: { mobile: !isOpen } }
          : { breakpoint: 0, width: 0, collapsed: { mobile: !isOpen } }
      }
      withBorder={false}
    >
      <AppShell.Header bg="dark.6">
        <Header isOpen={isOpen} toggle={toggle} />
      </AppShell.Header>
      {renderSidebar && (
        <AppShell.Navbar bg="dark.6">
          <SidebarEncountersDesktop isOpen={isOpen} toggle={toggle} />
        </AppShell.Navbar>
      )}
      <AppShell.Main ml="md" pr="md" className={styles.main}>
        {title && (
          <Title mb="2rem" order={2}>
            {title}
          </Title>
        )}
        <Flex mt="md" display="block">
          {children}
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
};

export { Layout };
