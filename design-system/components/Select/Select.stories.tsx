import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Select, { SelectProps } from './Select';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    id: {
      control: 'disabled',
    },
    items: {
      control: 'disabled',
    },
    selectedItems: {
      control: 'disabled',
    },
    onSelectedItemChange: {
      control: 'disabled',
    },
  },
} as Meta;

const Template: Story<SelectProps> = ({
  onSelectedItemChange,
  items,
  selectedItems,
  id = 'select',
  ...args
}) => {
  type Items = { label: string; value: number }[];
  const internalItems: Items = [
    { label: 'chaos', value: 0 },
    { label: 'exalt', value: 1 },
    { label: 'mirror', value: 2 },
  ];
  const [internalSelectedItems, setInternalSelectedItems] = useState<Items>([]);

  const handleSelect = (v: any) =>
    setInternalSelectedItems([...internalSelectedItems, v.selectedItem]);
  const handleDeselect = (v: number) =>
    setInternalSelectedItems(internalSelectedItems.filter((s) => s.value !== v));

  return (
    <>
      <Select
        id={id}
        items={Object.values(internalItems)}
        selectedItems={internalSelectedItems}
        onSelectedItemChange={handleSelect}
        itemsLimit={5}
        {...args}
      />
      <p>
        {internalSelectedItems.map((s: any) => (
          <p key={s.value}>
            {s.label} | <span onClick={() => handleDeselect(s.value)}>remove</span>
          </p>
        ))}
      </p>
      <pre style={{ marginTop: 10 }}>
        {JSON.stringify({ selectedItems: internalSelectedItems }, null, 2)}
      </pre>
    </>
  );
};

export const Default = Template.bind({});

export const WithItemsLimit = Template.bind({});
WithItemsLimit.args = { itemsLimit: 1 };
