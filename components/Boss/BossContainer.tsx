import styles from './BossContainer.module.scss';
import cx from "classnames";
import BossAbilities from "./BossAbilities/BossAbilities";
import {BossAbilityWithNameType} from "#types";

type BossContainerProps = {
  abilities: BossAbilityWithNameType[];
}

const BossContainer = ({abilities}: BossContainerProps) => {
  return (
    <div className={cx("my-3", styles.bossContainer)}>
      {/*<div className={styles.phases}>*/}
      {/*  <div className={cx(styles.phase, styles.phaseWithTransition, styles.previouslyActive)}>*/}
      {/*    <p>P1</p>*/}
      {/*  </div>*/}
      {/*  <div className={cx('px-2', styles.transition, styles.active)}><p>transition</p></div>*/}
      {/*  <div className={styles.phase}>*/}
      {/*    <p>P2</p>*/}
      {/*  </div>*/}
      {/*  <div className={styles.phase}>*/}
      {/*    <p>P3</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <BossAbilities abilities={abilities} />
    </div>
  );
}

export default BossContainer;