import React, {ReactNode} from 'react';
import cn from "classnames";
import styles from './Badge.module.scss';

type BadgeProps = {
  children: ReactNode;
  onClick?: () => any;
  className?: string;
}

const Badge = ({children, className, onClick}: BadgeProps) => {
  return (
    <div className={cn('px-1', className, styles.badge)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Badge;