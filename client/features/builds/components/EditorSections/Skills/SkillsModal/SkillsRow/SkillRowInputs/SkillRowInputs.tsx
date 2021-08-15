import React, { ChangeEvent } from 'react';
import cx from 'classnames';

import { Button, Input } from '#design-system/components';
import { CrossIcon } from '#design-system/icons';
import { BuildGemType, MainSlotTypes } from '#features/builds/types/Gems';

import styles from './SkillRowInputs.module.scss';

type SkillProps = {
  slot: MainSlotTypes;
  ordinalNumber: number;
  index: number;
  type?: 'gem' | 'level' | 'quality';
};

type SkillRowInputsProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>, { slot, index, ordinalNumber }: SkillProps) => void;
  onRemove: ({ slot, index, ordinalNumber }: SkillProps) => void;
  ordinalNumberSkill: BuildGemType;
} & SkillProps;

const SkillRowInputs = ({
  onChange,
  onRemove,
  slot,
  ordinalNumber,
  ordinalNumberSkill,
  index,
}: SkillRowInputsProps) => (
  <li className='mt-2'>
    <span style={{ gridArea: 'skill-row-modal-number' }}>#{index + 1}</span>
    <Input
      wrapperProps={{ style: { gridArea: 'skill-row-modal-gemInput' } }}
      placeholder="Multistrike Support"
      value={ordinalNumberSkill?.gem}
      onChange={(e) => onChange(e, { slot, ordinalNumber, index, type: 'gem' })}
    />
    <Input
      wrapperProps={{ style: { gridArea: 'skill-row-modal-levelInput' } }}
      placeholder="0 - 40"
      value={ordinalNumberSkill?.level}
      onChange={(e) => onChange(e, { slot, ordinalNumber, index, type: 'level' })}
    />
    <Input
      wrapperProps={{ style: { gridArea: 'skill-row-modal-qualityInput' } }}
      placeholder="0 - 60"
      value={ordinalNumberSkill?.quality}
      onChange={(e) => onChange(e, { slot, ordinalNumber, index, type: 'quality' })}
    />

    <Button
      style={{ gridArea: 'skill-row-modal-remove' }}
      className={cx('px-1', styles.button)}
      variant="tertiary"
      onClick={() => onRemove({ slot, ordinalNumber, index })}
    >
      <CrossIcon className={styles.icon} />
    </Button>
  </li>
);

export default SkillRowInputs;
