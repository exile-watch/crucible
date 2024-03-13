import { Code, Divider, Text } from "@exile-watch/writ-react";

const WelcomePageSummary = () => {
  return (
    <>
      <Text fs="italic">
        If you answered 'yes' to any of the above statements, then{" "}
        <Code>exile.watch</Code> was created for people like you!
      </Text>
      <Divider />
      <Text>
        <Code>exile.watch</Code> offers concise, visual guides and explanations
        for boss encounters in Path of Exile, targeting gamers seeking quick
        insights into game mechanics.
      </Text>
      <Text>
        This platform simplifies learning through short, informative GIFs,
        bypassing lengthy tutorials for efficient strategy acquisition.
      </Text>
      <Text>
        Ideal for both new and experienced players, it aims to enhance
        understanding and gameplay with immediate, easy-to-digest content.
      </Text>
    </>
  );
};

export default WelcomePageSummary;
