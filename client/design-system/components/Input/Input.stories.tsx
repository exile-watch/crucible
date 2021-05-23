import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Input, { InputProps } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
    label: {
      defaultValue: 'Input label',
    },
    size: {
      defaultValue: 'medium',
      control: {
        type: 'radio',
      },
      options: ['medium', 'large'],
    },
  },
} as Meta;

const Template: Story<InputProps> = (args) => {
  const [value, setValue]: any = useState('');

  return (
    <>
      <Input
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
