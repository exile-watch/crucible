import { Card, Divider, Stack, Text, Title } from "@exile-watch/writ-react";
import cx from "classnames";
import Video from "#features/encounters/components/Boss/BossAbility/Video/Video";
import { WelcomePageContentType } from "#features/welcome/WelcomeCard/about-list";
import styles from "./CardWrapper.module.scss";

const CardWrapper = ({
  aboutList,
  title,
  dividerLabel,
  color,
  src,
}: WelcomePageContentType) => {
  return (
    <Stack>
      <Card
        className={cx(styles.card, styles[color])}
        shadow="md"
        c={`${color}.2`}
      >
        <Video src={src} isOnWelcomePage />
        <Title order={3} ta="center" fs="italic">
          ... {title} ...
        </Title>
        <Divider
          fs="italic"
          labelPosition="center"
          label={`... ${dividerLabel} ...`}
          mt="sm"
          color={`${color}.2`}
        />
        <Card.Section p="md">
          <Stack>
            {aboutList.map((item, i, self) => (
              <Text ta="center" key={item}>
                ...{item}
                {i !== self.length - 1 ? "..." : "?"}
              </Text>
            ))}
          </Stack>
        </Card.Section>
      </Card>
    </Stack>
  );
};

export default CardWrapper;
