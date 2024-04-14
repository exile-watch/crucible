import { EncounterPage } from "#features/pages";
import {GetStaticPaths, GetStaticProps} from "next";
import {checkIfDirExists} from "#features/directory/Directory.api";
import {fetchCategoryData} from "#features/encounters/EncountersCategory/EncountersCategory.api";
import {fetchEncounterData} from "#features/encounters/Encounter/Encounter.api";
import {BossAbilityType, MapType} from "@exile-watch/encounter-data";
import {REVALIDATE_FREQUENCY} from "#constants";

type GetStaticParams = {
  directory: string;
  category: string;
  map: string;
  boss: string;
}

type GetStaticPropsReturn = {
  data: MapType,
  isMap?: boolean,
  activeEncounterAbilities?: BossAbilityType[]
}

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const { params } = context;

  if (!params) {
    return { notFound: true };
  }

  const { directory, category, map, boss } = params;

  const dirExists = await checkIfDirExists(directory);
  const categoryData = await fetchCategoryData({directory, category});
  const {data, isMap, activeEncounterAbilities} = await fetchEncounterData({directory, category, map, boss});

  if (!dirExists || !categoryData?.default || !data) {
    return { notFound: true };
  }

  return {
    props: {
      data,
      isMap,
      activeEncounterAbilities
    },
    revalidate: REVALIDATE_FREQUENCY
  };
}) satisfies GetStaticProps<GetStaticPropsReturn, GetStaticParams>

export default EncounterPage;
