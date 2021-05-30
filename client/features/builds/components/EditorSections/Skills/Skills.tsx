import React from 'react';

import EditorSectionWrapper from '#features/builds/components/EditorSections/EditorSectionWrapper';

import OptionsContainer from './OptionsContainer/OptionsContainer';
import SocketsContainer from './SocketsContainer/SocketsContainer';

import styles from './Skills.module.scss';

// const Labels = ({ category }) => (
//   <ul className={styles.gemLabels}>
//     {category.map((s, i) => {
//       return (
//         <li>
//           <span>b</span> xd {s.label} <span>21 / 23%</span>---
//         </li>
//       );
//     })}
//   </ul>
// );

const Skills = () => {
  return (
    <EditorSectionWrapper section="skills">
      <div className={styles.skills}>
        <SocketsContainer />
        <OptionsContainer />
        <div className={styles.labelsGrid}>
          {/*<Labels category={skills.mainhand.primary} />*/}
          {/*<Labels category={skills.mainhand.secondary} />*/}
          {/*<Labels category={skills.mainhand.tertiary} />*/}
          {/*<Labels category={skills.mainhand.quaternary} />*/}

          {/*<Labels category={skills.body.primary} />*/}
          {/*<Labels category={skills.body.secondary} />*/}

          {/*<Labels category={skills.helmet} />*/}
          {/*<Labels category={skills.gloves} />*/}
          {/*<Labels category={skills.boots} />*/}
        </div>
      </div>
    </EditorSectionWrapper>
  );
};

export default Skills;
