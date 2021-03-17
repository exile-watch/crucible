import cx from 'classnames';

import { BossAbilityWithNameType } from '#types';

import BossAbilities from './BossAbilities/BossAbilities';

import styles from './BossContainer.module.scss';

type BossContainerProps = {
  abilities: BossAbilityWithNameType[];
};

const BossContainer = ({ abilities }: BossContainerProps) => {
  return (
    <div className={cx('my-3', styles.bossContainer)}>
      <BossAbilities abilities={abilities} />
    </div>
  );
};

export default BossContainer;
