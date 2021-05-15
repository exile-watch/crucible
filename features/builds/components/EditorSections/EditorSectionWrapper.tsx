import React, { ReactNode } from 'react';

import Heading from '#components/Heading/Heading';

import styles from './EditorSectionWrapper.module.scss';

type EditorSectionWrapperProps = {
  children: ReactNode;
  section: string;
};

const EditorSectionWrapper = ({ children, section, ...props }: EditorSectionWrapperProps) => {
  return (
    <section className={styles.editorSectionWrapper} {...props}>
      <Heading className={styles.heading}>
        <span>{section}</span>
      </Heading>
      {children}
    </section>
  );
};

export default EditorSectionWrapper;
