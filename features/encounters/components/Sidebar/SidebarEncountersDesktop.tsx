import React, { MouseEvent, useEffect, useState } from 'react';
import cx from 'classnames';
import { kebabCase, startCase } from 'lodash';
import Link from 'next/link';
import dynamic from 'next/dynamic'

import { ArrowRightIcon } from '@exile-watch/writ-icons';
import { AtomPathData } from '#types';

import styles from './SidebarEncountersDesktop.module.scss';
import {Center, Divider, Group, Stack, Text, useMediaQuery} from "@exile-watch/writ-react";
import {useRouter} from "next/router";
import {InputWithResults} from "#components";
const startingChar = (entities: AtomPathData, i: number) => {
  const firstChar = entities[i].label.charAt(0);
  const prevEntityChar = i > 0 && entities[i - 1].label.charAt(0);

  return firstChar === prevEntityChar ? null : <Divider label={firstChar} color="dimmed" labelPosition="center" className={styles.divider}/>
};

const SidebarEncountersDesktop = ({isOpen, toggle}) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [data, setData] = useState<any>(null)
  const {
    query: {category, map, boss},
  } = useRouter();
  const [activeCategory, setActiveCategory] = useState(`sidebar_${category}`);

  const {isMobile} = useMediaQuery()

  const handleCategoryClick = (e: MouseEvent<HTMLLIElement>) => {
    setActiveCategory(e.currentTarget.id);
  };

  useEffect(() => {
    if (map) {
      setActiveCategory(`sidebar_${category}`);
    }
  }, [map, category]);

  useEffect(() => {
    import(`@exile-watch/encounter-data/dist/extracted-data/paths.esm` as string)
      .then((d) => {
        setData(d.default);
        setIsDataLoaded(true);
      })
      .catch(() => {
        setData(null);
        setIsDataLoaded(false);
      });
  }, []);

  if (!isDataLoaded) {
    return null
  }

  return (
    <Stack justify="space-between" mx={8} h="100%">
      <Stack gap={0}>
        {isMobile && <>
          <Center>
            <InputWithResults isOpen={isOpen} toggle={toggle}/>
            <Divider my="md" variant="ho"/>
          </Center>
        </>
        }
        <Stack gap="xs" component="ul" className={styles.list}>
          {Object.entries(data).map(({0: category, 1: entities}) => (
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
                    {[styles.arrowIconActive]: activeCategory === `sidebar_${category}`},
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
                {entities.map(({label, path}, i, self) => (
                  <li key={`sidebar_${label}`} onClick={toggle}>
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
      </Stack>
      <Stack>
        <Divider />
        <Group justify="center">
          <Link href="https://docs.exile.watch/legal" target="_blank"><Text size="xs">Legal</Text></Link>
          <Divider orientation="vertical" />
          <Link href="https://docs.exile.watch/legal/privacy-policy" target="_blank"><Text size="xs">Privacy Policy</Text></Link>
        </Group>
        <Divider />
        <Text size="xs" ta="center" mb="md" c="dimmed">This product isn't affiliated with or endorsed by Grinding Gear Games in any way.</Text>
      </Stack>
    </Stack>
  );
};

export default SidebarEncountersDesktop;
