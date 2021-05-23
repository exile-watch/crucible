import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import startCase from 'lodash/startCase';

import { SearchIcon } from '#assets/icons';
import { Badge, Loader } from '#design-system/components';
import useOnClickOutside from '#hooks/useOnClickOutside';
import useRouter from '#hooks/useRouter';
import { IndexedSearchResultsProps } from '#types';
import importDataOnDemand from '#utils/importDataOnDemand';

import Results from './Results/Results';

import styles from './InputWithResults.module.scss';

const InputWithResults = () => {
  const [value, setInputValue] = useState<string>('');
  const [data, setData] = useState<IndexedSearchResultsProps>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [areResultsOpen, setAreResultsOpen] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const {
    query: { ability, boss },
  } = useRouter();
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    !isLoading && setInputValue(e.target.value);

  const handleClear = () => setInputValue('');

  const handleIconClick = () => inputEl.current?.focus();

  const handleFocus = () => {
    setAreResultsOpen(true);
    if (data) return;

    setIsLoading(true);
    importDataOnDemand({ feature: 'encounters', fileName: 'indexed-search' })
      .then((d) => {
        setData(d);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setData(null);
        setIsLoading(false);
      });
  };

  const handleClose = () => setAreResultsOpen(false);
  useOnClickOutside(inputContainerRef, handleClose);

  useEffect(() => {
    const inputValueFromUrl = !!ability ? startCase(ability) : startCase(boss);
    setInputValue(inputValueFromUrl);
  }, [ability, boss]);

  return (
    <div className={styles.inputWrapper} ref={inputContainerRef}>
      <SearchIcon
        className={cx(areResultsOpen && styles.iconFocused, styles.icon)}
        onClick={handleIconClick}
      />
      <input
        onChange={handleChange}
        onFocus={handleFocus}
        className={cx('pl-2 py-1', areResultsOpen && styles.inputFocused, styles.input)}
        ref={inputEl}
        value={value}
        placeholder="Eradicator, Whirling Charge..."
      />

      {isLoading && <Loader className={cx('mr-2', styles.loader)} size={20} thickness={2} />}

      {!isLoading && value.length > 0 && (
        <>
          <Badge className={cx('mr-2', styles.clearInput)} onClick={handleClear}>
            clear
          </Badge>
          {areResultsOpen && <Results data={data} inputValue={value} onClick={handleClose} />}
        </>
      )}
    </div>
  );
};

export default InputWithResults;
