import React from 'react';
import cx from 'classnames';

import {
  AscendancyTree,
  Bandits,
  Benchmarks,
  Changelog,
  Concept,
  DetrimentalMapMods,
  FAQ,
  Gear,
  Introduction,
  Kudos,
  Pantheon,
  PassivesTree,
  ProsAndCons,
  Skills,
} from '.';

import styles from './EditorSectionWrapper.module.scss';

const EditorSections = () => {
  return (
    <div className={cx('mt-5 pr-3', styles.sections)}>
      <Introduction />
      <Concept />
      <Kudos />
      <FAQ />
      <Gear />
      <Changelog />
      <DetrimentalMapMods />
      <ProsAndCons />
      <Benchmarks />
      <PassivesTree />
      <Pantheon />
      <Skills />
      <AscendancyTree />
      <Bandits />
    </div>
  );
};

export default EditorSections;
