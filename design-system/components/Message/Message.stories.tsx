import React from 'react';
import { Meta, Story } from '@storybook/react';

import Message, { MessageProps } from './Message';

export default {
  title: 'Components/Message',
  component: Message,
  type: {
    defaultValue: 'info',
  },
} as Meta;

const Template: Story<MessageProps> = (args) => <Message {...args}>Shiny message</Message>;

export const Info = Template.bind({});
Info.args = { type: 'info' };

export const Locked = Template.bind({});
Locked.args = { type: 'locked' };

export const Success = Template.bind({});
Success.args = { type: 'success' };

export const Warning = Template.bind({});
Warning.args = { type: 'warning' };

export const Error = Template.bind({});
Error.args = { type: 'error' };

export const Small = Template.bind({});
Small.args = { size: 'small', type: 'info' };
