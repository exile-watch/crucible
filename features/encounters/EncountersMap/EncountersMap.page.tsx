import { metaEncountersCategoryMaps } from "@exile-watch/seo";
import type { InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "#components";
import { EncounterPage } from "#features/pages";
import type { getStaticProps } from "#pages/[directory]/encounters/[category]/[map]";
import ListEncounterMap from "./_components/ListEncounterMap/ListEncounterMap";

const EncountersMapPage = ({
  data,
  isMap,
  activeEncounterAbilities,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    query: { directory, category, map },
  } = useRouter();

  if (activeEncounterAbilities)
    return (
      <EncounterPage
        data={data}
        isMap={isMap as boolean}
        activeEncounterAbilities={activeEncounterAbilities}
      />
    );

  return (
    <>
      {directory && category && map && (
        <NextSeo
          {...metaEncountersCategoryMaps({ directory, category, map })}
        />
      )}

      <Layout title={map as string}>
        <ListEncounterMap data={data} />
      </Layout>
    </>
  );
};

export { EncountersMapPage };
