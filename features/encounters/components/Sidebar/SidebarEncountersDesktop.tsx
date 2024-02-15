import React, { MouseEvent, useEffect, useState } from 'react';
import cx from 'classnames';
import { kebabCase, startCase } from 'lodash';
import Link from 'next/link';

import { ArrowRightIcon } from '@exile-watch/writ-icons';
import useLoadSidebarData from '#hooks/useLoadSidebarData';
import useRouter from '#hooks/useRouter';
import { AtomPathData } from '#types';

import styles from './SidebarEncountersDesktop.module.scss';
import {Divider, Group, Stack, Text} from "@mantine/core";

const startingChar = (entities: AtomPathData, i: number) => {
  const firstChar = entities[i].label.charAt(0);
  const prevEntityChar = i > 0 && entities[i - 1].label.charAt(0);

  return firstChar === prevEntityChar ? null : <Divider label={firstChar} color="dimmed" labelPosition="center" className={styles.divider}/>
};

const SidebarEncountersDesktop = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const { isLoading, data } = useLoadSidebarData();
  const {
    query: { category, map, boss },
  } = useRouter();

  const handleCategoryClick = (e: MouseEvent<HTMLLIElement>) => {
    if(activeCategory === e.currentTarget.id) {
      return setActiveCategory('');
    }
    setActiveCategory(e.currentTarget.id);
  };

  useEffect(() => {
    if (map) {
      setActiveCategory(`sidebar_${category}`);
    }
  }, [map, category]);

  return (
    <nav>
      {isLoading && 'loading'}
      {!isLoading && data && (
        <Stack gap="xs" component="ul" className={styles.list}>
          {Object.entries(data).map(({ 0: category, 1: entities }) => (
            <li
              key={`sidebar_${category}`}
              className={styles.category}
              onClick={handleCategoryClick}
              id={`sidebar_${category}`}
            >
              <Group justify="space-between" className={styles.categoryContainer}>
                <Text size="lg">
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
                        <Text>{label}</Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Stack>
      )}
    </nav>
  );
};

export default SidebarEncountersDesktop;
