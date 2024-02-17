import { ReactNode } from 'react';
import {AppShell} from "@mantine/core";
import Header from "./Header/Header";
import SidebarEncountersDesktop from "#features/encounters/components/Sidebar/SidebarEncountersDesktop";
import styles from './styles.module.scss'
import {useRouter} from "next/router";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children }: LayoutProps) => {
  const {pathname} = useRouter();
  const isHomepage = pathname === "/"

  return (
    <AppShell header={{height: 60}} {...(!isHomepage && {navbar: {breakpoint: 'xs', width: 300}})} withBorder={false}>
      <AppShell.Header bg="dark.6"><Header /></AppShell.Header>
      {!isHomepage && <AppShell.Navbar bg="dark.6"><SidebarEncountersDesktop /></AppShell.Navbar>}
      <AppShell.Main m="md" className={styles.main}>{children}</AppShell.Main>
    </AppShell>
  );
};

export {Layout};
