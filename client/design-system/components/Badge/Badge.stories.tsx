import React from 'react';
import { Meta, Story } from '@storybook/react';

import Badge, { BadgeProps } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args}>Neat badge</Badge>;

export const Default = Template.bind({});
