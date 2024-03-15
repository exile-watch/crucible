import { kebabCase } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { BossType, MapType } from "@exile-watch/encounter-data";

const MAP_WITHOUT_DIRECT_BOSS = [
  "cortex",
  "simulacrum",
  "the-alluring-abyss",
  "the-apex-of-sacrifice",
  "the-shapers-realm",
];

function useEncounterData() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<MapType | null>(null);
  const [activeBossAbilities, setActiveBossAbilities] = useState<
    BossType["abilities"] | null
  >(null);
  const {
    query: { directory, category, map, boss },
    push,
    asPath,
  } = useRouter();
  const heading = ["common-maps", "endgame-bosses"].includes(category as string)
    ? map
    : category;
  const subheading =
    !["common-maps", "endgame-bosses"].includes(category as string) &&
    data?.map;
  const isMap = !!data?.map;

  useEffect(() => {
    setIsLoading(true);
    import(
      `@exile-watch/encounter-data/dist/extracted-data/${directory}/${category}/${map}.esm`
    )
      .then((d) => {
        setData(d);
        setIsLoading(false);
      })
      .catch(() => {
        setData(null);
        setIsLoading(false);
      });
  }, [map]);

  useEffect(() => {
    if (!data) return;
    data?.bosses?.find(({ name, abilities: encounterAbilities }) => {
      if (!boss && MAP_WITHOUT_DIRECT_BOSS?.includes(map as string)) {
        void push(`${asPath}/${kebabCase(data.bosses[0].name)}`);
      }
      const bossMatchedWithUrl = !!boss
        ? kebabCase(name) === boss
        : kebabCase(name) === map;

      return bossMatchedWithUrl && setActiveBossAbilities(encounterAbilities);
    });
  }, [map, data, boss]);

  return {
    isLoading,
    data,
    heading,
    subheading,
    queryCategory: category,
    queryMap: map,
    queryBoss: boss,
    isMap,
    activeBossAbilities,
  };
}

export { useEncounterData, MAP_WITHOUT_DIRECT_BOSS };
