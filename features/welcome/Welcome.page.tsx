import {
  Center,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Title,
} from "@exile-watch/writ-react";

import { metaWelcome } from "@exile-watch/seo";
import { NextSeo } from "next-seo";
import React from "react";
import { Layout } from "#components";
import CardWrapper from "#features/welcome/_components/CardWrapper/CardWrapper";
import WelcomePageButtons from "#features/welcome/_components/WelcomePageButtons/WelcomePageButtons";
import WelcomePageSummary from "#features/welcome/_components/WelcomePageSummary/WelcomePageSummary";
import { welcomePageContent } from "#features/welcome/_components/about-list";
import styles from "./Welcome.module.scss";

const WelcomePage = () => {
  return (
    <>
      <NextSeo {...metaWelcome({})} />

      <Layout isWithoutSidebar>
        <Container size="xl" ta="center" mb="md">
          <Stack>
            <Center>
              <img
                src="https://avatars.githubusercontent.com/u/158840748?s=400&u=4c73ba2a9a2ebc70b01c6303d41e8571df84ec37&v=4"
                width={200}
                alt="exile.watch logo"
              />
            </Center>
            <Title className={styles.container}>Are you...</Title>
            <Center>
              <SimpleGrid cols={{ md: 3, sm: 1, xs: 1 }}>
                <CardWrapper {...welcomePageContent.outsider} />
                <CardWrapper {...welcomePageContent.poeConnoisseur} />
                <CardWrapper {...welcomePageContent.softwareEngineer} />
              </SimpleGrid>
            </Center>
            <Divider />
            <WelcomePageSummary />
            <Divider />
            <WelcomePageButtons />
          </Stack>
        </Container>
      </Layout>
    </>
  );
};

export { WelcomePage };
