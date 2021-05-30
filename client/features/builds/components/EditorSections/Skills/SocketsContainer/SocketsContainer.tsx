import React from 'react';

import { selectSkills } from '#features/builds/slices/buildSlice';
import { SkillsType } from '#features/builds/types/Gems';
import { useSelector } from '#hooks/useStore';

import Sockets from './Sockets/Sockets';

import styles from './SocketsContainer.module.scss';

const SocketsContainer = () => {
  const skills = useSelector<SkillsType>(selectSkills);

  return (
    <div>
      <div className={styles.socketsContainer}>
        <div className={styles.armor} style={{ gridArea: 'skills-mainhand' }} />
        <div className={styles.armor} style={{ gridArea: 'skills-body' }} />
        <div className={styles.armor} style={{ gridArea: 'skills-helmet' }} />
        <div className={styles.armor} style={{ gridArea: 'skills-gloves' }} />
        <div className={styles.armor} style={{ gridArea: 'skills-boots' }} />
        <Sockets category={skills.mainhand.primary} gridAreaType="mainhand" row={1} />
        <Sockets category={skills.mainhand.secondary} gridAreaType="mainhand" row={2} />
        <Sockets category={skills.mainhand.tertiary} gridAreaType="mainhand" row={3} />
        <Sockets category={skills.mainhand.quaternary} gridAreaType="mainhand" row={4} />

        <Sockets category={skills.body.primary} gridAreaType="body" row={1} />
        <Sockets category={skills.body.secondary} gridAreaType="body" row={2} />

        <Sockets category={skills.helmet} gridAreaType="helmet" />
        <Sockets category={skills.gloves} gridAreaType="gloves" />
        <Sockets category={skills.boots} gridAreaType="boots" />
      </div>
    </div>
  );
};

export default SocketsContainer;
