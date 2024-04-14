import type { BossType, MapType } from "@exile-watch/encounter-data";
import { kebabCase } from "lodash";

type FetchEncountersDataProps = {
  directory: string;
  category: string;
  map: string;
  boss: string;
};

async function fetchEncounterData({
  directory,
  category,
  map,
  boss,
}: FetchEncountersDataProps) {
  if (!boss) return { data: null };

  try {
    const data = await import(
      `@exile-watch/encounter-data/dist/extracted-data/${directory}/${category}/${map}.mjs`
    );
    const activeEncounterAbilities = data?.default.encounters.find(
      (e: BossType) => kebabCase(e.name) === boss,
    ).abilities;

    return {
      data: data?.default as MapType,
      isMap: Boolean(data?.default.map),
      activeEncounterAbilities,
    };
  } catch (e) {
    return { data: null };
  }
}

export { fetchEncounterData };
