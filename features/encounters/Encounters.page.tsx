import { metaEncounters } from "@exile-watch/seo";
import type { InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "#components";
import type { getStaticProps } from "#pages/[directory]/encounters";
import ListEncounters from "./_components/ListEncounters/ListEncounters";

const EncountersPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    query: { directory },
  } = useRouter();

  return (
    <>
      {directory && <NextSeo {...metaEncounters({ directory: directory })} />}

      <Layout title="Encounters">
        <ListEncounters data={data} />
      </Layout>
    </>
  );
};

export { EncountersPage };
