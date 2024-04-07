import { AppShell, Flex, Stack } from "@exile-watch/writ-react";
import cx from "classnames";
import { type ReactNode, useRef } from "react";
import { PageTitle } from "#components";
import { useIsOverflow } from "#hooks/useIsOverflow";
import styles from "./Main.module.scss";

interface MainProps {
  children?: ReactNode;
  label?: string;
  sublabel?: string;
  title?: string | Array<{ name: string; isMap?: boolean; redirect: string }>;
  isWithoutSidebar?: boolean;
}

const Main = ({ title, label, sublabel, children }: MainProps) => {
  const mainContainerRef = useRef(null);
  const isOverflow = useIsOverflow(mainContainerRef);
  const withPageTitle = title || label;

  return (
    <AppShell.Main mr={isOverflow ? "md" : 0}>
      <Stack>
        {withPageTitle && (
          <PageTitle label={label} sublabel={sublabel} title={title} />
        )}
        <Flex
          mt="md"
          px="md"
          display="block"
          className={cx({
            [styles.mainContainer]: withPageTitle,
            [styles.mainContainerWithoutPageTitle]: !withPageTitle,
            [styles.withScrollbar]: isOverflow,
          })}
          ref={mainContainerRef}
        >
          {children}
        </Flex>
      </Stack>
    </AppShell.Main>
  );
};

export default Main;
