import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import cx from 'classnames';

import styles from './Input.module.scss';

export type InputProps = {
  label?: string;
  size?: 'medium' | 'large';
  value: string | number;
  wrapperProps?: any;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

const Input = ({
  id,
  value,
  placeholder,
  label,
  className,
  size = 'medium',
  wrapperProps,
  ...props
}: InputProps) => {
  const isActive = value?.toString().length > 0;

  return (
    <div className={cx('theme-transition-scope', styles.inputWrapper)} {...wrapperProps}>
      <input
        value={value}
        placeholder={placeholder}
        className={cx(styles.input, styles[size], className)}
        {...props}
      />
      <label htmlFor={id} className={cx(styles.label, isActive && styles.isActive)}>
        {label}
      </label>
    </div>
  );
};

export default Input;
