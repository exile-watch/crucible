import React from 'react';
import cx from 'classnames';

import { Introduction } from '.';

import styles from './EditorSectionWrapper.module.scss';

const EditorSections = () => {
  return (
    <div className={cx('mt-5', styles.sections)}>
      <Introduction />
    </div>
  );
};

export default EditorSections;
