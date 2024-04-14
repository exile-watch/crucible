import { metaEncountersCategories } from "@exile-watch/seo";
import { startCase } from "lodash";
import type { InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "#components";
import type { getStaticProps } from "#pages/[directory]/encounters/[category]";
import ListEncounterCategories from "./_components/ListEncounterCategories/ListEncounterCategories";

const EncountersCategoryPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
