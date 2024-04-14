import type { EncountersIndexPageType } from "@exile-watch/encounter-data";
import { SimpleGrid } from "@exile-watch/writ-react";
import React from "react";
import { ErrorBoundary, HomepageCard } from "#components";

type ListEncountersProps = {
  data: EncountersIndexPageType;
};

const ListEncounters = ({ data }: ListEncountersProps) => {
  return (
    // ErrorBoundary mainly for testing env due to: @mantine/core: MantineProvider was not found in component tree
    <ErrorBoundary>
      <SimpleGrid
        cols={{ xxxl: 6, xxl: 5, xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }}
        mb="md"
      >
        {Object.entries(data)?.map(([_, data]) => {
          return <HomepageCard key={data.path} {...data} isCategory />;
        })}
      </SimpleGrid>
    </ErrorBoundary>
  );
};

export default ListEncounters;
