import React from 'react';

import DetailRow from './DetailRow';

type AbilityTipProps = {
  tip: string[];
};

const AbilityTip = ({ tip }: AbilityTipProps) => (
  <DetailRow label="What to do">
    {tip?.map((t, i) => (
      <p key={`bossTip_${t}_${i}`}>{t}</p>
    ))}
  </DetailRow>
);

export default AbilityTip;
