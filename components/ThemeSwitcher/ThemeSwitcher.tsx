import React from 'react';
import { useCookies } from 'react-cookie';

import { MoonIcon, SunIcon } from '#assets/icons';
import { Themes } from '#types';

import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher = () => {
  const [_, setCookie] = useCookies();

  const handleThemeSwitch = (theme: Themes) => {
    const html = document.getElementsByTagName('html')[0];
    switch (theme) {
      case 'dark':
        html.classList.replace('light', 'dark');
        break;
      case 'light':
        html.classList.replace('dark', 'light');
        break;
      default:
        break;
    }
    setCookie('theme', theme);
  };

  return (
    <div className={styles.container}>
      <MoonIcon className="mr-2" onClick={() => handleThemeSwitch('dark')} />
      <SunIcon onClick={() => handleThemeSwitch('light')} />
    </div>
  );
};

export default ThemeSwitcher;
