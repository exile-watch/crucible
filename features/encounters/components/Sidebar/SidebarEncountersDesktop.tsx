import cx from "classnames";
import { kebabCase, startCase } from "lodash";
import Link from "next/link";
import React, { MouseEvent, useEffect, useState } from "react";

import { ArrowRightIcon } from "@exile-watch/writ-icons";
import { AtomPathData } from "#types";

import { SidebarNavigationPathsType } from "@exile-watch/encounter-data";
import {
  Center,
  Divider,
  Group,
  NavLink,
  Stack,
  Text,
  useMediaQuery,
} from "@exile-watch/writ-react";
import { useRouter } from "next/router";
import { InputWithResults } from "#components";
import styles from "./SidebarEncountersDesktop.module.scss";
const startingChar = (entities: AtomPathData, i: number) => {
  const firstChar = entities[i].label.charAt(0);
  const prevEntityChar = i > 0 && entities[i - 1].label.charAt(0);

  return firstChar === prevEntityChar ? null : (
    <Divider
      label={firstChar}
      color="dimmed"
      labelPosition="center"
      className={styles.divider}
    />
  );
};

type SidebarEncountersDesktopProps = {
  isOpen: boolean;
  toggle: () => void;
};

const SidebarEncountersDesktop = ({
  isOpen,
  toggle,
}: SidebarEncountersDesktopProps) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, setData] = useState<SidebarNavigationPathsType | null>(null);
  const {
    query: { category, map, boss },
  } = useRouter();
  const [activeCategory, setActiveCategory] = useState(`sidebar_${category}`);

  const { isMobile } = useMediaQuery();

  const handleCategoryClick = (e: MouseEvent<HTMLLIElement>) => {
    setActiveCategory(e.currentTarget.id);
  };

  useEffect(() => {
    if (map) {
      setActiveCategory(`sidebar_${category}`);
    }
  }, [map, category]);

  useEffect(() => {
    import(
      "@exile-watch/encounter-data/dist/extracted-data/paths.esm" as string
    )
      .then((d) => {
        setData(d.default);
        setIsDataLoaded(true);
      })
      .catch(() => {
        setData(null);
        setIsDataLoaded(false);
      });
  }, []);

  if (!isDataLoaded || !data) {
    return null;
  }

  return (
    <Stack justify="space-between" mx={8} h="100%">
      <Stack gap={0}>
        {isMobile && (
          <>
            <Center>
              <InputWithResults isOpen={isOpen} toggle={toggle} />
              <Divider my="md" variant="ho" />
            </Center>
          </>
        )}
        <Stack gap="xs" component="ul" className={styles.list}>
          {Object.entries(data).map(({ 0: category, 1: entities }) => (
            <li
              key={`sidebar_${category}`}
              className={cx(
                styles.category,
                activeCategory === `sidebar_${category}` && styles.categoryOpen,
              )}
              onClick={handleCategoryClick}
              id={`sidebar_${category}`}
            >
              <Group
                justify="space-between"
                className={styles.categoryContainer}
              >
                <Text c="sand.2">{startCase(category)}</Text>
                <ArrowRightIcon
                  className={cx(
                    {
                      [styles.arrowIconActive]:
                        activeCategory === `sidebar_${category}`,
                    },
                    styles.arrowIcon,
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
                  <li key={`sidebar_${label}`} onClick={toggle}>
                    {category === "common-maps" && startingChar(self, i)}
                    <Link
                      href={path}
                      className={cx(
                        styles.boss,
                        (boss === kebabCase(label) ||
                          map === kebabCase(label)) &&
                          styles.activeBoss,
                      )}
                    >
                      <Text size="sm">{label}</Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Stack>
      </Stack>
      <Stack gap="xs">
        <Divider label="About" mb={-8} />
        <NavLink
          component={Link}
          href="https://docs.exile.watch"
          target="_blank"
          label="Docs"
          c="sand.2"
          ta="left"
          p={0}
        />
        <NavLink
          component={Link}
          href="https://engineering.exile.watch"
          target="_blank"
          label="Engineering Blog"
          c="sand.2"
          ta="left"
          p={0}
          mb={-4}
        />
        <Divider label="Legal" mb={-8} />
        <NavLink
          component={Link}
          href="https://docs.exile.watch/privacy-policy"
          target="_blank"
          label="Privacy Policy"
          c="sand.2"
          ta="left"
          p={0}
        />
        <Divider />
        <Text size="xs" ta="center" c="dimmed">
          This product isn't affiliated with or endorsed by Grinding Gear Games
          in any way.
        </Text>
        <Divider label="© 2024 exile.watch" mb="xs" />
      </Stack>
    </Stack>
  );
};

export default SidebarEncountersDesktop;
