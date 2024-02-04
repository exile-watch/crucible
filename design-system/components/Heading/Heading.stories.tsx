import React from 'react';
import { Meta, Story } from '@storybook/react';

import Heading, { HeadingProps } from './Heading';

export default {
  title: 'Components/Heading',
  component: Heading,
  argTypes: {
    className: {
      control: 'disabled',
    },
  },
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args}>Heading</Heading>;

export const Default = Template.bind({});
