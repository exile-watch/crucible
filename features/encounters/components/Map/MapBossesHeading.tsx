import cx from "classnames";
import { kebabCase } from "lodash";
import Link from "next/link";
import React from "react";

import { Title } from "@exile-watch/writ-react";

import { useRouter } from "next/router";
import { useEncounterData } from "#hooks/useEncounterData";
import styles from "./Map.module.scss";

const MapBossesHeading = () => {
  const {
    query: { category, map, boss: queryBoss },
  } = useRouter();

  const { data, isMap } = useEncounterData();

  return (
    <div className={styles.bosses}>
      {data?.bosses?.map((boss) => {
        const [bossName] = Object.keys(boss);
        const kebabCasedEncounterName = kebabCase(bossName);
        const isActive = isMap
          ? kebabCasedEncounterName === queryBoss
          : kebabCasedEncounterName === map;
        const redirect = isMap
          ? `/encounters/${category}/${map}/${kebabCasedEncounterName}`
          : `/encounters/${category}/${kebabCasedEncounterName}`;

        return (
          <Title order={2} key={`mapBossesHeading_${bossName}`}>
            <Link
              href={redirect}
              className={cx(isActive ? styles.active : undefined, styles.link)}
            >
              {bossName}
            </Link>
          </Title>
        );
      })}
    </div>
  );
};

export default MapBossesHeading;
