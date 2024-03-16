import { metaEncountersCategories } from "@exile-watch/seo";
import { startCase } from "lodash";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "#components";
import ListEncounterCategories from "./_components/ListEncounterCategories/ListEncounterCategories";

const EncountersCategoryPage = () => {
  const {
    query: { directory, category },
  } = useRouter();

  return (
    <>
      {directory && category && (
        <NextSeo {...metaEncountersCategories({ directory, category })} />
      )}

      <Layout label={startCase(category as string)}>
        <ListEncounterCategories />
      </Layout>
    </>
  );
};

export { EncountersCategoryPage };
