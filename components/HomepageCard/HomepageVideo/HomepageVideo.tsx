import React, {useEffect, useRef} from "react";
import styles from "./HomepageVideo.module.scss";
import {Skeleton} from "@exile-watch/writ-react";
import cx from "classnames";

const HomepageVideo = ({src, isParentHovering, isCategory}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(isParentHovering) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isParentHovering]);

  const setPlayBack = () => {
    if (videoRef.current) videoRef.current.playbackRate = 1.5;
  };

  return (
    <div className={cx(styles.videoWrapper, {[styles.videoWrapperInCategory]: isCategory})} ref={videoContainerRef}>
      <Skeleton height="100%" width="100%" className={styles.skeleton}/>
      <video
        className={cx(styles.video, {[styles.videoInCategory]: isCategory})}
        autoPlay={false}
        muted
        loop
        playsInline
        key={src}
        ref={videoRef}
        onCanPlay={setPlayBack}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default HomepageVideo;