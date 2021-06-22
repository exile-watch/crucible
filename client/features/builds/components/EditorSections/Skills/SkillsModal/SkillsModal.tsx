import React from 'react';

import { Button, Heading } from '#design-system/components';
import Modal from '#design-system/components/Modal/Modal';
import SkillsRow from '#features/builds/components/EditorSections/Skills/SkillsModal/SkillsRow/SkillsRow';

import AddSlot from './AddSlot/AddSlot';

import styles from './SkillsModal.module.scss';
import cx from 'classnames';

type SkillsModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

const SkillsModalTitle = () => {
  return (
    <div><p>Editing Skills</p></div>
  )
}

const SkillsModal = ({ isOpen, toggleModal }: SkillsModalProps) => {
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
        <Button variant='tertiary' className='mr-3'>Cancel</Button>
        <Button variant='secondary' className='mr-3'>Reset</Button>
        <Button>Save</Button>
      </div>
    </Modal>
  );
};

export default SkillsModal;
