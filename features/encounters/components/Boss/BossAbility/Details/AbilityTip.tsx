import React from "react";

import { Text } from "@exile-watch/writ-react";
import DetailRow from "./DetailRow";

type AbilityTipProps = {
  tip: string[];
};

const AbilityTip = ({ tip }: AbilityTipProps) => (
  <DetailRow label="What to do">
    {tip?.map((t, i) => (
      <Text c="sand.2" key={`bossTip_${t}_${i}`}>
        {t}
      </Text>
    ))}
  </DetailRow>
);

export default AbilityTip;
