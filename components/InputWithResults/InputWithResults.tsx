import React, {useEffect, useRef, useState} from 'react';
import {SearchIcon} from "#assets/icons";
import cn from "classnames";
import styles from "./InputWithResults.module.scss";
import Results from "./Results/Results";
import {IndexedSearchResultsProps} from "#types";
import Loader from "#components/Loader/Loader";
import Badge from "#components/Badge/Badge";
import {useRouter} from "next/router";
import importDataOnDemand from "#utils/importDataOnDemand";
import useOnClickOutside from "#hooks/useOnClickOutside";
import startCase from 'lodash/startCase';

const InputWithResults = () => {
  const inputContainerRef = useRef<HTMLDivElement>(null)

  const [value, setInputValue] = useState<string>('');
  const [data, setData] = useState<IndexedSearchResultsProps>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [areResultsOpen, setAreResultsOpen] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null)
  const {query: {ability, boss}}: any = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => !isLoading && setInputValue(e.target.value)

  const handleClear = () => setInputValue('');

  const handleIconClick = () => inputEl.current?.focus()

  const handleFocus = () => {
    setAreResultsOpen(true)
    if (data) return;

    setIsLoading(true)
    importDataOnDemand({fileName: 'indexed-search'})
      .then(d => {
        setData(d)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setData(null)
        setIsLoading(false)
      })
  }

  const handleClose = () => setAreResultsOpen(false)
  useOnClickOutside(inputContainerRef, handleClose)

  useEffect(() => {
    const inputValueFromUrl = !!ability ? startCase(ability) : startCase(boss)
    setInputValue(inputValueFromUrl)
  }, [ability, boss])

  return (
    <div className={styles.inputWrapper} ref={inputContainerRef}>
      <SearchIcon className={cn(areResultsOpen && styles.iconFocused, styles.icon)} onClick={handleIconClick} />
      <input onChange={handleChange}
             onFocus={handleFocus}
             className={cn('pl-2 py-1', areResultsOpen && styles.inputFocused, styles.input)}
             ref={inputEl}
             value={value} placeholder="Eradicator, Whirling Charge..."
      />

      {isLoading && <Loader className={cn('mr-2', styles.loader)} size={20} thickness={2}/>}

      {!isLoading && value.length > 0 && (
        <>
          <Badge className={cn('mr-2', styles.clearInput)} onClick={handleClear}>clear</Badge>
          {areResultsOpen && <Results data={data} inputValue={value} onClick={handleClose}/>}
        </>
      )}
    </div>
  );
}

export default InputWithResults;