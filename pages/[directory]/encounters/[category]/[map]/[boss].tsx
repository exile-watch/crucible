import type { BossAbilityType, MapType } from "@exile-watch/encounter-data";
import type { GetStaticPaths, GetStaticProps } from "next";
import { REVALIDATE_FREQUENCY } from "#constants";
import { checkIfDirExists } from "#features/directory/Directory.api";
import { fetchEncounterData } from "#features/encounters/Encounter/Encounter.api";
import { fetchCategoryData } from "#features/encounters/EncountersCategory/EncountersCategory.api";
import { EncounterPage } from "#features/pages";

export const config = { runtime: "edge" };

type GetStaticParams = {
  directory: string;
  category: string;
  map: string;
  boss: string;
};

type GetStaticPropsReturn = {
  data: MapType;
  isMap?: boolean;
  activeEncounterAbilities?: BossAbilityType[];
};

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { params } = context;

  if (!params) {
    return { notFound: true };
  }

  const { directory, category, map, boss } = params;

  const dirExists = await checkIfDirExists(directory);
  const categoryData = await fetchCategoryData({ directory, category });
  const { data, isMap, activeEncounterAbilities } = await fetchEncounterData({
    directory,
    category,
    map,
    boss,
  });

  if (!dirExists || !categoryData?.default || !data) {
    return { notFound: true };
  }

  return {
    props: {
      data,
      isMap,
      activeEncounterAbilities,
    },
    revalidate: REVALIDATE_FREQUENCY,
  };
}) satisfies GetStaticProps<GetStaticPropsReturn, GetStaticParams>;

export default EncounterPage;
