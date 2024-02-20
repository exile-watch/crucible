import React, { MouseEvent, useEffect, useState } from 'react';
import cx from 'classnames';
import { kebabCase, startCase } from 'lodash';
import Link from 'next/link';

import { ArrowRightIcon } from '@exile-watch/writ-icons';
import useLoadSidebarData from '#hooks/useLoadSidebarData';
import { AtomPathData } from '#types';

import styles from './SidebarEncountersDesktop.module.scss';
import {Divider, Group, Stack, Text} from "@mantine/core";
import {useRouter} from "next/router";
import {paths} from "@exile-watch/encounter-data";

const startingChar = (entities: AtomPathData, i: number) => {
  const firstChar = entities[i].label.charAt(0);
  const prevEntityChar = i > 0 && entities[i - 1].label.charAt(0);

  return firstChar === prevEntityChar ? null : <Divider label={firstChar} color="dimmed" labelPosition="center" className={styles.divider}/>
};

const SidebarEncountersDesktop = () => {
  const {
    query: { category, map, boss },
  } = useRouter();
  const [activeCategory, setActiveCategory] = useState(`sidebar_${category}`);


  const handleCategoryClick = (e: MouseEvent<HTMLLIElement>) => {
    setActiveCategory(e.currentTarget.id);
  };

  useEffect(() => {
    if (map) {
      setActiveCategory(`sidebar_${category}`);
    }
  }, [map, category]);

  return (
    <Stack gap="xs" component="ul" className={styles.list}>
      {Object.entries(paths).map(({ 0: category, 1: entities }) => (
        <li
          key={`sidebar_${category}`}
          className={cx(styles.category, activeCategory === `sidebar_${category}` && styles.categoryOpen)}
          onClick={handleCategoryClick}
          id={`sidebar_${category}`}
        >
          <Group justify="space-between" className={styles.categoryContainer}>
            <Text c="sand.2">
              {startCase(category)}
            </Text>
            <ArrowRightIcon
              className={cx(
                { [styles.arrowIconActive]: activeCategory === `sidebar_${category}` },
                styles.arrowIcon
              )}
            />
          </Group>
          <ul
            className={cx(styles.sublist, {
              [styles.active]: activeCategory === `sidebar_${category}`,
              [styles.inactive]: activeCategory !== `sidebar_${category}`,
            })}
          >
            {entities.map(({ label, path }, i, self) => (
              <li key={`sidebar_${label}`}>
                {category === 'common-maps' && startingChar(self, i)}
                <Link href={path} className={cx(
                  styles.boss,
                  (boss === kebabCase(label) || map === kebabCase(label)) &&
                  styles.activeBoss
                )}>
                    <Text size="sm">{label}</Text>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </Stack>
  );
};

export default SidebarEncountersDesktop;
