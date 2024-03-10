import { Title } from "@exile-watch/writ-react";
import cx from "classnames";
import { kebabCase } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEncounterData } from "#hooks/useEncounterData";
import styles from "./ListEncountersHeading.module.scss";

const ListEncountersHeading = () => {
  const {
    query: { category, map, boss: queryBoss },
  } = useRouter();

  const { data, isMap } = useEncounterData();

  return (
    <div className={styles.bosses}>
      {data?.bosses?.map(({ name: encounterName }) => {
        const kebabCasedEncounterName = kebabCase(encounterName);
        const isActive = isMap
          ? kebabCasedEncounterName === queryBoss
          : kebabCasedEncounterName === map;
        const redirect = isMap
          ? `/encounters/${category}/${map}/${kebabCasedEncounterName}`
          : `/encounters/${category}/${kebabCasedEncounterName}`;

        return (
          <Title order={2} key={`mapBossesHeading_${encounterName}`}>
            <Link
              href={redirect}
              className={cx(isActive ? styles.active : undefined, styles.link)}
            >
              {encounterName}
            </Link>
          </Title>
        );
      })}
    </div>
  );
};

export default ListEncountersHeading;
