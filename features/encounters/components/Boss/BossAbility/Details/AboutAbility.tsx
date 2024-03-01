import React from 'react';

import { MissingContent } from '#components';

import DetailRow from './DetailRow';

import styles from './Details.module.scss';
import {Text} from "@exile-watch/writ-react";

type AboutAbilityProps = {
  about: string[];
  abilityName?: string;
  isEven?: boolean;
};

const AboutAbility = ({ about, abilityName, isEven }: AboutAbilityProps) => {
  return (
    <DetailRow label="About" withBottomMargin>
      {about.map((about, i) =>
        about.length === 0 ? (
          // <MissingContent
          //   abilityName={abilityName}
          //   missingContentType="About"
          //   className={styles.missingContent}
          //   key={`bossAboutAbility_${i}`}
          //   isEven={isEven}
          // />
          <Text c="dimmed" key={`bossAboutAbility_${i}`}>This section has no data yet</Text>
        ) : (
          <Text c="sand.2" key={`bossAboutAbility_${i}`}>{about}</Text>
        )
      )}
    </DetailRow>
  );
};

export default AboutAbility;
