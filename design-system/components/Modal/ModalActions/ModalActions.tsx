import React, { ReactNode } from 'react';

export type ModalActionsProps = {
  children: ReactNode;
};

const ModalActions = ({ children }: ModalActionsProps) => <div>{children}</div>;

export default ModalActions;
