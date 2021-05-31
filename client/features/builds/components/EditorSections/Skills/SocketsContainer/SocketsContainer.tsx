import React from 'react';

import { selectSkills } from '#features/builds/slices/buildSlice';
import { SkillsType } from '#features/builds/types/Gems';
import { useSelector } from '#hooks/useStore';

import Sockets from './Sockets/Sockets';

import styles from './SocketsContainer.module.scss';

type SocketsContainerProps = { inModal?: boolean };

const SocketsContainer = ({ inModal = false }: SocketsContainerProps) => {
  const skills = useSelector<SkillsType>(selectSkills);

  return (
    <div className={styles.socketsContainer}>
      <div className={styles.armor} style={{ gridArea: 'skills-mainhand' }} />
      <div className={styles.armor} style={{ gridArea: 'skills-body' }} />
      <div className={styles.armor} style={{ gridArea: 'skills-helmet' }} />
      <div className={styles.armor} style={{ gridArea: 'skills-gloves' }} />
      <div className={styles.armor} style={{ gridArea: 'skills-boots' }} />
      <Sockets
        category={skills.mainhand.primary}
        gridAreaType="mainhand"
        row={1}
        inModal={inModal}
      />
      <Sockets
        category={skills.mainhand.secondary}
        gridAreaType="mainhand"
        row={2}
        inModal={inModal}
      />
      <Sockets
        category={skills.mainhand.tertiary}
        gridAreaType="mainhand"
        row={3}
        inModal={inModal}
      />
      <Sockets
        category={skills.mainhand.quaternary}
        gridAreaType="mainhand"
        row={4}
        inModal={inModal}
      />

      <Sockets category={skills.body.primary} gridAreaType="body" row={1} inModal={inModal} />
      <Sockets category={skills.body.secondary} gridAreaType="body" row={2} inModal={inModal} />

      <Sockets category={skills.helmet} gridAreaType="helmet" inModal={inModal} />
      <Sockets category={skills.gloves} gridAreaType="gloves" inModal={inModal} />
      <Sockets category={skills.boots} gridAreaType="boots" inModal={inModal} />
    </div>
  );
};

export default SocketsContainer;
