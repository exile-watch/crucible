import React, {useEffect, useState} from 'react';

import {HomepageCard, Layout} from '#components';
import {SimpleGrid} from "@exile-watch/writ-react";

const Encounters = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    import(`@exile-watch/encounter-data/dist/extracted-data/encounters.esm` as string)
      .then((d) => {
        setData(d.default);
      })
      .catch(() => {
        setData([]);
      });
  }, []);

  return (
    <Layout title="Encounters">
      <SimpleGrid cols={{xxxl: 6, xxl: 5, xl: 4, lg: 3, md: 2, sm: 2, xs: 1}} mb="md">
        {Object.entries(data)?.map(([_, data]) => {
          return <HomepageCard key={data.path} {...data} isCategory />
        })}
      </SimpleGrid>
    </Layout>
  )
};

export default Encounters;
