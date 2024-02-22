import React, { ReactNode } from 'react';

import styles from './Details.module.scss';
import {Stack, Text} from '@mantine/core'

type DetailRowType = {
  withBottomMargin?: boolean;
  label: string;
  children: ReactNode;
};

const DetailRow = ({ withBottomMargin, children, label }: DetailRowType) => {
  return (
    <Stack gap={0} mb={withBottomMargin ? 'md' : 0}>
      <Text c="dimmed" className={styles.label} size="xs"><b>{label}</b></Text>
      {children}
    </Stack>
  );
};

export default DetailRow;
