import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';

import useRouter from '#hooks/useRouter';
import { PureBossAbilityType } from '#types';

import { AbilityName, AbilityTip, AboutAbility } from './Details/index';
import Video from './Video/Video';

import styles from './BossAbility.module.scss';

const BossAbility = ({ name, about, gif, tip }: PureBossAbilityType) => {
  const { query, pathname } = useRouter();
  const activeAbilityRef = useRef<HTMLDivElement>(null);
  const isActive = query.ability === kebabCase(name);
  const activeClassname = isActive ? styles.activeAbility : query.ability && styles.inactiveAbility;
  const redirect = {
    pathname,
    query: {
      ...query,
      ability: isActive ? undefined : kebabCase(name),
    },
  };

  useEffect(() => {
    if (activeAbilityRef.current)
      activeAbilityRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isActive]);

  return (
    <Link href={redirect} legacyBehavior>
      <div
        className={cx('mx-5', styles.ability, activeClassname)}
        ref={isActive ? activeAbilityRef : null}
      >
        <Video isActive={isActive} src={gif} abilityName={name} />
        <div className={styles.details}>
          <AbilityName name={name} />
          {about && <AboutAbility about={about} abilityName={name} />}
          <AbilityTip tip={tip} />
        </div>
      </div>
    </Link>
  );
};

export default BossAbility;
