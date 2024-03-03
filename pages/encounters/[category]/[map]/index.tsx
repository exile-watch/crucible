import React, { useEffect, useState } from "react";

import { SimpleGrid } from "@exile-watch/writ-react";
import { kebabCase, startCase } from "lodash";
import { useRouter } from "next/router";
import { HomepageCard, Layout } from "#components";
import Boss from "./[boss]";

const Map = () => {
  const {
    query: { category, map },
    asPath,
  } = useRouter();
  const [data, setData] = useState(null);
  const {
    query: { boss },
  } = useRouter();

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

  if (category !== "common-maps") return <Boss />;

  return (
    <Layout title={startCase(map)}>
      <SimpleGrid cols={{ xxxl: 6, xxl: 5, xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }}>
        {data?.bosses.map((data) => {
          const [encounterName] = Object.keys(data);
          const [abilities] = Object.values(data);
          const [ability] = Object.values(abilities.abilities.pop());
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
    </Layout>
  );
};

export default Map;
