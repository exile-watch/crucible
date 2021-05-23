import React, { ReactNode } from 'react';
import cx from 'classnames';
import { kebabCase } from 'lodash';

import { Card, Heading, Message } from '#design-system/components';

import styles from './EditorSectionWrapper.module.scss';

type EditorSectionWrapperProps = {
  children: ReactNode;
  section: string;
  locked?: boolean;
};

const EditorSectionWrapper = ({ children, section, locked }: EditorSectionWrapperProps) => {
  return (
    <Card as="section" style={{ gridArea: kebabCase(section) }} locked={locked}>
      <Heading className={cx('pb-3 mb-3', styles.heading)}>{section}</Heading>
      {locked && (
        <Message type="locked" className="p-1 mb-3" size="small">
          This section content is locked to all variants.
        </Message>
      )}
      {children}
    </Card>
  );
};

export default EditorSectionWrapper;
