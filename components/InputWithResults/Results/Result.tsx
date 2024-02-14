import React from 'react';
import Link from 'next/link';

import {Badge, Combobox, Group, Stack, Text} from '@mantine/core';
import { IndexedSearchResultsBossProps } from '#types';

import styles from './Results.module.scss';

type ResultProps = {
  onClick: () => any;
} & IndexedSearchResultsBossProps;

const Result = ({
  mapPath,
  mapName,
  encounterPath,
  encounterName,
  encounterAbilityPath,
  encounterAbilityName,
}: ResultProps) => {
  const isMap = !encounterPath && !encounterAbilityPath;
  const isBoss = encounterPath && !encounterAbilityPath;

  if (isMap) {
    return (
      <Link href={mapPath} className={styles.link}>
        <Combobox.Option value={mapName}>
          <Group justify="space-between">
            {mapName}
            <Badge color="orange" size="xs">map</Badge>
          </Group>
        </Combobox.Option>
      </Link>
    );
  }

  if (isBoss) {
    return (
      <Link href={encounterPath} className={styles.link}>
        <Combobox.Option value={encounterName}>
          <Group justify="space-between">
            <Stack gap={0}>
              <Text size="sm">{encounterName}</Text>
              {mapName && <Text c="dimmed" size="xs" fs="italic">{mapName}</Text>}
            </Stack>
            <Badge color="teal" size="xs">boss</Badge>
          </Group>
        </Combobox.Option>
      </Link>
    );
  }

  return (
    <Link href={encounterAbilityPath} className={styles.link}>
      <Combobox.Option value={encounterAbilityName}>
        <Group justify="space-between">
          <Stack gap={0}>
            <Text size="sm">{encounterAbilityName}</Text>
            <Text c="dimmed" size="xs" fs="italic">{encounterName}{mapName && ` - ${mapName}`}</Text>
          </Stack>
        <Badge size="xs">ability</Badge>
        </Group>
      </Combobox.Option>
    </Link>
  );
};

export default Result;
