import React, { ReactNode } from 'react';
import cx from 'classnames';

import { ErrorIcon, InfoIcon, WarningIcon } from '#assets/icons';

import styles from './Message.module.scss';

type MessageProps = {
  type: 'info' | 'success' | 'warning' | 'error';
  children: ReactNode;
  className?: string;
};

const Icon = ({ type, ...props }: any) => {
  switch (type) {
    case 'error':
      return <ErrorIcon {...props} />;
    case 'warning':
      return <WarningIcon {...props} />;
    default:
      return <InfoIcon {...props} />;
  }
};

const Message = ({ type, children, className }: MessageProps) => (
  <div className={cx('p-3', styles.container, styles[type], className)}>
    <Icon type={type} className="mr-3" />
    <p>{children}</p>
  </div>
);

export default Message;
