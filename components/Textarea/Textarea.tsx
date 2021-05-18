import React, { ChangeEvent } from 'react';

import styles from './Textarea.module.scss';

type TextareaProps = {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  id: string;
  value: string | number;
  placeholder?: string;
};

const Textarea = ({ onChange, value, id, placeholder, ...props }: TextareaProps) => (
  <textarea id={id} className={styles.textarea} onChange={onChange} value={value} {...props} />
);

export default Textarea;
