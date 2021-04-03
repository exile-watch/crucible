import React from 'react';

import DetailRow from './DetailRow';

import styles from './Details.module.scss';
type AbilityNameProps = {
  name?: string;
};

const AbilityName = ({ name }: AbilityNameProps) => (
  <DetailRow label="Ability" withBottomMargin>
    <p className={styles.abilityName}>{name}</p>
  </DetailRow>
);

export default AbilityName;
