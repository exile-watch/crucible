import React, { ReactNode } from 'react';

import InputGroupAppend, { InputGroupAppendProps } from './InputGroupAppend/InputGroupAppend';
import InputGroupPrepend, { InputGroupPrependProps } from './InputGroupPrepend/InputGroupPrepend';

import styles from './InputGroup.module.scss';

type InputGroupComposition = {
  Prepend?: InputGroupPrependProps;
  Append?: InputGroupAppendProps;
};

export type InputGroupProps = {
  children?: ReactNode;
} & InputGroupComposition;

const InputGroup = ({ children, ...props }: InputGroupProps) => (
  <div className={styles.inputGroup} {...props}>
    {children}
  </div>
);

InputGroup.Prepend = InputGroupPrepend;
InputGroup.Append = InputGroupAppend;

export default InputGroup;
