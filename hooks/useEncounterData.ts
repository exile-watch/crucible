import { kebabCase } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BossAbilityWithNameType, DataType } from "#types";

function useEncounterData() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType>(null);
  const [activeBossAbilities, setActiveBossAbilities] = useState<
    BossAbilityWithNameType[] | null
  >(null);
  const {
    query: { category, map, boss },
  } = useRouter();
  const heading = category === "common-maps" ? map : category;
  const subheading = category !== "common-maps" && data?.map;
  const isMap = !!data?.map;

  useEffect(() => {
    setIsLoading(true);
    import(
      `@exile-watch/encounter-data/dist/extracted-data/${category}/${map}.esm`
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

    data?.bosses?.find((b) => {
      const [[bossName, bossProps]] = Object.entries(b);
      const abilities: any = bossProps.abilities?.reduce((acc, v) => {
        const [[abilityName, abilities]]: any = Object.entries(v);
        return acc.concat({
          ...abilities,
          name: abilityName,
        });
      }, []);

      const bossMatchedWithUrl = !!boss
        ? kebabCase(bossName) === boss
        : kebabCase(bossName) === map;
      return bossMatchedWithUrl && setActiveBossAbilities(abilities);
    });
  }, [data, boss]);

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

export { useEncounterData };
