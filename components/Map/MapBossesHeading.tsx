import React from 'react';
import styles from "./Map.module.scss";
import Heading from "#components/Heading/Heading";
import Link from "next/link";
import {kebabCase} from "lodash";
import useRouter from "#hooks/useRouter";
import cx from "classnames";
import {MapType} from "#types";

type MapBossesHeadingProps = {
  data: MapType
}

const MapBossesHeading = ({data}: MapBossesHeadingProps) => {
  const { query: { category, map, boss: queryBoss } } = useRouter()

  return (
    <div className={cx('', styles.bosses)}>
      {data?.bosses?.map(boss => {
        const [bossName] = Object.keys(boss);
        const isActive = kebabCase(bossName) === queryBoss;

        return (
          <Heading as="h2">
            <Link href={`/${category}/${map}/${kebabCase(bossName)}`}>
              <a className={cx(isActive ? styles.active : undefined, styles.link)}>{bossName}</a>
            </Link>
          </Heading>
        )
      })}
    </div>
  );
}

export default MapBossesHeading;