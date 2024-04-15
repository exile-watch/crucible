import type {
  BossAbilityType,
  BossType,
  MapType,
} from "@exile-watch/encounter-data";
import { kebabCase } from "lodash";
import type { GetStaticPaths, GetStaticProps } from "next";
import { MAP_WITHOUT_DIRECT_BOSS, REVALIDATE_FREQUENCY } from "#constants";
import { checkIfDirExists } from "#features/directory/Directory.api";
import { fetchEncounterData } from "#features/encounters/Encounter/Encounter.api";
import { fetchCategoryData } from "#features/encounters/EncountersCategory/EncountersCategory.api";
import { fetchEncountersMapData } from "#features/encounters/EncountersMap/EncountersMap.api";
import { EncountersMapPage } from "#features/pages";

export const config = { runtime: "experimental-edge" };

type GetStaticParams = {
  directory: string;
  category: string;
  map: string;
  boss: string;
};

type GetStaticPropsReturn = {
  data: BossType | MapType;
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

  const { directory, category, map } = params;

  const dirExists = await checkIfDirExists(directory);
  const categoryData = await fetchCategoryData({ directory, category });
  const mapData = await fetchEncountersMapData({ directory, category, map });

  if (!dirExists || !categoryData?.default || !mapData) {
    return { notFound: true };
  }

  const isMapWithoutDirectBoss = MAP_WITHOUT_DIRECT_BOSS.includes(
    map as string,
  );

  const isEncounter = category !== "common-maps" || isMapWithoutDirectBoss;

  // We can consider this conditional as a "redirect"
  // This conditional saves user one unnecessary click by having direct access to the encounter...
  // ...if the encounter has its own arena (map)
  if (isEncounter) {
    const encounter = mapData.encounters[0].name;
    const {
      data: encounterData,
      isMap,
      activeEncounterAbilities,
    } = await fetchEncounterData({
      directory,
      category,
      map,
      boss: kebabCase(encounter),
    });

    if (!encounterData) {
      return { notFound: true };
    }

    return {
      props: {
        data: encounterData,
        isMap,
        activeEncounterAbilities,
      },
    };
  }

  return {
    props: {
      data: mapData,
    },
    revalidate: REVALIDATE_FREQUENCY,
  };
}) satisfies GetStaticProps<GetStaticPropsReturn, GetStaticParams>;

export default EncountersMapPage;
