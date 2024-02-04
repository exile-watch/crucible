import React, { ReactNode } from 'react';

import styles from './Details.module.scss';

type DetailRowType = {
  withBottomMargin?: boolean;
  label: string;
  children: ReactNode;
};

const DetailRow = ({ withBottomMargin, children, label }: DetailRowType) => {
  return (
    <div className={withBottomMargin ? 'mb-3' : ''}>
      <div className={styles.label}>{label}</div>
      {children}
    </div>
  );
};

export default DetailRow;
