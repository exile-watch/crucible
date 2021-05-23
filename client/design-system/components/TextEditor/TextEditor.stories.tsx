import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import TextEditor, { TextEditorProps } from './TextEditor';

export default {
  title: 'Components/TextEditor',
  component: TextEditor,
} as Meta;

export const Default: Story<TextEditorProps> = (args) => {
  const [value, setValue]: any = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Some text editor value' }],
    },
  ]);
  return <TextEditor {...args} value={value} onChange={setValue}  />;
};
