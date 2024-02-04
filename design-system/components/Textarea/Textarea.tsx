import React, { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

import styles from './Textarea.module.scss';

export type TextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const Textarea = (props: TextareaProps) => <textarea className={styles.textarea} {...props} />;

export default Textarea;
