import React, { useState } from 'react';
import cx from 'classnames';
import { useCombobox } from 'downshift';

import { ArrowDownIcon } from '#assets/icons';

import styles from './Select.module.scss';

type SelectOptionTypes = {
  label: string;
  value: string | number;
}[];

type SelectProps = {
  id: string;
  itemsLimit?: number;
  selectedItems: SelectOptionTypes;
  items: SelectOptionTypes;
  onSelectedItemChange: any;
};

const Select = ({
  id,
  onSelectedItemChange,
  items,
  selectedItems,
  itemsLimit = 100,
}: SelectProps) => {
  const [inputItems, setInputItems] = useState(items);
  const getInputFilteredItems = inputItems.filter(
    (item) => !selectedItems.find((s) => s.value === item.value)
  );
  const disabled = selectedItems.length === itemsLimit;

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    id,
    items: getInputFilteredItems,
    onSelectedItemChange,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) => item.label.toLowerCase().includes((inputValue || '').toLowerCase()))
      );
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: state.highlightedIndex,
            inputValue: '',
          };
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            inputValue: '',
          };
        default:
          return changes;
      }
    },
  });

  return (
    <div className={styles.selectWrapper}>
      <div {...getComboboxProps()} className={styles.inputWrapper}>
        <input
          {...getInputProps({ id: `${id}-input` })}
          className={styles.input}
          placeholder="Select map mod"
        />
        <ArrowDownIcon
          {...getToggleButtonProps()}
          aria-label="toggle menu"
          className={cx(styles.icon, isOpen && styles.iconActive)}
        />
      </div>
      <ul {...getMenuProps()} className={cx('mt-2', styles.items)}>
        {isOpen &&
          getInputFilteredItems.map((item, index) => (
            <li
              className={cx('px-2 py-1', styles.item, disabled && styles.itemDisabled)}
              key={`${item}${index}`}
              {...getItemProps({ item, index, disabled })}
            >
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Select;
