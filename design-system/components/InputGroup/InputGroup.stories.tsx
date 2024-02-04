import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Input } from '#design-system/components';
import { LinkIcon } from '#design-system/icons';

import InputGroup, { InputGroupProps } from './InputGroup';

export default {
  title: 'Components/InputGroup',
  component: InputGroup,
  argTypes: {
    size: {
      defaultValue: 'medium',
      control: {
        type: 'radio',
      },
      options: ['medium', 'large'],
    },
    label: {
      defaultValue: 'Input label',
    },
    value: {
      control: 'disabled',
    },
    Append: {
      control: 'disabled',
    },
    Prepend: {
      control: 'disabled',
    },
  },
} as Meta;

const Template: Story<InputGroupProps> = (args) => {
  const [value, setValue]: any = useState('');

  return (
    <>
      <InputGroup>
        <Input
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          {...args}
        />
      </InputGroup>
      <pre style={{ marginTop: 10 }}>{JSON.stringify({ value }, null, 2)}</pre>
    </>
  );
};

export const Default = Template.bind({});

const WithPrependTemplate: Story<InputGroupProps> = (args) => {
  const [value, setValue]: any = useState('');

  return (
    <>
      <InputGroup>
        <InputGroup.Prepend>
          <LinkIcon />
        </InputGroup.Prepend>
        <Input
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          {...args}
        />
      </InputGroup>
      <pre style={{ marginTop: 10 }}>{JSON.stringify({ value }, null, 2)}</pre>
    </>
  );
};

export const WithPrepend = WithPrependTemplate.bind({});

const WithAppendTemplate: Story<InputGroupProps> = (args) => {
  const [value, setValue]: any = useState('');

  return (
    <>
      <InputGroup>
        <Input
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          {...args}
        />
        <InputGroup.Append>
          <LinkIcon />
        </InputGroup.Append>
      </InputGroup>
      <pre style={{ marginTop: 10 }}>{JSON.stringify({ value }, null, 2)}</pre>
    </>
  );
};

export const WithAppend = WithAppendTemplate.bind({});

const WithPrependAndAppendTemplate: Story<InputGroupProps> = (args) => {
  const [value, setValue]: any = useState('');

  return (
    <>
      <InputGroup>
        <InputGroup.Append>
          <LinkIcon />
        </InputGroup.Append>
        <Input
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          {...args}
        />
        <InputGroup.Append>
          <LinkIcon />
        </InputGroup.Append>
      </InputGroup>
      <pre style={{ marginTop: 10 }}>{JSON.stringify({ value }, null, 2)}</pre>
    </>
  );
};

export const WithPrependAndAppend = WithPrependAndAppendTemplate.bind({});
