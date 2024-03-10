import { startCase } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "#components";
import { EncounterPage } from "#features/pages";
import ListEncounterMap from "./_components/ListEncounterMap/ListEncounterMap";

const EncountersMapPage = () => {
  const {
    query: { category, map },
  } = useRouter();

  if (category !== "common-maps") return <EncounterPage />;

  return (
    <Layout title={startCase(map as string)}>
      <ListEncounterMap />
    </Layout>
  );
};

export { EncountersMapPage };
