import React from 'react';
import {IndexedSearchResultsProps} from "#types";
import toLower from 'lodash/toLower';
import styles from './Results.module.scss';
import Result from "#components/InputWithResults/Results/Result";

type ResultsProps = {
  data: IndexedSearchResultsProps;
  inputValue: string;
  onClick: () => any;
}

const Results = ({data, inputValue, onClick}: ResultsProps) => {
  const results = data?.filter(({mapName, bossName, abilityName}) => {
    const loweredInputValue = toLower(inputValue);
    const loweredMapName = toLower(mapName);
    const loweredBossName = toLower(bossName);
    const loweredAbilityName = toLower(abilityName);

    return [loweredMapName, loweredBossName, loweredAbilityName].some(name => name.includes(loweredInputValue))
  })
  const resultsSortedByKeyLength = results?.sort((a, b) =>  Object.keys(a).length - Object.keys(b).length)
  const resultsLength = resultsSortedByKeyLength?.length || 0;

  return (
    <div className={styles.resultsWrapper}>
      {resultsLength > 0 && <div className="px-1">{resultsLength} result{resultsLength > 1 && 's'}</div>}
      {resultsLength === 0 && <div className="px-1">No results found</div>}
      <ul className={styles.results}>
        {resultsSortedByKeyLength?.map((d, i) => (
          <li key={`indexed_search_${i}`}>
            <Result {...d} onClick={onClick} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;