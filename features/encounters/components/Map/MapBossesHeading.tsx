import React from 'react';
import cx from 'classnames';
import { kebabCase } from 'lodash';
import Link from 'next/link';

import { Heading } from '@exile-watch/writ-react';
import useRouter from '#hooks/useRouter';
import { MapType } from '#types';

import styles from './Map.module.scss';

type MapBossesHeadingProps = {
  data: MapType;
};

const MapBossesHeading = ({ data }: MapBossesHeadingProps) => {
  const {
    query: { category, map, boss: queryBoss },
  } = useRouter();

  return (
    <div className={cx('', styles.bosses)}>
      {data?.bosses?.map((boss) => {
        const [bossName] = Object.keys(boss);
        const isMap = !!data.map;
        const isActive = isMap ? kebabCase(bossName) === queryBoss : kebabCase(bossName) === map;
        const redirect = isMap
          ? `/encounters/${category}/${map}/${kebabCase(bossName)}`
          : `/encounters/${category}/${kebabCase(bossName)}`;

        return (
          <Heading as="h2" key={`mapBossesHeading_${bossName}`}>
            <Link href={redirect} legacyBehavior>
              <a className={cx(isActive ? styles.active : undefined, styles.link)}>{bossName}</a>
            </Link>
          </Heading>
        );
      })}
    </div>
  );
};

export default MapBossesHeading;
