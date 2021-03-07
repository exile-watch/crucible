import React from 'react';
import cx from 'classnames';

import styles from './Overlays.module.scss';

type AbilityTipProps = {
  tip: string[];
};

const AbilityTip = ({ tip }: AbilityTipProps) => (
  <div className={cx('py-2 px-3', styles.tip)}>
    {tip?.map((t, i) => (
      <p key={`bossTip_${t}_${i}`}>{t}</p>
    ))}
  </div>
);

export default AbilityTip;
