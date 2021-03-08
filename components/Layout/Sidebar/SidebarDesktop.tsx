import { MouseEvent, useEffect, useState } from 'react';
import cx from 'classnames';
import { kebabCase, upperCase } from 'lodash';
import Link from 'next/link';

import Heading from '#components/Heading/Heading';
import useImportDataOnLoad from '#hooks/useImportDataOnLoad';
import useRouter from '#hooks/useRouter';
import { PathDataType } from '#types';

import styles from './SidebarDesktop.module.scss';

const SidebarDesktop = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const { isLoading, data } = useImportDataOnLoad<PathDataType>({ fileName: 'paths' });
  const {
    query: { category, map, boss },
  } = useRouter();
  const handleCategoryClick = (e: MouseEvent<HTMLLIElement>) => {
    setActiveCategory((e.currentTarget as Element).id);
  };

  useEffect(() => {
    if (map) {
      setActiveCategory(`sidebar_${category}`);
    }
  }, [map]);

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
                <Heading as="h5" className={cx('px-3 my-2', styles.categoryTitle)}>
                  {upperCase(category)}
                </Heading>
                <ul
                  className={
                    activeCategory === `sidebar_${category}` ? styles.active : styles.inactive
                  }
                >
                  {entities.map(({ label, path }) => (
                    <li key={`sidebar_${label}`}>
                      <Link href={path}>
                        <a
                          className={cx(
                            'px-3 py-1 ml-3',
                            styles.boss,
                            (boss === kebabCase(label) || map === kebabCase(label)) &&
                              styles.activeBoss
                          )}
                        >
                          {label}
                        </a>
                      </Link>
                    </li>
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
