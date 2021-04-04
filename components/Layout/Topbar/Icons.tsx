import React from 'react';

import ThemeSwitcher from '#components/ThemeSwitcher/ThemeSwitcher';

import styles from './TopbarDesktop.module.scss';

const Icons = () => {
  return (
    <div className={styles.icons}>
      <ThemeSwitcher />
    </div>
  );
};

export default Icons;
