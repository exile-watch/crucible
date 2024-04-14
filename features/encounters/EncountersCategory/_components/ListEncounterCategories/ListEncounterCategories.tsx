import type { CategoryPageType } from "@exile-watch/encounter-data";
import { SimpleGrid } from "@exile-watch/writ-react";
import { useRouter } from "next/router";
import { HomepageCard, SimpleCard } from "#components";

type ListEncounterCategoriesProps = {
  data: CategoryPageType;
};

const ListEncounterCategories = ({ data }: ListEncounterCategoriesProps) => {
  const {
    query: { category },
  } = useRouter();

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
