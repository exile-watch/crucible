import React from 'react';
import { Meta, Story } from '@storybook/react';

import Loader, { LoaderProps } from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
} as Meta;

const Template: Story<LoaderProps> = (args) => <Loader {...args} />;

export const Default = Template.bind({});
