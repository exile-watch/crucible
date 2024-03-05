import { MapType } from "@exile-watch/encounter-data";
import { SimpleGrid } from "@exile-watch/writ-react";
import { kebabCase } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HomepageCard } from "#components";
import { EncounterPage } from "#features/pages";

const ListEncounterMap = () => {
  const {
    query: { category, map },
    asPath,
  } = useRouter();
  const [data, setData] = useState<MapType | null>(null);

  useEffect(() => {
    import(
      `@exile-watch/encounter-data/dist/extracted-data/${category}/${map}.esm` as string
    )
      .then((d) => {
        setData(d.default);
      })
      .catch(() => {
        setData(null);
      });
  }, [map]);

  if (!map) return null;

  if (category !== "common-maps") return <EncounterPage />;

  return (
    <SimpleGrid cols={{ xxxl: 6, xxl: 5, xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }}>
      {data?.bosses.map(({ name: encounterName, abilities }) => {
        const ability = abilities?.pop();
        const path = `${asPath}/${kebabCase(encounterName)}`;

        return (
          <HomepageCard
            key={path}
            name={encounterName}
            gif={ability?.gif}
            path={path}
            isCategory={false}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default ListEncounterMap;
