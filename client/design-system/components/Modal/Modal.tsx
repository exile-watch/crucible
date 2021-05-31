import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { backdrop, modal } from './animations';
import Backdrop from './Backdrop/Backdrop';
import ModalActions, { ModalActionsProps } from './ModalActions/ModalActions';
import ModalBody, { ModalBodyProps } from './ModalBody/ModalBody';
import ModalHeader from './ModalHeader/ModalHeader';

import styles from './Modal.module.scss';

export type ModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  title?: ReactNode | string;
  children: ReactNode;
  Body?: ModalBodyProps;
  Actions?: ModalActionsProps;
  dataId?: string;
};

const Modal = ({ isOpen = false, toggleModal, title, children, dataId }: ModalProps) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <motion.div
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="hidden"
          data-cy={dataId}
          className={styles.container}
        >
          <Backdrop onClick={toggleModal} />
          <motion.div variants={modal} className={styles.modal}>
            {title && <ModalHeader>{title}</ModalHeader>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Modal.Body = ModalBody;
Modal.Actions = ModalActions;

export default Modal;
