import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import {AppShell, Flex, Text} from "@mantine/core";
const Header = dynamic(() => import("./Header/Header")) ;
const SidebarEncountersDesktop = dynamic(() => import("#features/encounters/components/Sidebar/SidebarEncountersDesktop"));
import styles from './styles.module.scss'
import {useRouter} from "next/router";
import {useDisclosure} from "@mantine/hooks";
import {useIsMobile} from "#hooks/useIsMobile";
import {Title} from "@exile-watch/writ-react";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  const [isOpen, {toggle}] = useDisclosure(false)
  const {isMobile} = useIsMobile()
  const {pathname} = useRouter();
  const isHomepage = pathname === '/'

  return (
    <AppShell header={{height: 60}} navbar={{breakpoint: 'md', width: 250, collapsed: { mobile: !isOpen }}} withBorder={false}>
      <AppShell.Header bg="dark.6"><Header isOpen={isOpen} toggle={toggle} /></AppShell.Header>
      <AppShell.Navbar bg="dark.6"><SidebarEncountersDesktop isOpen={isOpen} toggle={toggle} /></AppShell.Navbar>
      <AppShell.Main mt="md" ml="md" pr="md" className={styles.main}>
        {title && <Title mb="md">{title}</Title>}
        {!isHomepage && <Flex className={styles.announcement} align="center" mr="md">
          <Text mx={4} size={isMobile ? 'xs' : 'md'}>🚧 This website is currently work in progress. Missing data is expected.</Text>
        </Flex>}
        <div className={!isHomepage ? styles.contentSmallMargin : ''}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
};

export {Layout};
