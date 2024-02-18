import React from 'react';

import DetailRow from './DetailRow';
import {Text} from "@mantine/core";

type AbilityTipProps = {
  tip: string[];
};

const AbilityTip = ({ tip }: AbilityTipProps) => (
  <DetailRow label="What to do">
    {tip?.map((t, i) => (
      <Text c="sand.2" key={`bossTip_${t}_${i}`}>{t}</Text>
    ))}
  </DetailRow>
);

export default AbilityTip;
