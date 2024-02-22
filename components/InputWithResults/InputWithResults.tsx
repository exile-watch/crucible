import React, {useEffect, useState} from 'react';
import Results from './Results/Results'
import {Combobox, InputBase, useCombobox} from "@mantine/core";
import {IconSearch} from '@tabler/icons-react'
import {useIsMobile} from "#hooks/useIsMobile";

const InputWithResults = ({isOpen, toggle}) => {
  const {isMobile} = useIsMobile()
  const [firstTimeClicked, setFirstTimeClicked] = useState(false)
  const [indexedSearch, setIndexedSearch] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [search, setSearch] = useState('');

  const loadData = async () => {
    const indexedSearch = await import((`@exile-watch/encounter-data/dist/extracted-data/indexed-search.esm` as string));
    setIndexedSearch(indexedSearch.default)
    setIsDataLoaded(true)
  }

  useEffect(() => {
    if(firstTimeClicked){
      void loadData()
    }
  }, [firstTimeClicked]);

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
            setFirstTimeClicked(true)
            combobox.toggleDropdown()
          }}
          p={isMobile ? 8 : 0}
          w={isMobile ? "100%" : "400px"}
        />
      </Combobox.Target>
      {isDataLoaded && <Results inputValue={search} indexedSearch={indexedSearch} />}
    </Combobox>
  )
};

export { InputWithResults };
export default InputWithResults
