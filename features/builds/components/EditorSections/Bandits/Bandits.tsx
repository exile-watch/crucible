import React, { useState } from 'react';
import cx from 'classnames';

import EditorSectionWrapper from '#features/builds/components/EditorSections/EditorSectionWrapper';
import { changeBandit, selectBandit } from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import BANDIT_OPTIONS from './bandit-options';

import styles from './Bandits.module.scss';

const Bandits = () => {
  const dispatch = useDispatch();
  const selectedBandit = useSelector(selectBandit);
  const [hoveredBandit, setHoveredBandit] = useState(selectedBandit);

  const handleBanditToggle = (banditValue: number | null) => setHoveredBandit(banditValue);
  const handleBanditClick = (banditValue: number) => {
    dispatch(changeBandit(banditValue));
  };

  return (
    <EditorSectionWrapper section="Bandits">
      <ul className={styles.bandits}>
        {BANDIT_OPTIONS.map((bandit) => (
          <li
            className={cx(styles.bandit, {
              [styles.active]: selectedBandit === bandit.value,
              [styles.inactive]: selectedBandit && selectedBandit !== bandit.value,
            })}
            key={bandit.label}
            onClick={() => handleBanditClick(bandit.value)}
            onMouseEnter={() => handleBanditToggle(bandit.value)}
            onMouseLeave={() => handleBanditToggle(selectedBandit || null)}
          >
            {bandit.label}
          </li>
        ))}
      </ul>

      {(selectedBandit || hoveredBandit) && (
        <ul className="mt-3">
          {BANDIT_OPTIONS.find((bandit) =>
            hoveredBandit ? bandit.value === hoveredBandit : bandit.value === selectedBandit
          )?.rewards.map((reward, i) => (
            <li className="mt-1" key={`reward_${selectedBandit || hoveredBandit}_${i}`}>
              {reward}
            </li>
          ))}
        </ul>
      )}
    </EditorSectionWrapper>
  );
};

export default Bandits;