import React, { ReactNode } from 'react';

export type ModalBodyProps = {
  children: ReactNode;
};

const ModalBody = ({ children }: ModalBodyProps) => <div className="mb-3">{children}</div>;

export default ModalBody;
