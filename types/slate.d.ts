import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

import { BaseEditor } from '#types/slate';

export type ElementTypes =
  | 'quote'
  | 'bulleted-list'
  | 'heading-one'
  | 'heading-two'
  | 'list-item'
  | 'numbered-list'
  | 'paragraph';

export type EmphasisTypes = 'bold' | 'italic' | 'underline' | 'code';

export type CustomElement = { type: ElementTypes; children: CustomText[] };

type CustomText = { text: string; bold?: boolean; italic?: boolean; code?: boolean };

declare module '#types/slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
