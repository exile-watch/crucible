import React, { ReactNode } from 'react';
import cx from 'classnames';

import styles from '../InputGroup.module.scss';

export type InputGroupPrependProps = {
  children: ReactNode;
};

const InputGroupPrepend = ({ children, ...props }: InputGroupPrependProps) => (
  <div className={cx('p-1', styles.adfix)} {...props}>
    {children}
  </div>
);
export default InputGroupPrepend;
