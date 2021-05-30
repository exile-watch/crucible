import React, { ChangeEvent, useEffect, useState } from 'react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { Button, Heading, Input, InputGroup, Loader } from '#design-system/components';
import { AddIcon } from '#design-system/icons';
import GemImages from '#features/builds/components/EditorSections/Skills/SkillsModal/SkillsList/GemImages/GemImages';
import { AttributeAbbrTypes, AttributeTypes, GemsDataType } from '#features/builds/types/Gems';

import styles from './SkillsList.module.scss';

type ListByAttributeProps = { data: GemsDataType; attribute: AttributeTypes };

const ListByAttribute = ({ data, attribute }: ListByAttributeProps) => {
  const attributeAbbr = attribute.substring(0, 3).toLowerCase() as AttributeAbbrTypes;

  return (
    <>
      <div style={{ gridArea: 'gems-actives' }}>
        <Heading as="h4">Actives</Heading>
        <GemImages data={data.gems[attributeAbbr].actives} keyPrefix={`${attributeAbbr}_actives`} />
      </div>
      <div style={{ gridArea: 'gems-supports' }}>
        <Heading as="h4">Supports</Heading>
        <GemImages
          data={data.gems[attributeAbbr].supports}
          keyPrefix={`${attributeAbbr}_supports`}
        />
      </div>
      <div style={{ gridArea: 'gems-auras' }}>
        <Heading as="h4">Auras</Heading>
        <GemImages data={data.gems[attributeAbbr].auras} keyPrefix={`${attributeAbbr}_auras`} />
      </div>
      <div style={{ gridArea: 'gems-curses' }}>
        <Heading as="h4">Curses & Marks</Heading>
        <GemImages data={data.gems[attributeAbbr].curses} keyPrefix={`${attributeAbbr}_curses`} />
      </div>
    </>
  );
};

const SkillsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<GemsDataType | {} | null>({});
  const [activeAttr, setActiveAttr] = useState<AttributeAbbrTypes>('str');
  const [searchValue, setSearchValue] = useState('');
  const isStr = activeAttr === 'str';
  const isDex = activeAttr === 'dex';
  const isInt = activeAttr === 'int';

  useEffect(() => {
    setIsLoading(true);
    import(`#features/builds/components/SkillTree/3.14/gems.json`)
      .then((d) => {
        setData(d.default);
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleAttrClick = (attr: AttributeAbbrTypes) => setActiveAttr(attr);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  return (
    <div className="ml-5">
      {isLoading && <Loader />}
      {!isLoading && isEmpty(data) && <p>No gems.</p>}
      {!isLoading && !data && <p>Failed to load gems.</p>}
      {!isLoading && !isEmpty(data) && (
        <>
          <div className={cx('mb-3', styles.cta)}>
            <div className={styles.attributeButtons}>
              <Button
                variant="secondary"
                size="large"
                className="mr-3"
                onClick={() => handleAttrClick('str')}
                inactive={!isStr}
              >
                Strength Gems
              </Button>
              <Button
                variant="secondary"
                size="large"
                className="mr-3"
                onClick={() => handleAttrClick('dex')}
                inactive={!isDex}
              >
                Dexterity Gems
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() => handleAttrClick('int')}
                inactive={!isInt}
              >
                Intelligence Gems
              </Button>
            </div>
            <InputGroup>
              <InputGroup.Prepend>
                <AddIcon />
              </InputGroup.Prepend>
              <Input value={searchValue} onChange={handleSearchChange} label="Gem Name or Tags" />
            </InputGroup>
          </div>
          <div className={cx('pr-3', styles.categories)}>
            {isStr && <ListByAttribute data={data as GemsDataType} attribute="Strength" />}
            {isDex && <ListByAttribute data={data as GemsDataType} attribute="Dexterity" />}
            {isInt && <ListByAttribute data={data as GemsDataType} attribute="Intelligence" />}
          </div>
        </>
      )}
    </div>
  );
};

export default SkillsList;
