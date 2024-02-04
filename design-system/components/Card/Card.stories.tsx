import React, { useState } from 'react';
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
    className: {
      control: 'disabled',
    },
    style: {
      control: 'disabled',
    },
    as: {
      control: 'disabled',
    },
  },
} as Meta;

export const WithParagraph: Story<CardProps> = (args) => (
  <Card {...args}>
    <p>Some card content</p>
  </Card>
);

export const WithTextEditor: Story<CardProps> = (args) => {
  const [value, setValue]: any = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Some text editor value' }],
    },
  ]);
  return (
    <Card {...args}>
      <TextEditor value={value} onChange={setValue} />
    </Card>
  );
};
