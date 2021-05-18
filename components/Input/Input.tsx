import React, { ChangeEvent } from 'react';

import styles from './Input.module.scss';

type InputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value?: string | number;
  type?: string;
  checked?: boolean;
};

const Input = ({ onChange, value, id, ...props }: InputProps) => {
  return <input id={id} className={styles.input} onChange={onChange} value={value} {...props} />;
};

export default Input;
