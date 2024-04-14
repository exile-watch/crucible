import cx from "classnames";

import EncounterAbility from "#features/encounters/Encounter/_components/EncounterAbility/EncounterAbility";

import type { BossAbilityType } from "@exile-watch/encounter-data";
import styles from "./EncounterContainer.module.scss";

type EncounterContainerProps = {
  activeEncounterAbilities?: BossAbilityType[];
};

const EncounterContainer = ({
  activeEncounterAbilities,
}: EncounterContainerProps) => {
  return (
    <div className={cx("pl-3 ml-3", styles.abilitiesWrapper)}>
      <div className={styles.abilities}>
        {activeEncounterAbilities?.map((props, i) => (
          <EncounterAbility
            {...props}
            isEven={i % 2 === 1}
            key={`bossAbilities_${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EncounterContainer;
