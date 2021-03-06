import React, {useEffect, useState} from 'react';
import useImportDataOnLoad from "#hooks/useImportDataOnLoad";
import Layout from "#components/Layout/Layout";
import { kebabCase } from 'lodash';
import useRouter from "#hooks/useRouter";
import Map from '#components/Map/Map'
import BossContainer from "#components/Boss/BossContainer";
import {BossAbilityWithNameType} from "#types";

const Boss = () => {
  // @ts-ignore
  const {isLoading, data} = useImportDataOnLoad()
  const [activeBossAbilities, setActiveBossAbilities] = useState<BossAbilityWithNameType[] | null>(null);
  const { query } = useRouter()

  useEffect(() => {
    if(data) {
      data?.bosses?.find(boss => {
        const [[bossName, bossProps]] = Object.entries(boss);
        const abilities: any = bossProps.abilities?.reduce((acc, v) => {
          const [[abilityName, abilities]]: any = Object.entries(v);
            return acc.concat({
              ...abilities,
              name: abilityName
            })
          }, [])

        return kebabCase(bossName) === query.boss && setActiveBossAbilities(abilities)
      })
    }
  }, [data, query.boss])

  return (
    <Layout>
      <Map>
        {activeBossAbilities && <BossContainer abilities={activeBossAbilities} />}
      </Map>
    </Layout>
  );
};

export default Boss;