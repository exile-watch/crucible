import { MouseEvent, useEffect, useState } from 'react';
import cx from 'classnames';
import { kebabCase, upperCase } from 'lodash';
import Link from 'next/link';

import { Heading } from '#design-system/components';
import { ArrowRightIcon } from '#design-system/icons';
import useLoadSidebarData from '#hooks/useLoadSidebarData';
import useRouter from '#hooks/useRouter';
import { AtomPathData } from '#types';

import styles from './SidebarEncountersDesktop.module.scss';

const startingChar = (entities: AtomPathData, i: number) => {
  const firstChar = entities[i].label.charAt(0);
  const prevEntityChar = i > 0 && entities[i - 1].label.charAt(0);

  return firstChar === prevEntityChar ? null : (
    <div className={styles.firstChar}>
      <span className="px-3">{firstChar}</span>
    </div>
  );
};

const SidebarEncountersDesktop = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const { isLoading, data } = useLoadSidebarData();
  const {
    query: { category, map, boss },
  } = useRouter();

  const handleCategoryClick = (e: MouseEvent<HTMLLIElement>) => {
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
        <ul>
          {Object.entries(data).map(({ 0: category, 1: entities }) => (
            <li
              key={`sidebar_${category}`}
              className={styles.category}
              onClick={handleCategoryClick}
              id={`sidebar_${category}`}
            >
              <div className={cx('px-3', styles.categoryTitle)}>
                <Heading as="h5" className="my-0">
                  {upperCase(category)}
                </Heading>
                <ArrowRightIcon
                  className={cx(
                    { [styles.arrowIconActive]: activeCategory === `sidebar_${category}` },
                    styles.arrowIcon
                  )}
                />
              </div>
              <ul
                className={
                  activeCategory === `sidebar_${category}` ? styles.active : styles.inactive
                }
              >
                {entities.map(({ label, path }, i, self) => (
                  <li key={`sidebar_${label}`}>
                    {category === 'common-maps' && startingChar(self, i)}
                    <>
                      <Link href={path} legacyBehavior>
                        <a
                          className={cx(
                            'px-3 py-1 mx-3',
                            styles.boss,
                            (boss === kebabCase(label) || map === kebabCase(label)) &&
                              styles.activeBoss
                          )}
                        >
                          <span>{label}</span>
                        </a>
                      </Link>
                    </>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default SidebarEncountersDesktop;
