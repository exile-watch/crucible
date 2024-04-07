import React from "react";

import { Text } from "@exile-watch/writ-react";
import DetailRow from "./DetailRow";

type AbilityTypeProps = {
  type: string[];
};

const AbilityType = ({ type }: AbilityTypeProps) => (
  <DetailRow label="Damage type">
    {type?.map((t, i) => (
      <Text c="sand.2" key={`bossTip_${t}_${i}`}>
        {t}
      </Text>
    ))}
  </DetailRow>
);

export default AbilityType;
