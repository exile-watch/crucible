import React from 'react';
import { Meta, Story } from '@storybook/react';

import { TextEditor } from '../../../design-system/components';
import Card, { CardProps } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    locked: {
      defaultValue: false,
      control: 'boolean',
    },
  },
} as Meta;

export const WithParagraph: Story<CardProps> = (args) => (
  <Card {...args}>
    <p>Some card content</p>
  </Card>
);

export const WithTextEditor: Story<CardProps> = (args) => (
  <Card {...args}>
    <TextEditor
      value={[
        {
          type: 'paragraph',
          children: [{ text: 'Some text editor value' }],
        },
      ]}
      onChange={() => ({})}
    />
  </Card>
);
