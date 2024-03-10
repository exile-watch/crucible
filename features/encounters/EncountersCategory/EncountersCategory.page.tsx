import { startCase } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "#components";
import ListEncounterCategories from "./_components/ListEncounterCategories/ListEncounterCategories";

const EncountersCategoryPage = () => {
  const {
    query: { category },
  } = useRouter();

  return (
    <Layout title={startCase(category as string)}>
      <ListEncounterCategories />
    </Layout>
  );
};

export { EncountersCategoryPage };
