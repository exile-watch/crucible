import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type ElementTypes =
  | 'block-quote'
  | 'bulleted-list'
  | 'heading-one'
  | 'heading-two'
  | 'list-item'
  | 'numbered-list'
  | 'paragraph';

export type EmphasisTypes = 'bold' | 'italic' | 'underline' | 'code';

export type CustomElement = { type: ElementTypes; children: CustomText[] };

export type ToolbarButtonProps = { format: ElementTypes | EmphasisTypes; icon: string };

type CustomText = { text: string; bold?: boolean; italic?: boolean; code?: boolean };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
