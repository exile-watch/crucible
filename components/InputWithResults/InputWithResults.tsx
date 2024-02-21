import React, {useState} from 'react';
import Results from './Results/Results';
import {Combobox, InputBase, useCombobox} from "@mantine/core";
import {IconSearch} from '@tabler/icons-react'
import {useIsMobile} from "#hooks/useIsMobile";

const InputWithResults = ({isOpen, toggle}) => {
  const {isMobile} = useIsMobile()
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
        isOpen && toggle()
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
          p={isMobile ? 8 : 0}
          w={isMobile ? "100%" : "400px"}
        />
      </Combobox.Target>
      <Results inputValue={search} />
    </Combobox>
  )
};

export { InputWithResults };
