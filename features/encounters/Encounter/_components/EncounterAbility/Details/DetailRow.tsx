import React, { type ReactNode } from "react";

import { Stack, Title } from "@exile-watch/writ-react";
import styles from "./Details.module.scss";

type DetailRowType = {
  withBottomMargin?: boolean;
  label: string;
  children: ReactNode;
};

const DetailRow = ({ withBottomMargin, children, label }: DetailRowType) => {
  return (
    <Stack gap={0} mb={withBottomMargin ? "md" : 0}>
      <Title order={3} c="dimmed" className={styles.label} fw="bold">
        {label}
      </Title>
      {children}
    </Stack>
  );
};

export default DetailRow;
