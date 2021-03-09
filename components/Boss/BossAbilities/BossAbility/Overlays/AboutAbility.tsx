import React from 'react';
import cx from 'classnames';

import MissingContent from '#components/MissingContent/MissingContent';

import styles from './Overlays.module.scss';

type AboutAbilityProps = {
  about: string[];
  abilityName?: string;
};

const AboutAbility = ({ about, abilityName }: AboutAbilityProps) => (
  <div className={cx('py-2 px-3', styles.aboutAbility)}>
    {about.map((about, i) =>
      about.length === 0 ? (
        <MissingContent
          abilityName={abilityName}
          missingContentType="About"
          className={styles.missingContent}
          key={`bossAboutAbility_${i}`}
        />
      ) : (
        <p key={`bossAboutAbility_${i}`}>{about}</p>
      )
    )}
  </div>
);

export default AboutAbility;
