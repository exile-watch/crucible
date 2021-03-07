import React from 'react';
import cx from 'classnames';
import { kebabCase } from 'lodash';
import Link from 'next/link';

import Heading from '#components/Heading/Heading';
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
        const isActive = kebabCase(bossName) === queryBoss;

        return (
          <Heading as="h2" key={`mapBossesHeading_${bossName}`}>
            <Link href={`/${category}/${map}/${kebabCase(bossName)}`}>
              <a className={cx(isActive ? styles.active : undefined, styles.link)}>{bossName}</a>
            </Link>
          </Heading>
        );
      })}
    </div>
  );
};

export default MapBossesHeading;
