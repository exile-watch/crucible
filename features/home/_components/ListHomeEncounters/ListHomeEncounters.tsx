import type { HomepageType } from "@exile-watch/encounter-data";
import { SimpleGrid, Stack, Title } from "@exile-watch/writ-react";
import React from "react";
import { HomepageCard } from "#components";

type ListHomeEncountersProps = {
  data: HomepageType;
};

const ListHomeEncounters = ({ data }: ListHomeEncountersProps) => {
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
