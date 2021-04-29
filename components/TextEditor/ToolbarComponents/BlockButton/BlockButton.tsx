import { MouseEvent } from 'react';
import { useSlate } from 'slate-react';

import { ToolbarButtonProps } from '#types/slate';

import { isBlockActive, toggleBlock } from './utils';

const BlockButton = ({ format, icon }: ToolbarButtonProps) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleBlock(editor, format);
  };

  return (
    <button active={isActive} onMouseDown={handleMouseDown}>
      <i>{icon}</i>
    </button>
  );
};

export default BlockButton;
