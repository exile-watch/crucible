import { Card, Container, SimpleGrid } from "@exile-watch/writ-react";
import { Layout } from "#components";

const DirectoryPage = () => {
  return (
    <Layout isWithoutSidebar>
      <Container size="xl">
        <SimpleGrid cols={{ md: 6, xs: 1 }}>
          <Card>Path of Exile 1</Card>
          <Card>Path of Exile 2</Card>
          <Card>Gauntlet</Card>
          <Card>BPL</Card>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export { DirectoryPage };
