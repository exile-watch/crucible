import React, { useEffect, useRef } from 'react';

import { Loader, MissingContent } from '#design-system/components';
import useOnScreen from '#hooks/useOnScreen';

import styles from './Video.module.scss';

type VideoProps = {
  src?: string;
  isActive: boolean;
  abilityName?: string;
};

// @ts-ignore
const Video = ({ src, isActive, abilityName }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen<HTMLDivElement | null>(videoContainerRef.current);
  const setPlayBack = () => {
    if (videoRef.current) videoRef.current.playbackRate = 1.5;
  };

  useEffect(() => {
    if (videoRef.current && isVisible) videoRef.current.play();
    if (videoRef.current && !isVisible) videoRef.current.pause();
  }, [isVisible]);

  // const play = () => {
  //   if(ref.current) ref.current.play();
  // }
  //
  // const pause = () => {
  //   if(ref.current) ref.current.pause();
  // }

  return (
    <div className={styles.videoWrapper} ref={videoContainerRef}>
      {!src && <MissingContent abilityName={abilityName} missingContentType="Video Source" />}
      {src && (
        <>
          <Loader className={styles.loader} size={40} />
          <video
            className={styles.video}
            autoPlay={isVisible}
            muted
            loop
            playsInline
            key={src}
            ref={videoRef}
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
