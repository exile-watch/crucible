import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './Card.module.scss';

export type CardProps = {
  as: 'div' | 'section';
  children: ReactNode;
  className?: string;
  style?: any;
  /** Whether the Card is visible in all build variations or not */
  locked?: boolean;
};

const Card = ({ children, as: T = 'div', className, style, locked = false }: CardProps) => (
  <T className={cx('p-3', styles.card, locked && styles.locked, className)} style={style}>
    {children}
  </T>
);

export default Card;
