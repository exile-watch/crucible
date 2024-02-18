import { ReactNode } from 'react';
import {AppShell, Flex, Text} from "@mantine/core";
import Header from "./Header/Header";
import SidebarEncountersDesktop from "#features/encounters/components/Sidebar/SidebarEncountersDesktop";
import styles from './styles.module.scss'
import {IconInfoCircle} from "@tabler/icons-react";
import {useRouter} from "next/router";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children }: LayoutProps) => {
  const {pathname} = useRouter();
  const isHomepage = pathname === '/'

  return (
    <AppShell header={{height: 60}} navbar={{breakpoint: 'xs', width: 250}} withBorder={false}>
      <AppShell.Header bg="dark.6"><Header /></AppShell.Header>
      <AppShell.Navbar bg="dark.6"><SidebarEncountersDesktop /></AppShell.Navbar>
      <AppShell.Main m="md" className={styles.main}>
        <Flex className={styles.announcement} align="center">
          <Text ml={4}>🚧 This website is currently work in progress. Missing data is expected.</Text>
        </Flex>
        <div className={isHomepage ? styles.content : styles.contentSmallMargin}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
};

export {Layout};
