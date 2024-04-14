import type { MapType } from "@exile-watch/encounter-data";

type FetchEncountersMapDataProps = {
  directory: string;
  category: string;
  map: string;
};

async function fetchEncountersMapData({
  directory,
  category,
  map,
}: FetchEncountersMapDataProps): Promise<MapType | null> {
  try {
    const data = await import(
      `@exile-watch/encounter-data/dist/extracted-data/${directory}/${category}/${map}.mjs`
    );
    return data?.default;
  } catch (e) {
    return null;
  }
}

export { fetchEncountersMapData };
