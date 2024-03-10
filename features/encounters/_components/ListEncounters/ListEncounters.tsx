import type { EncountersIndexPageType } from "@exile-watch/encounter-data";
import { SimpleGrid } from "@exile-watch/writ-react";
import React, { useEffect, useState } from "react";
import { ErrorBoundary, HomepageCard } from "#components";

const ListEncounters = () => {
  const [data, setData] = useState<EncountersIndexPageType | null>(null);

  useEffect(() => {
    import(
      "@exile-watch/encounter-data/dist/extracted-data/encounters.esm" as string
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
