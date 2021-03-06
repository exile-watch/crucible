import React from 'react';
import cn from "classnames";
import styles from "#components/Map/Map.module.scss";
import Heading from "#components/Heading/Heading";
import Link from "next/link";
import {kebabCase} from "lodash";
import {useRouter} from "next/router";

const MapBossesHeading = ({data}) => {
  const { query: { category, map } } = useRouter()

  return (
    <div className={cn('', styles.bosses)}>
      {data?.bosses.map(boss => {
        const [bossName] = Object.keys(boss);

        return (
          <Heading as="h1">
            <Link href={`/${category}/${map}/${kebabCase(bossName)}`}>{bossName}</Link>
          </Heading>
        )
      })}
    </div>
  );
}

export default MapBossesHeading;