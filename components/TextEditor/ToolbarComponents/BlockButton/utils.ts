import { Editor, Element as SlateElement, Transforms } from 'slate';

import { ElementTypes, EmphasisTypes } from '#types/slate';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const isBlockActive = (editor: Editor, format: ElementTypes) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const toggleBlock = (editor: Editor, format: ElementTypes) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(!Editor.isEditor(n) && Boolean(SlateElement.isElement(n)) && n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export { isBlockActive, toggleBlock };
