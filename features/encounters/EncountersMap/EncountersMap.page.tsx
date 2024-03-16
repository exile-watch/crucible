import { metaEncountersCategoryMaps } from "@exile-watch/seo";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "#components";
import { EncounterPage } from "#features/pages";
import { MAP_WITHOUT_DIRECT_BOSS } from "#hooks/useEncounterData";
import ListEncounterMap from "./_components/ListEncounterMap/ListEncounterMap";

const EncountersMapPage = () => {
  const {
    query: { directory, category, map },
  } = useRouter();
  const isMapWithoutDirectBoss = MAP_WITHOUT_DIRECT_BOSS.includes(
    map as string,
  );

  if (category !== "common-maps" || isMapWithoutDirectBoss)
    return <EncounterPage />;

  return (
    <>
      {directory && category && map && (
        <NextSeo
          {...metaEncountersCategoryMaps({ directory, category, map })}
        />
      )}

      <Layout title={map as string}>
        <ListEncounterMap />
      </Layout>
    </>
  );
};

export { EncountersMapPage };
