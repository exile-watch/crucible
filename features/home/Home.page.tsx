import { metaHomepage } from "@exile-watch/seo";
import { NextSeo } from "next-seo";
import { Layout } from "#components";
import ListHomepageEncounters from "./_components/ListHomeEncounters/ListHomeEncounters";

const HomePage = () => {
  return (
    <>
      <NextSeo {...metaHomepage({})} />

      <Layout>
        <ListHomepageEncounters />
      </Layout>
    </>
  );
};

export { HomePage };
