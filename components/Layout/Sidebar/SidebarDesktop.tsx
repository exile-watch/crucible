import { MouseEvent, useEffect, useState } from 'react';
import cx from 'classnames';
import { kebabCase, upperCase } from 'lodash';
import Link from 'next/link';

import { ArrowRightIcon } from '#assets/icons';
import Heading from '#components/Heading/Heading';
import useImportDataOnLoad from '#hooks/useImportDataOnLoad';
import useRouter from '#hooks/useRouter';
import { AtomPathData, PathDataType } from '#types';

import styles from './SidebarDesktop.module.scss';

const startingChar = (entities: AtomPathData, i: number) => {
  const firstChar = entities[i].label.charAt(0);
  const prevEntityChar = i > 0 && entities[i - 1].label.charAt(0);

  return firstChar === prevEntityChar ? null : (
    <div className={styles.firstChar}>
      <span className="px-3">{firstChar}</span>
    </div>
  );
};

const SidebarDesktop = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const { isLoading, data } = useImportDataOnLoad<PathDataType>({
    module: 'encounters',
    fileName: 'paths',
  });
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
    <div className={cx('pt-1', styles.sidebar)}>
      <div className={cx('px-3', styles.logo)}>exile.watch</div>
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
                    <>
                      {category === 'maps' && startingChar(self, i)}
                      <li key={`sidebar_${label}`}>
                        <Link href={path}>
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
                      </li>
                    </>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default SidebarDesktop;
