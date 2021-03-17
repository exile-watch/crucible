import React from 'react';
import cx from 'classnames';
import Link from 'next/link';

import Heading from '#components/Heading/Heading';
import useActiveModule from '#hooks/useActiveModule';

import styles from './TopbarDesktop.module.scss';

const modules = [
  {
    name: 'encounters',
    path: '/encounters',
  },
];

const Modules = () => {
  const activeModule = useActiveModule();

  return (
    <ul className={styles.moduleList}>
      {modules.map(({ name, path }) => (
        <li
          className={cx(styles.module, activeModule === name && styles.activeModule)}
          key={`topbar_module_${name}`}
        >
          <Link href={path}>
            <a className="px-3">
              <Heading as="h4">{name}</Heading>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Modules;
