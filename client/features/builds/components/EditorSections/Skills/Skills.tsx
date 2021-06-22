import React from 'react';

import EditorSectionWrapper from '#features/builds/components/EditorSections/EditorSectionWrapper';

import OptionsContainer from './OptionsContainer/OptionsContainer';

import styles from './Skills.module.scss';

const Skills = () => {
  return (
    <EditorSectionWrapper section="skills">
      <div className={styles.skills}>
        <OptionsContainer />
        <div className={styles.labelsGrid}>
        </div>
      </div>
    </EditorSectionWrapper>
  );
};

export default Skills;
