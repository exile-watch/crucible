import { metaHomepage } from "@exile-watch/seo";
import type { InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { Layout } from "#components";
import type { getStaticProps } from "#pages/index";
import ListHomepageEncounters from "./_components/ListHomeEncounters/ListHomeEncounters";

const HomePage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo {...metaHomepage({})} />

      <Layout>
        <ListHomepageEncounters data={data} />
      </Layout>
    </>
  );
};

export { HomePage };
