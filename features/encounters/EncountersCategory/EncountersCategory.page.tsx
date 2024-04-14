import { metaEncountersCategories } from "@exile-watch/seo";
import { startCase } from "lodash";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "#components";
import ListEncounterCategories from "./_components/ListEncounterCategories/ListEncounterCategories";
import {InferGetStaticPropsType} from "next";
import {getStaticProps} from "#pages/[directory]/encounters/[category]";

const EncountersCategoryPage = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    query: { directory, category },
  } = useRouter();

  return (
    <>
      {directory && category && (
        <NextSeo {...metaEncountersCategories({ directory, category })} />
      )}

      <Layout label={startCase(category as string)}>
        <ListEncounterCategories data={data} />
      </Layout>
    </>
  );
};

export { EncountersCategoryPage };
