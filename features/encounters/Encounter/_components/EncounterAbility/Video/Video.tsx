import React, { useEffect, useRef } from "react";

// import { Loader, MissingContent } from '@exile-watch/writ-react';

import { Loader, Text } from "@exile-watch/writ-react";
import cx from "classnames";
import { useIntersectionObserver } from "#hooks/useIntersectionObserver";
import styles from "./Video.module.scss";

type VideoProps = {
  src?: string;
  isActive?: boolean;
  abilityName?: string;
  speed?: number;
  isOnHomepage?: boolean;
  isOnWelcomePage?: boolean;
};

// @ts-ignore
const Video = ({
  src,
  // isActive,
  // abilityName,
  speed,
  isOnHomepage,
  isOnWelcomePage,
}: VideoProps) => {
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
    <div
      className={cx(styles.videoWrapper, {
        [styles.onWelcomePage]: isOnWelcomePage,
      })}
      ref={videoContainerRef}
    >
      {!src && <Text c="dimmed">Something went wrong</Text>}
      {src && (
        <>
          <Loader className={styles.loader} size={40} />
          <video
            className={cx(styles.video, {
              [styles.videoOnHomepage]: isOnHomepage,
            })}
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
