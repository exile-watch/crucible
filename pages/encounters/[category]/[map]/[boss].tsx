import React from "react";

import { Layout } from "#components";
import BossContainer from "#features/encounters/components/Boss/BossContainer";
import Map from "#features/encounters/components/Map/Map";

const Boss = () => {
  return (
    <Layout>
      <Map>
        <BossContainer />
      </Map>
    </Layout>
  );
};

export default Boss;
