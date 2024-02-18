import cx from 'classnames';

import { BossAbilityWithNameType } from '#types';

import BossAbility from './BossAbility/BossAbility';

import styles from './BossAbilities.module.scss';

type BossAbilitiesProps = {
  abilities?: BossAbilityWithNameType[];
};

const BossAbilities = ({ abilities }: BossAbilitiesProps) => {
  return (
    <div className={cx('pl-3 ml-3', styles.abilitiesWrapper)}>
      <div className={styles.abilities}>
        {abilities?.map(({ name, about, tip, gif }, i) => (
          <BossAbility name={name} about={about} tip={tip} gif={gif} isEven={i%2 === 1} key={`bossAbilities_${i}`} />
        ))}
      </div>
    </div>
  );
};

export default BossAbilities;
