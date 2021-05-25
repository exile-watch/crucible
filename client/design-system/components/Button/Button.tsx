import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

export type ButtonProps = {
  size?: 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Disabled state overrides styles from other states */
  disabled?: boolean;
  inactive?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = ({
  children,
  size = 'medium',
  className,
  variant = 'primary',
  disabled = false,
  inactive = false,
  ...props
}: ButtonProps) => (
  <button
    className={cx(
      'transition-style-scope px-3 py-1',
      styles.button,
      styles[size],
      styles[variant],
      className,
      {
        [styles.disabled]: disabled,
        [styles.inactive]: inactive,
      }
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
