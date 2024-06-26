import toLower from "lodash/toLower";
import React from "react";

import Result from "./Result";

import type { IndexedSearchType } from "@exile-watch/encounter-data";
import { Combobox, Text } from "@exile-watch/writ-react";

type ResultsProps = {
  inputValue: string;
  indexedSearch: IndexedSearchType | [];
};

const filterResults = (
  inputValue: string,
  indexedSearch: IndexedSearchType | [],
) => {
  return Object.entries(indexedSearch)?.map(([category, data]) => {
    const filteredData = data.filter(
      ({ mapName, encounterName, encounterAbilityName }) => {
        const loweredInputValue = toLower(inputValue);
        const loweredMapName = toLower(mapName);
        const loweredEncounterName = toLower(encounterName);
        const loweredEncounterAbilityName = toLower(encounterAbilityName);

        return [
          loweredMapName,
          loweredEncounterName,
          loweredEncounterAbilityName,
        ].some((name) => name.includes(loweredInputValue));
      },
    );

    return { [category]: filteredData };
  });
};

const GroupLabel = ({ label, length }: any) => {
  const limitedResults = length > 5 ? "(showing 5)" : "";
  const pluralResults = length > 1 ? "results" : "result";
  return `${label} - ${length} ${pluralResults} ${limitedResults}`;
};

const Results = ({ inputValue, indexedSearch }: ResultsProps) => {
  const results = filterResults(inputValue, indexedSearch);
  const emptyResults = results.every((v) => {
    const [w] = Object.values(v);
    return w.length === 0 ? true : false;
  });
  return (
    <Combobox.Dropdown>
      {emptyResults && (
        <Combobox.Options>
          <Text size="sm" px="md" py={4} c="dimmed">
            No results found
          </Text>
        </Combobox.Options>
      )}
      {!emptyResults &&
        results?.map((data: any, i) => {
          const mapsLength = data.maps?.length;
          const encountersLength = data.encounters?.length;
          const encounterAbilitiesLength = data.encounterAbilities?.length;

          return (
            <Combobox.Options key={`indexed-search-option-${i}`}>
              {mapsLength > 0 && (
                <Combobox.Group
                  label={<GroupLabel label="Maps" length={mapsLength} />}
                >
                  {data.maps.slice(0, 5).map((d: any) => (
                    <Result key={d.mapPath} {...d} />
                  ))}
                </Combobox.Group>
              )}

              {encountersLength > 0 && (
                <Combobox.Group
                  label={
                    <GroupLabel label="Encounters" length={encountersLength} />
                  }
                >
                  {data.encounters.slice(0, 5).map((d: any) => (
                    <Result key={d.encounterPath} {...d} />
                  ))}
                </Combobox.Group>
              )}

              {encounterAbilitiesLength > 0 && (
                <Combobox.Group
                  label={
                    <GroupLabel
                      label="Encounters' abilities"
                      length={encounterAbilitiesLength}
                    />
                  }
                >
                  {data.encounterAbilities.slice(0, 5).map((d: any) => (
                    <Result key={d.encounterAbilityPath} {...d} />
                  ))}
                </Combobox.Group>
              )}
            </Combobox.Options>
          );
        })}
    </Combobox.Dropdown>
  );
};

export default Results;
