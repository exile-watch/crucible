import { ReactNode } from 'react';
import {AppShell, Flex, Text} from "@mantine/core";
import Header from "./Header/Header";
import SidebarEncountersDesktop from "#features/encounters/components/Sidebar/SidebarEncountersDesktop";
import styles from './styles.module.scss'
import {useRouter} from "next/router";
import {useDisclosure} from "@mantine/hooks";
import {useIsMobile} from "#hooks/useIsMobile";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children }: LayoutProps) => {
  const [isOpen, {toggle}] = useDisclosure(false)
  const {isMobile} = useIsMobile()
  const {pathname} = useRouter();
  const isHomepage = pathname === '/'

  return (
    <AppShell header={{height: 60}} navbar={{breakpoint: 'md', width: 250, collapsed: { mobile: !isOpen }}} withBorder={false}>
      <AppShell.Header bg="dark.6"><Header isOpen={isOpen} toggle={toggle} /></AppShell.Header>
      <AppShell.Navbar bg="dark.6"><SidebarEncountersDesktop isOpen={isOpen} toggle={toggle} /></AppShell.Navbar>
      <AppShell.Main mt="md" ml="md" pr="md" className={styles.main}>
        <Flex className={styles.announcement} align="center" mr="md">
          <Text ml={4} size={isMobile ? 'xs' : 'md'}>🚧 This website is currently work in progress. Missing data is expected.</Text>
        </Flex>
        <div className={isHomepage ? styles.content : styles.contentSmallMargin}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
};

export {Layout};
