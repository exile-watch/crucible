import React from 'react';

import { MissingContent } from '@exile-watch/writ-react';

import DetailRow from './DetailRow';

import styles from './Details.module.scss';

type AboutAbilityProps = {
  about: string[];
  abilityName?: string;
};

const AboutAbility = ({ about, abilityName }: AboutAbilityProps) => {
  return (
    <DetailRow label="About" withBottomMargin>
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
    </DetailRow>
  );
};

export default AboutAbility;
