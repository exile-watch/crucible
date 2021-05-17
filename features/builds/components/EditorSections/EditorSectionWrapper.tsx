import React, { ReactNode } from 'react';
import cx from 'classnames';
import { kebabCase } from 'lodash';

import Card from '#components/Card/Card';
import Heading from '#components/Heading/Heading';

import styles from './EditorSectionWrapper.module.scss';

type EditorSectionWrapperProps = {
  children: ReactNode;
  section: string;
};

const EditorSectionWrapper = ({ children, section }: EditorSectionWrapperProps) => {
  return (
    <Card as="section" style={{ gridArea: kebabCase(section) }}>
      <Heading className={cx('pb-3 mb-3', styles.heading)}>{section}</Heading>
      {children}
    </Card>
  );
};

export default EditorSectionWrapper;
