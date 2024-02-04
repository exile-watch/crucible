import { ReactNode } from 'react';

import { EmphasisTypes } from '#types/slate';

type LeafProps = {
  attributes: any;
  children?: ReactNode;
  leaf: Record<EmphasisTypes, any>;
};

const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default Leaf;
