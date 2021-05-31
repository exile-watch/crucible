import React from 'react';
import cx from 'classnames';

import { selectSkillsActiveRow, setActiveSkillsRow } from '#features/builds/slices/buildSlice';
import { SocketsType } from '#features/builds/types/Gems';
import { useDispatch, useSelector } from '#hooks/useStore';

import styles from './Sockets.module.scss';

type SocketsProps = {
  category: SocketsType;
  gridAreaType: string;
  row?: number;
  inModal?: boolean;
};

const Sockets = ({ category, gridAreaType, row, inModal }: SocketsProps) => {
  // Can't have row as 0 since this is treated as "false" in js...
  const gridArea = row ? `skills-${gridAreaType}-s-${row}` : `skills-${gridAreaType}-s`;
  const dispatch = useDispatch();
  const activeSkillsRow = useSelector(selectSkillsActiveRow);
  const handleToggleActiveSkillsRow = () => inModal && dispatch(setActiveSkillsRow(gridArea));

  return (
    <ul
      className={cx(styles.socketsWrapper, {
        [styles.socketsInModal]: inModal,
        [styles.isActiveRow]: activeSkillsRow === gridArea && inModal,
      })}
      style={{ gridArea }}
      onClick={handleToggleActiveSkillsRow}
    >
      {category.map((_, i) => {
        const firstSocket = i === 0;
        const lastSocket = i === 5;
        const key = row
          ? `${inModal ? 'modal-' : ''}${gridArea}-${i}`
          : `${inModal ? 'modal-' : ''}${gridArea}-${i}`;
        return (
          <li
            key={key}
            className={cx(
              { [styles.primary]: firstSocket, [styles.last]: lastSocket },
              styles.socket
            )}
          >
            {/*<img alt="x" src={s.gemImg}/>*/}
          </li>
        );
      })}
    </ul>
  );
};

export default Sockets;
