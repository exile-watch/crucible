import styles from './SidebarDesktop.module.scss';
import cn from 'classnames'
import useImportDataOnLoad from "#hooks/useImportDataOnLoad";
import {upperCase, kebabCase} from 'lodash';
import Link from 'next/link';
import Heading from "#components/Heading/Heading";
import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";

const SidebarDesktop = () => {
  const [activeCategory, setActiveCategory] = useState('')
  const {isLoading, data} = useImportDataOnLoad({fileName: 'paths'})
  const {query} = useRouter();
  const handleCategoryClick = ({currentTarget: { id }}: ChangeEvent<HTMLDivElement>) => {
    setActiveCategory(id)
  }

  useEffect(() => {
    if(query.map) {
      setActiveCategory(`sidebar_${query.map}`)
    }
  }, [query.map])

  return (
    <div className={cn('pt-1', styles.sidebar)}>
      <div className={cn('px-3', styles.logo)}>exile.watch</div>
      <nav>
        {isLoading && "loading"}
        {!isLoading && data && (
          <ul>
            {Object.entries(data).map(({0: category, 1: entities}) => (
              <li key={`sidebar_${category}`} className={styles.category} onClick={e => handleCategoryClick(e)} id={`sidebar_${category}`}>
                <Heading as='h5' className={cn('px-3 my-2', styles.categoryTitle)}>{upperCase(category)}</Heading>
                <ul className={activeCategory === `sidebar_${category}` ? styles.active : styles.inactive}>
                  {entities.map(({label, path}) => (
                    <li key={`sidebar_${label}`}>
                      <Link href={path}>
                        <a className={cn('px-3 py-1 ml-3', styles.boss, query.boss === kebabCase(label) && styles.activeBoss)}>{label}</a>
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