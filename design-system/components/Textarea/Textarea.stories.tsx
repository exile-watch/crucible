import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Textarea, { TextareaProps } from './Textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<TextareaProps> = (args) => {
  const [value, setValue]: any = useState('');

  return (
    <>
      <Textarea
        {...args}
        value={value}
        onChange={(e: any) => {
          setValue(e.target.value);
        }}
      />
      <pre style={{ marginTop: 10 }}>{JSON.stringify({ value }, null, 2)}</pre>
    </>
  );
};

export const Default = Template.bind({});
