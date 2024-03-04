import cx from "classnames";

import { Title } from "@exile-watch/writ-react";
import { startCase } from "lodash";
import BossAbility from "#features/encounters/components/Boss/BossAbility/BossAbility";
import MapBossesHeading from "#features/encounters/components/Map/MapBossesHeading";
import { useEncounterData } from "#hooks/useEncounterData";
import styles from "./BossContainer.module.scss";

const BossContainer = () => {
  const { activeBossAbilities, heading, subheading } = useEncounterData();

  if (!activeBossAbilities) return null;

  return (
    <>
      <Title order={4} c="dimmed">
        {startCase(heading as string)} {subheading && `* ${subheading}`}
      </Title>

      <MapBossesHeading />

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
    </>
  );
};

export default BossContainer;
