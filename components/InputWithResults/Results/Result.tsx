import React from 'react';
import cx from 'classnames';
import Link from 'next/link';

import Badge from '#components/Badge/Badge';
import { IndexedSearchResultsBossProps } from '#types';

import styles from './Results.module.scss';

type ResultProps = {
  onClick: () => any;
} & IndexedSearchResultsBossProps;

const Result = ({
  mapPath,
  mapName,
  bossPath,
  bossName,
  abilityPath,
  abilityName,
  onClick,
}: ResultProps) => {
  const isMap = !bossPath && !abilityPath;
  const isBoss = bossPath && !abilityPath;

  if (isMap) {
    return (
      <Link href={mapPath}>
        <button className={cx('px-2 py-1', styles.result)} onClick={onClick}>
          {mapName}
          <Badge>map</Badge>
        </button>
      </Link>
    );
  }

  if (isBoss) {
    return (
      <Link href={bossPath}>
        <button className={cx('px-2 py-1', styles.result)} onClick={onClick}>
          <div className={styles.labelWrapper}>
            <span>{bossName}</span>
            {mapName && (
              <span className={styles.sublabel}>
                <i>{mapName}</i>
              </span>
            )}
          </div>
          <Badge>boss</Badge>
        </button>
      </Link>
    );
  }

  return (
    <Link href={abilityPath}>
      <button className={cx('px-2 py-1', styles.result)} onClick={onClick}>
        <div className={styles.labelWrapper}>
          <span className={styles.label}>{abilityName}</span>
          <span className={styles.sublabel}>
            <i>
              {bossName}
              {mapName && ` - ${mapName}`}
            </i>
          </span>
        </div>
        <Badge>ability</Badge>
      </button>
    </Link>
  );
};

export default Result;
