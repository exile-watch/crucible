import React from 'react';
import cx from 'classnames';
import { isEmpty, startCase } from 'lodash';

import { Button, Card, Input, Select } from '#design-system/components';
import * as icons from '#design-system/icons';
import { CrossIcon, TrashIcon } from '#design-system/icons';
import SkillRowInputs from '#features/builds/components/EditorSections/Skills/SkillsModal/SkillsRow/SkillRowInputs/SkillRowInputs';
import {
  addDraftSkillOrdinalNumber,
  addDraftSkillRow,
  editDraftSkillRow,
  removeDraftSkillOrdinalNumber,
  removeDraftSkillRow,
  removeDraftSkillSlot,
  selectDraftSkills,
} from '#features/builds/slices/buildSlice';
import { SkillsType, SocketsType } from '#features/builds/types/Gems';
import { useDispatch, useSelector } from '#hooks/useStore';

import styles from './SkillsRow.module.scss';

const mainSlots = ['mainhand', 'offhand', 'mainhand_swap', 'offhand_swap', 'body'];

const SkillsRow = () => {
  const dispatch = useDispatch();
  const draftSkills = useSelector(selectDraftSkills);

  const handleInputChange = (e, { slot, ordinalNumber, index, type }) => {
    const maxSkillRows = 5;
    const maxOrdinalNumbers = 3;
    dispatch(
      editDraftSkillRow({
        slot,
        ordinalNumber,
        index,
        [type]: e.target.value,
      })
    );

    //TODO: replace .slice(-1)[0] with .at(-1) once its in stage 4
    if (index < maxSkillRows && !isEmpty(draftSkills?.[slot]?.[ordinalNumber]?.slice(-1)[0]?.gem)) {
      dispatch(addDraftSkillRow({ slot, ordinalNumber }));
    }
    if (
      mainSlots.includes(slot) &&
      ordinalNumber < maxOrdinalNumbers &&
      !isEmpty(draftSkills?.[slot]?.[ordinalNumber]?.[0]?.gem) &&
      !draftSkills?.[slot]?.[ordinalNumber + 1]
    ) {
      dispatch(addDraftSkillOrdinalNumber({ slot }));
    }
  };

  const handleRemoveClick = ({ slot, ordinalNumber, index }) => {
    dispatch(removeDraftSkillRow({ slot, ordinalNumber, index }));
  };

  const handleRemoveOrdinalNumberClick = ({ slot, ordinalNumber }) => {
    dispatch(removeDraftSkillOrdinalNumber({ slot, ordinalNumber }));
  };

  const handleRemoveSlotClick = (slot) => dispatch(removeDraftSkillSlot(slot));

  return (
    <ul className={cx('my-3 pr-3', styles.skillsRow)}>
      {Object.entries(draftSkills).map(({ 0: slot, 1: skills }) => {
        const [splitIcon] = slot.split('_');
        // @ts-ignore
        const Icon = icons[`${startCase(splitIcon)}Icon`];

        return (
          <li key={`skills-modal-draft-${slot}`} className={cx('my-4', styles.skillWrapper)}>
            <div className={cx('mb-3', styles.slotWrapper)}>
              <p>{slot}</p>
              <Button variant="secondary" onClick={() => handleRemoveSlotClick(slot)}>
                Remove {slot}
              </Button>
            </div>
            <div className={styles.inputsWrapper}>
              <Icon />
              <div className={cx('ml-3', styles.ordinalNumberWrapper)}>
                {Object.values(skills as Array<SocketsType>).map(
                  (ordinalNumberSkills, ordinalNumber) => (
                    <Card
                      as="ul"
                      key={`skills-modal-draft-${slot}-${ordinalNumber}`}
                      className={cx('mt-1', styles.ordinalNumber)}
                    >
                      <div className={styles.ordinalNumberHeading}>
                        {ordinalNumber === 0 && <p>Primary</p>}
                        {ordinalNumber === 1 && <p>Secondary</p>}
                        {ordinalNumber === 2 && <p>Tertiary</p>}
                        {ordinalNumber === 3 && <p>Quaternary</p>}
                        <Button
                          variant="tertiary"
                          className="px-1"
                          onClick={() => handleRemoveOrdinalNumberClick({ slot, ordinalNumber })}
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                      <div className={cx('mt-1', styles.divider)} />
                      <div className={styles.rowInputs}>
                        <div className="mt-3">
                          <div style={{ gridArea: 'skill-row-modal-gemHeading' }}>Gem</div>
                          <div style={{ gridArea: 'skill-row-modal-levelHeading' }}>Level</div>
                          <div style={{ gridArea: 'skill-row-modal-qualityHeading' }}>Quality</div>
                        </div>
                        {ordinalNumberSkills.map((ordinalNumberSkill, i) => (
                          <SkillRowInputs
                            key={`skills-modal-draft-${slot}-${ordinalNumber}-${i}-input`}
                            slot={slot}
                            index={i}
                            onChange={handleInputChange}
                            ordinalNumber={ordinalNumber}
                            ordinalNumberSkill={ordinalNumberSkill}
                            onRemove={handleRemoveClick}
                          />
                        ))}
                      </div>
                    </Card>
                  )
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SkillsRow;
