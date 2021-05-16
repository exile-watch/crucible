import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './Card.module.scss';

type CardTypes = {
  as: 'div' | 'section';
  children: ReactNode;
  className?: string;
  style?: any;
};

const Card = ({ children, as: T = 'div', className, style }: CardTypes) => {
  return (
    <T className={cx('p-3', styles.card, className)} style={style}>
      {children}
    </T>
  );
};

export default Card;
