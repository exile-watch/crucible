import React from 'react';
import toLower from 'lodash/toLower';

import Result from './Result';

import {Combobox} from "@mantine/core";
import {indexedSearch} from "@exile-watch/encounter-data";

type ResultsProps = {
  inputValue: string;
};

const filterResults = (inputValue: string) => Object.entries(indexedSearch)?.map(([category, data]) => {
  const filteredData = data.filter(({mapName, encounterName, encounterAbilityName}) => {
    const loweredInputValue = toLower(inputValue);
    const loweredMapName = toLower(mapName);
    const loweredEncounterName = toLower(encounterName);
    const loweredEncounterAbilityName = toLower(encounterAbilityName);

    return [loweredMapName, loweredEncounterName, loweredEncounterAbilityName].some((name) =>
      name.includes(loweredInputValue)
    );
  })

  return {[category]: filteredData}
})

const GroupLabel = ({label, length}) => {
  const limitedResults = length > 5 ? '(showing 5)' : '';
  const pluralResults = length > 1 ? 'results' : 'result';
  return `${label} - ${length} ${pluralResults} ${limitedResults}`
}

const Results = ({ inputValue }: ResultsProps) => {
  const results = filterResults(inputValue)

  return (
    <Combobox.Dropdown>
      {results?.map((data, i) => {
        const mapsLength = data.maps?.length;
        const encountersLength = data.encounters?.length;
        const encounterAbilitiesLength = data.encounterAbilities?.length;

        return (
        <Combobox.Options key={`indexed-search-option-${i}`}>
          {mapsLength > 0 && (
            <Combobox.Group label={<GroupLabel label="Maps" length={mapsLength} />}>
              {data.maps.slice(0, 5).map(d => <Result key={d.mapPath} {...d}/>)}
            </Combobox.Group>
          )}

          {encountersLength > 0 && (
            <Combobox.Group label={<GroupLabel label="Encounters" length={encountersLength} />}>
              {data.encounters.slice(0, 5).map(d => <Result key={d.encounterPath} {...d}/>)}
            </Combobox.Group>
          )}

          {encounterAbilitiesLength > 0 && (
            <Combobox.Group label={<GroupLabel label="Encounters' abilities" length={encounterAbilitiesLength} />}>
              {data.encounterAbilities.slice(0, 5).map(d => <Result key={d.encounterAbilityPath} {...d}/>)}
            </Combobox.Group>
          )}
        </Combobox.Options>
      )}
      )}

    </Combobox.Dropdown>
  );
};

export default Results;
