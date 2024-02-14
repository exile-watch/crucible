import React, { useState } from 'react';
import Results from './Results/Results';
import {Combobox, InputBase, useCombobox} from "@mantine/core";
import {IconSearch} from '@tabler/icons-react'

const InputWithResults = () => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [search, setSearch] = useState('');

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setSearch(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          pointer
          leftSection={<IconSearch size={14} />}
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          placeholder="Arcade, Eradicator, Storm..."
          value={search}
          onChange={(event) => {
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => {
            combobox.toggleDropdown()
          }}
          w="300px"
        />
      </Combobox.Target>
      <Results inputValue={search} />
    </Combobox>
  )
};

export { InputWithResults };
