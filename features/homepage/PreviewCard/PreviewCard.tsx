import { Card, Text, Image } from "@mantine/core";
interface PreviewCardProps {

}

const PreviewCard = () => {
  return (
    <Card
      shadow="sm"
      padding="xs"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          height={200}
          alt="No way!"
        />
      </Card.Section>

      <Text fw={500} size="lg">
        You&apos;ve won a million dollars in cash!
      </Text>
    </Card>
  );
};

export default PreviewCard;