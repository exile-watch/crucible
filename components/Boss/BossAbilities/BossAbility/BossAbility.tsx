import React, {useEffect, useRef} from 'react';
import cx from "classnames";
import { AbilityName, AboutAbility, Tip } from "./Overlays";
import Video from "./Video/Video";
import styles from './BossAbility.module.scss';
import {PureBossAbilityType} from "#types";
import useRouter from "#hooks/useRouter";
import kebabCase from 'lodash/kebabCase'

const BossAbility = ({name, about, gif, tip}: PureBossAbilityType) => {
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
        <Tip tip={tip} />
      </div>
    </div>
  );
}

export default BossAbility;