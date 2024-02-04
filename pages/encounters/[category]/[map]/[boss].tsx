import React, { useEffect, useState } from 'react';
import { kebabCase } from 'lodash';
import { useRouter } from 'next/router';

import { Layout } from '#design-system/components';
import BossContainer from '#features/encounters/components/Boss/BossContainer';
import Map from '#features/encounters/components/Map/Map';
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
    setIsLoading(true);
    import(`../../../../../features/encounters/extracted-data/${category}/${map}.json`)
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

        const bossMatchedWithUrl = !!boss
          ? kebabCase(bossName) === boss
          : kebabCase(bossName) === map;
        return bossMatchedWithUrl && setActiveBossAbilities(abilities);
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
