import React from 'react';
import cx from 'classnames';

import { AscendancyProgress, Introduction, Leveling } from '.';

import styles from './EditorSectionWrapper.module.scss';

const EditorSections = () => {
  return (
    <div className={cx('mt-5', styles.sections)}>
      <Introduction />
      <Leveling />
      <AscendancyProgress />
    </div>
  );
};

export default EditorSections;
