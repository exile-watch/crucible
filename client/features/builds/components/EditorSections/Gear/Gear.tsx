import React from 'react';

import { AddIcon } from '#design-system/icons';

import EditorSectionWrapper from '../EditorSectionWrapper';

import styles from './Gear.module.scss';

const Gear = () => {
  return (
    <EditorSectionWrapper section="Gear">
      <div className={styles.grid}>
        <div style={{ gridArea: 'main-weapon' }}>
          <AddIcon />
        </div>
        <div style={{ gridArea: 'off-hand' }}>
          <AddIcon />
        </div>
        <div style={{ gridArea: 'helmet' }}>
          <AddIcon />
        </div>
        <div style={{ gridArea: 'ring-1' }}>
          <AddIcon />
        </div>
        <div style={{ gridArea: 'ring-2' }}>
          <AddIcon />
        </div>
        <div style={{ gridArea: 'amulet' }}>
          <AddIcon />
        </div>
        <div style={{ gridArea: 'gloves' }}>
          <AddIcon />
        </div>
        <div style={{ gridArea: 'body' }}>
          <AddIcon />
        </div>
        <div style={{ gridArea: 'boots' }}>
          <AddIcon />
        </div>
        <div style={{ gridArea: 'belt' }}>
          <AddIcon />
        </div>
      </div>
    </EditorSectionWrapper>
  );
};

export default Gear;
