import React from 'react';
import cx from 'classnames';

import styles from './Overlays.module.scss';

type AboutAbilityProps = {
  about: string[];
};

const AboutAbility = ({ about }: AboutAbilityProps) => (
  <div className={cx('py-2 px-3', styles.aboutAbility)}>
    {about.map((about, i) => (
      <p key={`bossAboutAbility_${i}`}>{about}</p>
    ))}
  </div>
);

export default AboutAbility;
