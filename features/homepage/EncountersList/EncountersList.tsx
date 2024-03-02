import {HomepageCard} from "#components";
import {SimpleGrid, Stack, Title} from "@exile-watch/writ-react";
import React, {useEffect, useState} from "react";

const EncountersList = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    import(`@exile-watch/encounter-data/dist/extracted-data/homepage.esm` as string)
      .then((d) => {
        setData(d.default);
      })
      .catch(() => {
        setData(null);
      });
  }, []);
  return (
    <Stack>
      <SimpleGrid cols={{xxxl: 6, xxl: 5, xl: 4, lg: 3, md: 2, sm: 2, xs: 1}}>
        {data?.main.map(data => <HomepageCard key={data.path} {...data} isCategory={false} />)}
      </SimpleGrid>

      <Title mt="xl" order={2}>Explore more encounters</Title>
      <SimpleGrid cols={{xxxl: 6, xxl: 5, xl: 4, lg: 3, md: 2, sm: 2, xs: 1}} mb="md">
        <HomepageCard name="Breachlords" {...data?.breachlords} />
        <HomepageCard name="Common maps" {...data?.['common-maps']} />
        <HomepageCard name="Conquerors" {...data?.conquerors} />
        <HomepageCard name="Elder Guardians" {...data?.['elder-guardians']} />
        <HomepageCard name="Shaper Guardians" {...data?.['shaper-guardians']} />
      </SimpleGrid>
    </Stack>

  );
};

export default EncountersList;