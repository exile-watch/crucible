import { MouseEvent } from 'react';
import cx from 'classnames';
import { useSlate } from 'slate-react';

import {
  FormatBoldIcon,
  FormatCodeIcon,
  FormatItalicIcon,
  FormatUnderlineIcon,
} from '#assets/icons';
import { EmphasisTypes } from '#types/slate';

import { isMarkActive, toggleMark } from './utils';

import styles from '../ToolbarComponents.module.scss';

type MarkButtonTypes = {
  format: EmphasisTypes;
};

const MarkButton = ({ format }: MarkButtonTypes) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  const Icon = () => {
    switch (format) {
      case 'bold':
        return <FormatBoldIcon />;
      case 'italic':
        return <FormatItalicIcon />;
      case 'underline':
        return <FormatUnderlineIcon />;
      case 'code':
        return <FormatCodeIcon />;
      default:
        return <p>{format}</p>;
    }
  };

  return (
    <button
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      className={cx(styles.button, isActive && styles.isActive)}
    >
      <Icon />
    </button>
  );
};

export default MarkButton;
