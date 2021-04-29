import React, { useCallback, useMemo } from 'react';
import isHotkey from 'is-hotkey';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';

import { toggleMark } from '#components/TextEditor/ToolbarComponents/MarkButton/utils';

import { Element, Leaf, Toolbar } from './ToolbarComponents';

const HOTKEYS: Record<string, string> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

type RichTextExampleProps = {
  value: Descendant[];
  onChange: (v: Descendant[]) => void;
};

const RichTextExample = ({ value, onChange }: RichTextExampleProps) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handleChange = (v) => {
    if (JSON.stringify(value) === JSON.stringify(v)) return;
    onChange(v);
  };

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Toolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

export default RichTextExample;
