import React, {useEffect, useRef} from 'react';
import cx from "classnames";
import { AbilityName, AboutAbility, PlayerInteraction } from "./Overlays";
import Video from "./Video/Video";
import styles from './BossAbility.module.scss';
import {BossAbilityType} from "#types";
import {useRouter} from "next/router";
import kebabCase from 'lodash/kebabCase'

const BossAbility = ({name, about, gif, playerInteraction}: BossAbilityType) => {
  const { query } = useRouter();
  const activeAbilityRef = useRef<HTMLDivElement>(null)
  const isActive = query.ability === kebabCase(name);

  useEffect(() => {
    if(activeAbilityRef.current) activeAbilityRef.current.scrollIntoView({behavior: "smooth", block: 'center'})
  }, [isActive])

  return (
    <div className={cx(styles.abilityWrapper, isActive && styles.activeAbility)} ref={isActive ? activeAbilityRef : null}>
      <div className={cx('mx-5', styles.ability)}>
        <AbilityName name={name} />
        <Video isActive={isActive} src={gif} />
        <AboutAbility about={about} />
        <PlayerInteraction playerInteraction={playerInteraction} />
      </div>
    </div>
  );
}

export default BossAbility;