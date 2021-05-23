import React, { useEffect, useState } from 'react';

import { Message, Select } from '#design-system/components';
import {
  addDetrimentalMapMod,
  removeDetrimentalMapMod,
  selectDetrimentalMapMods,
} from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import EditorSectionWrapper from '../EditorSectionWrapper';

import styles from './DetrimentalMapMods.module.scss';

const DetrimentalMapMods = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const selectedItems = useSelector(selectDetrimentalMapMods);

  useEffect(() => {
    setIsLoading(true);
    import(`../../../../../features/builds/extracted-data/map-mods.json`)
      .then((d) => {
        setData(d.default);
        setIsLoading(false);
      })
      .catch(() => {
        setData(null);
        setIsLoading(false);
      });
  }, []);

  const handleItemSelect = (item) => dispatch(addDetrimentalMapMod(item.selectedItem));
  const handleItemDeselect = (item) => dispatch(removeDetrimentalMapMod(item));
  const msgType = () => {
    if (selectedItems.length === 4) return 'warning';
    if (selectedItems.length === 5) return 'error';
    return 'info';
  };
  return (
    <EditorSectionWrapper section="Detrimental Map Mods">
      <Message type={msgType()} size="small" className="mb-3">
        You can select up to{' '}
        <b>
          <u>5</u>
        </b>{' '}
        map mods. (
        <b>
          <u>{selectedItems.length}</u>
        </b>
        /5)
      </Message>
      <Select
        id="detrimental-map-mods-select"
        items={Object.values(data)}
        selectedItems={selectedItems}
        onSelectedItemChange={handleItemSelect}
        itemsLimit={5}
      />
      <ul>
        {selectedItems.map((detrimentalMapMod) => (
          <li
            key={`selected_dmm_${detrimentalMapMod.value}`}
            className={styles.detrimentalMapModItem}
          >
            <p>{detrimentalMapMod.label}</p>
            <span onClick={() => handleItemDeselect(detrimentalMapMod.value)}>x</span>
          </li>
        ))}
      </ul>
    </EditorSectionWrapper>
  );
};

export default DetrimentalMapMods;
