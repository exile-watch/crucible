import React from 'react';
import cx from "classnames";
import styles from "./Overlays.module.scss";

type BossTipProps = {
  tip: string[]
}

const BossTip = ({tip}: BossTipProps) => (
  <div className={cx('py-2 px-3', styles.tip)}>
    {tip.map(t => (
      <p>{t}</p>
    ))}
  </div>
);

export default BossTip;