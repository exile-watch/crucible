import React, { useState } from 'react';
import cx from 'classnames';

import { Button } from '#design-system/components';
import { AddIcon, CrossIcon, EditIcon } from '#design-system/icons';
import { selectSkills } from '#features/builds/slices/buildSlice';
import { SocketsType } from '#features/builds/types/Gems';
import { useSelector } from '#hooks/useStore';

import SkillsModal from '../SkillsModal/SkillsModal';

import styles from './OptionsContainer.module.scss';

type OptionsProps = {
  category: SocketsType;
  handleModalToggle: () => void;
};

const Options = ({ category, handleModalToggle }: OptionsProps) => (
  <div className={styles.options}>
    {category.every((c) => !c.id) ? (
      <Button variant="tertiary" className="px-2" onClick={handleModalToggle}>
        <AddIcon />
      </Button>
    ) : (
      <>
        <Button variant="tertiary" className="px-2">
          <EditIcon />
        </Button>
        <Button variant="tertiary" className="px-2">
          <CrossIcon />
        </Button>
      </>
    )}
  </div>
);

const OptionsContainer = () => {
  const skills = useSelector(selectSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => setIsModalOpen((isOpen) => !isOpen);

  return (
    <>
      <div className={cx('ml-3', styles.optionsContainer)}>
        <Options category={skills.mainhand.primary} handleModalToggle={handleModalToggle} />
        <Options category={skills.mainhand.secondary} handleModalToggle={handleModalToggle} />
        <Options category={skills.mainhand.tertiary} handleModalToggle={handleModalToggle} />
        <Options category={skills.mainhand.quaternary} handleModalToggle={handleModalToggle} />

        <Options category={skills.body.primary} handleModalToggle={handleModalToggle} />
        <Options category={skills.body.secondary} handleModalToggle={handleModalToggle} />

        <Options category={skills.helmet} handleModalToggle={handleModalToggle} />
        <Options category={skills.gloves} handleModalToggle={handleModalToggle} />
        <Options category={skills.boots} handleModalToggle={handleModalToggle} />
      </div>
      <SkillsModal isOpen={isModalOpen} toggleModal={handleModalToggle} />
    </>
  );
};

export default OptionsContainer;
