import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({ onChange, value, id, ...props }: InputProps) => {
  return <input id={id} className={styles.input} onChange={onChange} value={value} {...props} />;
};

export default Input;
