import React, { useEffect, useState } from 'react';
import { kebabCase } from 'lodash';

import BossContainer from '#components/Boss/BossContainer';
import Layout from '#components/Layout/Layout';
import Map from '#components/Map/Map';
import useImportDataOnLoad from '#hooks/useImportDataOnLoad';
import useRouter from '#hooks/useRouter';
import { BossAbilityWithNameType } from '#types';

const Boss = () => {
  // @ts-ignore
  const { isLoading, data } = useImportDataOnLoad({ module: 'encounters' });
  const [activeBossAbilities, setActiveBossAbilities] = useState<BossAbilityWithNameType[] | null>(
    null
  );
  const { query } = useRouter();

  useEffect(() => {
    if (data) {
      data?.bosses?.find((boss) => {
        const [[bossName, bossProps]] = Object.entries(boss);
        const abilities: any = bossProps.abilities?.reduce((acc, v) => {
          const [[abilityName, abilities]]: any = Object.entries(v);
          return acc.concat({
            ...abilities,
            name: abilityName,
          });
        }, []);

        return kebabCase(bossName) === query.boss && setActiveBossAbilities(abilities);
      });
    }
  }, [data, query.boss]);

  return (
    <Layout>
      <Map>{activeBossAbilities && <BossContainer abilities={activeBossAbilities} />}</Map>
    </Layout>
  );
};

export default Boss;
