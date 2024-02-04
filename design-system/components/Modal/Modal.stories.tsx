import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Button } from '#design-system/components';

import Modal, { ModalProps } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = () => {
  const [isOpen, setIsOpen]: any = useState(false);

  const handleModalToggle = () => setIsOpen((isOpen: boolean) => !isOpen);

  return (
    <>
      <Button onClick={handleModalToggle}>Toggle Modal</Button>
      <Modal isOpen={isOpen} toggleModal={handleModalToggle} title="Modal Header">
        Some modal content
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
