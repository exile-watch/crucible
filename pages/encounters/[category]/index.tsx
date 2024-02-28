import React, {useEffect, useState} from 'react';
import { startCase } from 'lodash';
import {SimpleCard, HomepageCard, Layout} from "#components";
import {useRouter} from "next/router";
import {SimpleGrid} from "@mantine/core";

const Categories = () => {
  const { query: {category} } = useRouter();
  const [data, setData] = useState(null)

  useEffect(() => {
    import(`@exile-watch/encounter-data/dist/extracted-data/${category}.esm` as string)
      .then((d) => {
        setData(d.default);
      })
      .catch(() => {
        setData(null);
      });
  }, [category]);

  const isCommonMaps = category === 'common-maps';

  return (
    <Layout title={startCase(category)}>
      <SimpleGrid cols={{xxxl: 6, xxl: 5, xl: 4, lg: 3, md: 2, sm: 2, xs: 1}} mb="md">
        {isCommonMaps && data?.map(data => <SimpleCard key={data.path} {...data} />)}
        {!isCommonMaps && data?.map(data => <HomepageCard key={data.path} {...data} isCategory={false} />)}
      </SimpleGrid>
    </Layout>
  );
};

export default Categories;
