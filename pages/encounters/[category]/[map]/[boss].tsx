import React, { useEffect, useState } from 'react';
import { kebabCase } from 'lodash';
import { useRouter } from 'next/router';

import BossContainer from '#components/encounters/Boss/BossContainer';
import Map from '#components/encounters/Map/Map';
import Layout from '#components/Layout/Layout';
import { BossAbilityWithNameType, DataType } from '#types';

const Boss = () => {
  const [data, setData] = useState<DataType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeBossAbilities, setActiveBossAbilities] = useState<BossAbilityWithNameType[] | null>(
    null
  );
  const {
    query: { category, map, boss },
  } = useRouter();

  useEffect(() => {
    import(`../../../../extracted-data/encounters/${category}/${map}.json`)
      .then((d) => {
        setData(d.default);
        setIsLoading(false);
      })
      .catch(() => {
        setData(null);
        setIsLoading(false);
      });
  }, [map]);

  useEffect(() => {
    if (data) {
      data?.bosses?.find((b) => {
        const [[bossName, bossProps]] = Object.entries(b);
        const abilities: any = bossProps.abilities?.reduce((acc, v) => {
          const [[abilityName, abilities]]: any = Object.entries(v);
          return acc.concat({
            ...abilities,
            name: abilityName,
          });
        }, []);

        return kebabCase(bossName) === boss && setActiveBossAbilities(abilities);
      });
    }
  }, [data, boss]);

  return (
    <Layout>
      <Map isLoading={isLoading} data={data}>
        {activeBossAbilities && <BossContainer abilities={activeBossAbilities} />}
      </Map>
    </Layout>
  );
};

export default Boss;
