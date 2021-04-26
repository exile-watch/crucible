import React, { ReactNode } from 'react';

import styles from './EditorSectionWrapper.module.scss';

type EditorSectionWrapperProps = {
  children: ReactNode;
};

const EditorSectionWrapper = ({ children, ...props }: EditorSectionWrapperProps) => {
  return (
    <div className={styles.editorSectionWrapper} {...props}>
      {children}
    </div>
  );
};

export default EditorSectionWrapper;
