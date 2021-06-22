import React from 'react';

import { Button } from '#design-system/components';
import {
  BodyIcon,
  BootsIcon,
  GlovesIcon,
  HelmetIcon,
  MainhandIcon,
  OffhandIcon,
} from '#design-system/icons';
import { addVoidSlot, selectDraftSkills } from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import styles from '#features/builds/components/EditorSections/Skills/SkillsModal/SkillsModal.module.scss';

const SLOTS = [
  {
    label: 'Main Hand',
    Icon: MainhandIcon,
    value: 'mainhand',
  },
  {
    label: 'Offhand',
    Icon: OffhandIcon,
    value: 'offhand',
  },
  {
    label: 'Body',
    Icon: BodyIcon,
    value: 'body',
  },
  {
    label: 'Helmet',
    Icon: HelmetIcon,
    value: 'helmet',
  },
  {
    label: 'Gloves',
    Icon: GlovesIcon,
    value: 'gloves',
  },
  {
    label: 'Boots',
    Icon: BootsIcon,
    value: 'boots',
  },
  {
    label: 'Main Hand (swap)',
    Icon: MainhandIcon,
    value: 'mainhand_swap',
  },
  {
    label: 'Offhand (swap)',
    Icon: OffhandIcon,
    value: 'offhand_swap',
  },
];

const AddSlot = () => {
  const dispatch = useDispatch();
  const handleSlotClick = (slot) => dispatch(addVoidSlot(slot));
  const draftSkills = useSelector(selectDraftSkills);
  const draftSlots = Object.keys(draftSkills);

  return (
    <ul className={styles.slots}>
      {SLOTS.filter(({ value }) => !draftSlots.includes(value)).map(({ label, Icon, value }) => (
        <li key={`skills-modal-${label}`} className={styles.slot}>
          <Button
            variant="tertiary"
            className="p-3"
            inactive
            onClick={() => handleSlotClick(value)}
          >
            <Icon />
            {label}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default AddSlot;
