import React from 'react';
import {IndexedSearchResultsBossProps} from "#types";
import Link from 'next/link';
import styles from './Results.module.scss'
import cn from "classnames";
import Badge from "#components/Badge/Badge";

type ResultProps = {
  onClick: () => any;
} & IndexedSearchResultsBossProps

const Result = ({mapPath, mapName, bossPath, bossName, abilityPath, abilityName, onClick}: ResultProps) => {
  const isMap = !bossPath && !abilityPath;
  const isBoss = bossPath && !abilityPath;

  if (isMap) {
    return (
      <Link href={mapPath}>
        <a className={cn('px-2 py-1', styles.result)} onClick={onClick}>
          {mapName}
          <Badge>map</Badge>
        </a>
      </Link>
    )
  }

  if(isBoss) {
    return (
      <Link href={bossPath}>
        <a className={cn('px-2 py-1', styles.result)} onClick={onClick}>
          <div className={styles.labelWrapper}>
            <span>{bossName}</span>
            {mapName && <span className={styles.sublabel}><i>{mapName}</i></span>}
          </div>
          <Badge>boss</Badge>
        </a>
      </Link>
    )
  }

  return (
    <Link href={abilityPath}>
      <a className={cn('px-2 py-1', styles.result)} onClick={onClick}>
        <div className={styles.labelWrapper}>
          <span className={styles.label}>{abilityName}</span>
          <span className={styles.sublabel}><i>{bossName}{mapName && ` - ${mapName}`}</i></span>
        </div>
        <Badge>ability</Badge>
      </a>
    </Link>
  )
};

export default Result;