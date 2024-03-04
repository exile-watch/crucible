import {
  Center,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Title,
} from "@exile-watch/writ-react";

import CardWrapper from "#features/welcome/WelcomeCard/CardWrapper/CardWrapper";
import WelcomePageButtons from "#features/welcome/WelcomeCard/WelcomePageButtons/WelcomePageButtons";
import WelcomePageSummary from "#features/welcome/WelcomeCard/WelcomePageSummary/WelcomePageSummary";
import { welcomePageContent } from "#features/welcome/WelcomeCard/about-list";

const WelcomeCard = () => {
  return (
    <Container size="xl" ta="center" mb="md">
      <Stack>
        <Center>
          <img
            src="https://avatars.githubusercontent.com/u/158840748?s=400&u=4c73ba2a9a2ebc70b01c6303d41e8571df84ec37&v=4"
            width={200}
            alt="exile.watch logo"
          />
        </Center>
        <Center>
          <Title fs="italic">Are you...</Title>
        </Center>
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
  );
};

export default WelcomeCard;
