import { CategoryPageType } from "@exile-watch/encounter-data";
import { SimpleGrid } from "@exile-watch/writ-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HomepageCard, SimpleCard } from "#components";

const ListEncounterCategories = () => {
  const {
    query: { category },
  } = useRouter();
  const [data, setData] = useState<CategoryPageType | null>(null);

  useEffect(() => {
    import(
      `@exile-watch/encounter-data/dist/extracted-data/${category}.esm` as string
    )
      .then((d) => {
        setData(d.default);
      })
      .catch(() => {
        setData(null);
      });
  }, [category]);

  const isCommonMaps = category === "common-maps";

  return (
    <SimpleGrid
      cols={{ xxxl: 6, xxl: 5, xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }}
      mb="md"
    >
      {isCommonMaps &&
        data?.map((data) => <SimpleCard key={data.path} {...data} />)}
      {!isCommonMaps &&
        data?.map((data) => (
          <HomepageCard key={data.path} {...data} isCategory={false} />
        ))}
    </SimpleGrid>
  );
};

export default ListEncounterCategories;
