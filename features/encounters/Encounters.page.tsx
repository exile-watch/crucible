import { metaEncounters } from "@exile-watch/seo";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "#components";
import ListEncounters from "./_components/ListEncounters/ListEncounters";

const EncountersPage = () => {
  const {
    query: { directory },
  } = useRouter();

  return (
    <>
      {directory && <NextSeo {...metaEncounters({ directory: directory })} />}

      <Layout title="Encounters">
        <ListEncounters />
      </Layout>
    </>
  );
};

export { EncountersPage };
