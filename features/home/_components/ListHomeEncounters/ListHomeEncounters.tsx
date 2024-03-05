import { HomepageType } from "@exile-watch/encounter-data";
import { SimpleGrid, Stack, Title } from "@exile-watch/writ-react";
import React, { useEffect, useState } from "react";
import { HomepageCard } from "#components";

const ListHomeEncounters = () => {
  const [data, setData] = useState<HomepageType | null>(null);

  useEffect(() => {
    import(
      "@exile-watch/encounter-data/dist/extracted-data/homepage.esm" as string
    )
      .then((d) => {
        setData(d.default);
      })
      .catch(() => {
        setData(null);
      });
  }, []);

  if (!data) return null;

  return (
    <Stack>
      <SimpleGrid cols={{ xxxl: 6, xxl: 5, xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }}>
        {data?.main.map((data) => (
          <HomepageCard key={data.path} {...data} isCategory={false} />
        ))}
      </SimpleGrid>

      <Title mt="xl" order={2}>
        Explore more encounters
      </Title>
      <SimpleGrid
        cols={{ xxxl: 6, xxl: 5, xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }}
        mb="md"
      >
        <HomepageCard {...data?.breachlords} />
        <HomepageCard {...data?.["common-maps"]} />
        <HomepageCard {...data?.conquerors} />
        <HomepageCard {...data?.["elder-guardians"]} />
        <HomepageCard {...data?.["shaper-guardians"]} />
      </SimpleGrid>
    </Stack>
  );
};

export default ListHomeEncounters;
