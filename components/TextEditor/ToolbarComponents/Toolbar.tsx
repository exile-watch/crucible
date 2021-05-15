import React from 'react';

import BlockButton from './BlockButton/BlockButton';
import MarkButton from './MarkButton/MarkButton';

import styles from './ToolbarComponents.module.scss';

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <MarkButton format="bold" />
      <MarkButton format="italic" />
      <MarkButton format="underline" />
      <MarkButton format="code" />
      <BlockButton format="heading-one" />
      <BlockButton format="heading-two" />
      <BlockButton format="quote" />
      <BlockButton format="numbered-list" />
      <BlockButton format="bulleted-list" />
    </div>
  );
};

export default Toolbar;
