import { metaDirectory } from "@exile-watch/seo";
import { Card, Container, SimpleGrid } from "@exile-watch/writ-react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Layout } from "#components";

const DirectoryPage = () => {
  const {
    query: { directory },
  } = useRouter();

  return (
    <>
      {directory && <NextSeo {...metaDirectory({ directory })} />}

      <Layout isWithoutSidebar>
        <Container size="xl">
          <SimpleGrid cols={{ md: 6, xs: 1 }}>
            <Card>Path of Exile 1</Card>
          </SimpleGrid>
        </Container>
      </Layout>
    </>
  );
};

export { DirectoryPage };
