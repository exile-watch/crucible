import React from 'react';
import cx from 'classnames';
import Image from 'next/image';

import { Button } from '#design-system/components';
import { GemType } from '#features/builds/types/Gems';

import styles from './GemImages.module.scss';

type GemImagesProps = {
  data: GemType[];
  keyPrefix: string;
};

const GemImages = ({ data, keyPrefix }: GemImagesProps) => {
  return (
    <ul className={cx('mt-3', styles.imagesList)}>
      {data.map((gem) => (
        <li key={`skills_modal_skill_list_${keyPrefix}_${gem.id}`}>
          <Button variant="tertiary" className={styles.button}>
            <Image src={gem.img} alt={gem.id} width={35} height={35} />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default GemImages;
