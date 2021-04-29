import { MouseEvent } from 'react';
import { useSlate } from 'slate-react';

import { ToolbarButtonProps } from '#types/slate';

import { isMarkActive, toggleMark } from './utils';

const MarkButton = ({ format, icon }: ToolbarButtonProps) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <button
      // active={isActive}
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <i>{icon}</i>
    </button>
  );
};

export default MarkButton;
