import React, { useRef } from 'react';

import NoSrc from '#components/Boss/BossAbilities/BossAbility/Video/NoSrc';
import Loader from '#components/Loader/Loader';

import styles from './Video.module.scss';

type VideoProps = {
  src?: string;
  isActive: boolean;
  abilityName: string;
};

// @ts-ignore
const Video = ({ src, isActive, abilityName }: VideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  const setPlayBack = () => {
    if (ref.current) ref.current.playbackRate = 1.5;
  };

  // const play = () => {
  //   if(ref.current) ref.current.play();
  // }
  //
  // const pause = () => {
  //   if(ref.current) ref.current.pause();
  // }

  return (
    <div className={styles.videoWrapper}>
      {!src && <NoSrc abilityName={abilityName} />}
      {src && (
        <>
          <Loader className={styles.loader} size={40} />
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            key={src}
            ref={ref}
            onCanPlay={setPlayBack}
          >
            <source src={src} type="video/mp4" />
          </video>
        </>
      )}
    </div>
  );
};

export default Video;
