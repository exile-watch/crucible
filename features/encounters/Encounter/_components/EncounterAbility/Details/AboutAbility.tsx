import React from "react";

import DetailRow from "./DetailRow";

import { Text } from "@exile-watch/writ-react";

type AboutAbilityProps = {
  about: string[];
  abilityName?: string;
  isEven?: boolean;
};

const AboutAbility = ({ about, abilityName }: AboutAbilityProps) => {
  return (
    <DetailRow label="About" withBottomMargin>
      {about.map((about) =>
        about.length === 0 ? (
          // <MissingContent
          //   abilityName={abilityName}
          //   missingContentType="About"
          //   className={styles.missingContent}
          //   key={`bossAboutAbility_${i}`}
          //   isEven={isEven}
          // />
          <Text c="dimmed" key={abilityName}>
            This section has no data yet
          </Text>
        ) : (
          <Text c="sand.2" key={abilityName}>
            {about}
          </Text>
        ),
      )}
    </DetailRow>
  );
};

export default AboutAbility;
