import cx from "classnames";

import BossAbility from "#features/encounters/components/Boss/BossAbility/BossAbility";
import { useEncounterData } from "#hooks/useEncounterData";
import styles from "./BossContainer.module.scss";

const BossContainer = () => {
  const { activeBossAbilities } = useEncounterData();

  if (!activeBossAbilities) return null;

  return (
    <div className={cx("my-3", styles.bossContainer)}>
      <div className={cx("pl-3 ml-3", styles.abilitiesWrapper)}>
        <div className={styles.abilities}>
          {activeBossAbilities?.map((props, i) => (
            <BossAbility
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

export default BossContainer;
