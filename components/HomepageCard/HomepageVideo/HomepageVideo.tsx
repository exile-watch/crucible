import { HomepageObjType } from "@exile-watch/encounter-data";
import { Skeleton } from "@exile-watch/writ-react";
import cx from "classnames";
import React, { useEffect, useRef } from "react";
import styles from "./HomepageVideo.module.scss";

type HomepageVideo = {
  src: HomepageObjType["gif"];
  isParentHovering: boolean;
  isCategory?: boolean;
};

const HomepageVideo = ({
  src,
  isParentHovering,
  isCategory,
}: HomepageVideo) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isParentHovering) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isParentHovering]);

  const setPlayBack = () => {
    if (videoRef.current) videoRef.current.playbackRate = 1.5;
  };

  return (
    <div
      className={cx(styles.videoWrapper, {
        [styles.videoWrapperInCategory]: isCategory,
      })}
      ref={videoContainerRef}
    >
      <Skeleton height="100%" width="100%" className={styles.skeleton} />
      <video
        className={cx(styles.video, { [styles.videoInCategory]: isCategory })}
        autoPlay={false}
        muted
        loop
        playsInline
        key={src as string}
        ref={videoRef}
        onCanPlay={setPlayBack}
      >
        <source src={src as string} type="video/mp4" />
      </video>
    </div>
  );
};

export default HomepageVideo;
