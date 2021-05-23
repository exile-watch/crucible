import React, { ReactNode } from 'react';
import cx from 'classnames';

import styles from '../InputGroup.module.scss';

export type InputGroupAppendProps = {
  disabled?: boolean;
  children: ReactNode;
};

const InputGroupAppend = ({ children, disabled = true, ...props }: InputGroupAppendProps) => (
  <div className={cx('p-1', styles.adfix, !disabled && styles.clickable)} {...props}>
    {children}
  </div>
);

export default InputGroupAppend;
