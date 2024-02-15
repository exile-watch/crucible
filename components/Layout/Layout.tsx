import { ReactNode } from 'react';
import {AppShell} from "@mantine/core";
import Header from "./Header/Header";
import SidebarEncountersDesktop from "#features/encounters/components/Sidebar/SidebarEncountersDesktop";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: LayoutProps) => {
  return (
    <AppShell header={{height: 60}} navbar={{breakpoint: 'xs', width: 300}}>
      <AppShell.Header bg="dark.6"><Header /></AppShell.Header>
      <AppShell.Navbar bg="dark.6"><SidebarEncountersDesktop /></AppShell.Navbar>
      <AppShell.Main m="md">{children}</AppShell.Main>
    </AppShell>
  );
};

export {Layout};
