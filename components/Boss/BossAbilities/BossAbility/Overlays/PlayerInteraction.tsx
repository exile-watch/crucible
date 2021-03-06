import React from 'react';
import cx from "classnames";
import styles from "./Overlays.module.scss";
import {BossAbilityType} from "#types";

type BossPlayerInteractionProps = {
  playerInteraction?: Pick<BossAbilityType, 'playerInteraction'>[]
}

const BossPlayerInteraction = ({playerInteraction}: BossPlayerInteractionProps) => (
  <div className={cx('py-2 px-3', styles.playerInteraction)}>
    {playerInteraction ? playerInteraction.map(pInteraction => (
      <p>{pInteraction}</p>
    )) : <p>Dodge</p>}
  </div>
);

export default BossPlayerInteraction;