import React, {useEffect, useRef, useState} from 'react';
import useImportDataOnLoad from "#hooks/useImportDataOnLoad";
import Layout from "#components/Layout/Layout";
import { kebabCase, startCase } from 'lodash';
import {useRouter} from "next/router";
import Map from '#components/Map/Map'
import BossContainer from "#components/Boss/BossContainer";

const Boss = () => {
  const {isLoading, data, pageTitle} = useImportDataOnLoad()
  const [activeBossAbilities, setActiveBossAbilities] = useState(null);
  const { query } = useRouter()

  useEffect(() => {
    if(data) {
      data.bosses.find(boss => {
        const [[bossName, bossProps]] = Object.entries(boss);
        const abilities = bossProps.abilities?.reduce((acc, v) => {
          const [[abilityName, abilities]] = Object.entries(v);
            return acc.concat({
              ...abilities,
              name: abilityName
            })
          }, [])
        console.log(abilities);
        return kebabCase(bossName) === query.boss && setActiveBossAbilities(abilities)
      })
    }
  }, [data, pageTitle, query.boss])

  return (
    <Layout title={pageTitle}>
      <Map>
        {activeBossAbilities && <BossContainer abilities={activeBossAbilities} />}
      </Map>
    </Layout>
  );
};

export default Boss;