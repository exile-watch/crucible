import React, { ReactNode } from 'react';
import cx from 'classnames';

import { ErrorIcon, InfoIcon, LockedIcon, WarningIcon } from '#assets/icons';

import styles from './Message.module.scss';

type MessageProps = {
  type: 'info' | 'locked' | 'success' | 'warning' | 'error';
  children: ReactNode;
  className?: string;
  size?: 'small' | 'medium';
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

const Message = ({ type, children, size = 'medium', className }: MessageProps) => (
  <div
    className={cx(styles.container, styles[type], className, {
      ...(size === 'small' && { 'p-1': true, [styles.small]: true }),
      ...(size === 'medium' && { 'p-3': true }),
    })}
  >
    <Icon
      type={type}
      className={cx({
        ...(size === 'small' && { 'mr-1': true }),
        ...(size === 'medium' && { 'mr-3': true }),
      })}
    />
    <p
      className={cx({
        ...(size === 'small' && { 'pl-2': true }),
        ...(size === 'medium' && { 'pl-3': true }),
      })}
    >
      {children}
    </p>
  </div>
);

export default Message;
