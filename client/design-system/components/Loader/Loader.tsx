import React from 'react';
import cx from 'classnames';

import styles from './Loader.module.scss';

export type LoaderProps = {
  className?: string;
  size?: number;
  thickness?: number;
};

const Loader = ({ className, size = 30, thickness = 3 }: LoaderProps) => (
  <div
    className={cx(className, styles.loader)}
    style={{ width: size, height: size, borderWidth: thickness }}
  />
);

export default Loader;
