import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Heading } from '#design-system/components';

import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    inactive: {
      control: 'boolean',
    },
    variant: {
      control: 'disabled',
    },
  },
} as Meta;

export const Preview: Story<ButtonProps> = (args) => (
  <>
    <Heading className="mb-1">Default</Heading>
    <div style={{ display: 'flex' }}>
      <Button className="mr-3" size={args.size}>
        Primary Button
      </Button>
      <Button className="mr-3" variant="secondary" size={args.size}>
        Secondary Button
      </Button>
      <Button variant="tertiary" size={args.size}>
        Tertiary Button
      </Button>
    </div>

    <Heading className="mt-4 mb-1">Inactive</Heading>
    <div style={{ display: 'flex' }}>
      <Button className="mr-3" inactive disabled={args.disabled}>
        Primary Button
      </Button>
      <Button
        className="mr-3"
        inactive
        variant="secondary"
        size={args.size}
        disabled={args.disabled}
      >
        Secondary Button
      </Button>
      <Button variant="tertiary" inactive size={args.size} disabled={args.disabled}>
        Tertiary Button
      </Button>
    </div>

    <Heading className="mt-4 mb-1">Disabled</Heading>
    <div style={{ display: 'flex' }}>
      <Button className="mr-3" disabled size={args.size} inactive={args.inactive}>
        Primary Button
      </Button>
      <Button
        className="mr-3"
        variant="secondary"
        disabled
        size={args.size}
        inactive={args.inactive}
      >
        Secondary Button
      </Button>
      <Button variant="tertiary" disabled size={args.size} inactive={args.inactive}>
        Tertiary Button
      </Button>
    </div>
  </>
);
