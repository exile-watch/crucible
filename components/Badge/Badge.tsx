import React, {ReactNode} from 'react';
import cx from "classnames";
import styles from './Badge.module.scss';

type BadgeProps = {
  children: ReactNode;
  onClick?: () => any;
  className?: string;
}

const Badge = ({children, className, onClick}: BadgeProps) => {
  return (
    <div className={cx('px-1', className, styles.badge)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Badge;