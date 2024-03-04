import { Group } from "@exile-watch/writ-react";
import WelcomePageButton from "#features/welcome/WelcomeCard/WelcomePageButtons/WelcomePageButton";

const WelcomePageButtons = () => {
  return (
    <Group justify="center">
      <WelcomePageButton
        label="Head over to exile.watch"
        color="sand.2"
        href="/"
      />
      <WelcomePageButton
        label="Check docs to learn more"
        color="red.5"
        href="https://docs.exile.watch/"
      />
      <WelcomePageButton
        label="exile.watch engineering blog"
        color="teal"
        href="https://engineering.exile.watch/"
      />
    </Group>
  );
};

export default WelcomePageButtons;
