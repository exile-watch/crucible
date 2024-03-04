import {
  Button,
  Center,
  Code,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@exile-watch/writ-react";

import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import CardWrapper from "#features/welcome/WelcomeCard/CardWrapper/CardWrapper";
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
        <Text fs="italic">
          If you answered 'yes' to any of the above statements, then{" "}
          <Code>exile.watch</Code> was created for people like you!
        </Text>
        <Divider />
        <Text>
          <Code>exile.watch</Code> aims to provide quick snippets of the
          majority of Path of Exile encounters' abilities.
        </Text>
        <Text>
          In the modern world, no one has time to watch a 10-minute fight guide.
        </Text>
        <Text>Learn strategies in no time.</Text>
        <Text>Each ability is explained with short GIFs</Text>
        <Divider />
        <Group justify="center">
          <Button
            component={Link}
            href="/"
            variant="gradient"
            gradient={{ from: "transparent", to: "sand.2" }}
            rightSection={<IconArrowRight size={14} />}
          >
            Head over to exile.watch
          </Button>
          <Button
            component={Link}
            href="https://docs.exile.watch/"
            target="_blank"
            variant="gradient"
            gradient={{ from: "transparent", to: "red.5" }}
            rightSection={<IconArrowRight size={14} />}
          >
            Check docs to learn more
          </Button>
          <Button
            component={Link}
            href="https://engineering.exile.watch/"
            target="_blank"
            variant="gradient"
            gradient={{ from: "transparent", to: "teal" }}
            ff="monospace"
            rightSection={<IconArrowRight size={14} />}
          >
            exile.watch engineering blog
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default WelcomeCard;
