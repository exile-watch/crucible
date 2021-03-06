import cx from "classnames";
import styles from "./BossAbilities.module.scss";
import BossAbility from "./BossAbility/BossAbility";
import {BossAbilityWithNameType} from "#types";

type BossAbilitiesProps = {
  abilities?: BossAbilityWithNameType[]
}

const BossAbilities = ({abilities}: BossAbilitiesProps) => {
  return (
    <div className={cx('pl-3 ml-3', styles.abilitiesWrapper)}>
      <div className={styles.abilities}>
        {abilities?.map(({name, about, tip, gif}) => (
          <BossAbility name={name} about={about} tip={tip} gif={gif}/>
        ))}
      </div>
    </div>
  );
}

export default BossAbilities;