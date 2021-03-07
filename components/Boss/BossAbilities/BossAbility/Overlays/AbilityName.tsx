import React from 'react';
import cx from 'classnames';

import styles from './Overlays.module.scss';
type AbilityNameProps = {
  name?: string;
};

const AbilityName = ({ name }: AbilityNameProps) => (
  <p className={cx('py-2 px-3', styles.abilityName)}>{name}</p>
);

export default AbilityName;
