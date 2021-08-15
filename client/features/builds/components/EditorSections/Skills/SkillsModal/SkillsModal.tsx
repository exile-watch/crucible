import React from 'react';
import cx from 'classnames';

import { Button, Heading } from '#design-system/components';
import Modal from '#design-system/components/Modal/Modal';
import SkillsRow from '#features/builds/components/EditorSections/Skills/SkillsModal/SkillsRow/SkillsRow';
import { resetDraftSkills, saveDraftSkills } from '#features/builds/slices/buildSlice';
import { useDispatch } from '#hooks/useStore';

import AddSlot from './AddSlot/AddSlot';

import styles from './SkillsModal.module.scss';

type SkillsModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

const SkillsModal = ({ isOpen, toggleModal }: SkillsModalProps) => {
  const dispatch = useDispatch();

  const handleCancelClick = () => {
    dispatch(saveDraftSkills());
    dispatch(resetDraftSkills());
    toggleModal();
  };

  return (
    <Modal isOpen={isOpen} toggleModal={toggleModal} title="Editing Skills">
      <div className={styles.body}>
        <Heading as="h4">
          <span>1</span> Select slot
        </Heading>
        <AddSlot />
        <Heading as="h4">
          <span>2</span> Edit slot
        </Heading>
        <SkillsRow />
      </div>
      <div className={cx(styles.footer, 'pt-3')}>
        <Button variant="tertiary" className="mr-3" onClick={toggleModal}>
          Cancel
        </Button>
        <Button onClick={handleCancelClick}>Save</Button>
      </div>
    </Modal>
  );
};

export default SkillsModal;
