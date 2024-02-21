import React, {useEffect, useRef, useState} from 'react';

import { Loader, MissingContent } from '@exile-watch/writ-react';

import styles from './Video.module.scss';
import {useIntersection} from "@mantine/hooks";
import {useIntersectionObserver} from "#hooks/useIntersectionObserver";

type VideoProps = {
  src?: string;
  isActive?: boolean;
  abilityName?: string;
  speed?: number;
};



// @ts-ignore
const Video = ({ src, isActive, abilityName, speed }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  // const isVisible = useOnScreen<HTMLDivElement | null>(videoContainerRef.current);

  const isVisible = useIntersectionObserver(videoContainerRef, {
    root: null,
    threshold: 0.25,
  });

  const setPlayBack = () => {
    if (videoRef.current) videoRef.current.playbackRate = speed || 1.5;
  };

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isVisible]);

  // useEffect(() => {
  //   if (videoRef.current && entry?.isIntersecting) videoRef.current.play();
  //   // if (videoRef.current && !entry?.isIntersecting) videoRef.current.pause();
  // }, [ref, entry?.isIntersecting]);
  // console.log(entry?.isIntersecting);
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
