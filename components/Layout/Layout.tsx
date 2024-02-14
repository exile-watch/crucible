import { ReactNode } from 'react';
import {AppShell} from "@mantine/core";
import Header from "./Header/Header";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: LayoutProps) => {
  return (
    <AppShell header={{height: 60}}>
      <AppShell.Header><Header /></AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export {Layout};
