import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './Heading.module.scss';

export type HeadingProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  children: ReactNode;
  className?: string;
};

const Heading = ({ as: T, children, className, ...props }: HeadingProps) => {
  const fontSize = {
    [styles.h1]: T === 'h1',
    [styles.h2]: T === 'h2',
    [styles.h3]: T === 'h3',
    [styles.h4]: T === 'h4',
    [styles.h5]: T === 'h5',
  };

  return (
    <T className={cx(styles.heading, fontSize, className)} {...props}>
      {children}
    </T>
  );
};

Heading.defaultProps = {
  as: 'h3',
  children: null,
  className: null,
};

export default Heading;
