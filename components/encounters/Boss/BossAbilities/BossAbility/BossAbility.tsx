import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';

import useRouter from '#hooks/useRouter';
import { PureBossAbilityType } from '#types';

import { AbilityName, AbilityTip, AboutAbility } from './Overlays';
import Video from './Video/Video';

import styles from './BossAbility.module.scss';

const BossAbility = ({ name, about, gif, tip }: PureBossAbilityType) => {
  const { query, pathname } = useRouter();
  const activeAbilityRef = useRef<HTMLDivElement>(null);
  const isActive = query.ability === kebabCase(name);

  useEffect(() => {
    if (activeAbilityRef.current)
      activeAbilityRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isActive]);

  return (
    <div
      className={cx(
        styles.abilityWrapper,
        isActive ? styles.activeAbility : query.ability && styles.inactiveAbility
      )}
      ref={isActive ? activeAbilityRef : null}
    >
      <Link
        href={{
          pathname,
          query: {
            ...query,
            ability: isActive ? undefined : kebabCase(name),
          },
        }}
      >
        <div className={cx('mx-5', styles.ability)}>
          <AbilityName name={name} />
          <Video isActive={isActive} src={gif} abilityName={name} />
          <AboutAbility about={about} abilityName={name} />
          <AbilityTip tip={tip} />
        </div>
      </Link>
    </div>
  );
};

export default BossAbility;
