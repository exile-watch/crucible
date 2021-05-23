import { MouseEvent } from 'react';
import cx from 'classnames';
import { useSlate } from 'slate-react';

import {
  FormatBulletedListIcon,
  FormatHeadingOneIcon,
  FormatHeadingTwoIcon,
  FormatNumberedListIcon,
  FormatQuoteIcon,
} from '#assets/icons';
import { ElementTypes } from '#types/slate';

import { isBlockActive, toggleBlock } from './utils';

import styles from '../ToolbarComponents.module.scss';

type BlockButtonTypes = {
  format: ElementTypes;
};

const BlockButton = ({ format }: BlockButtonTypes) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleBlock(editor, format);
  };

  const Icon = () => {
    switch (format) {
      case 'numbered-list':
        return <FormatNumberedListIcon />;
      case 'bulleted-list':
        return <FormatBulletedListIcon />;
      case 'heading-one':
        return <FormatHeadingOneIcon />;
      case 'heading-two':
        return <FormatHeadingTwoIcon />;
      case 'quote':
        return <FormatQuoteIcon />;
      default:
        return <i>{format}</i>;
    }
  };

  return (
    <button
      className={cx(styles.button, isActive && styles.isActive)}
      onMouseDown={handleMouseDown}
    >
      <Icon />
    </button>
  );
};

export default BlockButton;
