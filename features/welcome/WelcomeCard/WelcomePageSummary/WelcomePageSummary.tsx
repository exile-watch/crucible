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
        <Code>exile.watch</Code> aims to provide quick snippets of the majority
        of Path of Exile encounters' abilities.
      </Text>
      <Text>
        In the modern world, no one has time to watch a 10-minute fight guide.
      </Text>
      <Text>Learn strategies in no time.</Text>
      <Text>Each ability is explained with short GIFs</Text>
    </>
  );
};

export default WelcomePageSummary;
