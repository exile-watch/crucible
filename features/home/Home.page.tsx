import { metaHomepage } from "@exile-watch/seo";
import { NextSeo } from "next-seo";
import { Layout } from "#components";
import ListHomepageEncounters from "./_components/ListHomeEncounters/ListHomeEncounters";
import {InferGetStaticPropsType} from "next";
import {getStaticProps} from "#pages/index";

const HomePage = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
