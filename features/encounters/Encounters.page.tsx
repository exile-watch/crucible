import React from "react";
import { Layout } from "#components";
import ListEncounters from "./_components/ListEncounters/ListEncounters";

const EncountersPage = () => {
  return (
    <Layout title="Encounters">
      <ListEncounters />
    </Layout>
  );
};

export { EncountersPage };
