import cx from "classnames";

import EncounterAbility from "#features/encounters/Encounter/_components/EncounterAbility/EncounterAbility";
import { useEncounterData } from "#hooks/useEncounterData";

import styles from "./EncounterContainer.module.scss";

const EncounterContainer = () => {
  const { activeBossAbilities } = useEncounterData();

  return (
    <div className={cx("my-3", styles.bossContainer)}>
      <div className={cx("pl-3 ml-3", styles.abilitiesWrapper)}>
        <div className={styles.abilities}>
          {activeBossAbilities?.map((props, i) => (
            <EncounterAbility
              {...props}
              isEven={i % 2 === 1}
              key={`bossAbilities_${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EncounterContainer;
