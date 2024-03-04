import { SimpleGrid, Skeleton } from "@exile-watch/writ-react";
import React from "react";
import styles from "./HomepageThumbnail.module.scss";

import type { HomepageObjType } from "@exile-watch/encounter-data";

type HomepageThumbnailProps = {
  thumbnail: HomepageObjType["thumbnail"];
  isCategory: boolean;
};

const HomepageThumbnail = ({
  thumbnail,
  isCategory,
}: HomepageThumbnailProps) => {
  if (!isCategory) {
    return (
      <div className={styles.imageWrapper}>
        <Skeleton height="100%" width="100%" className={styles.skeleton} />
        <img
          height="auto"
          width="auto"
          alt="foo"
          className={styles.image}
          src={`https://raw.githubusercontent.com/exile-watch/nucleus/main/packages/encounter-data/thumbnails/${thumbnail}.webp`}
        />
      </div>
    );
  }

  return (
    <SimpleGrid cols={2} spacing={4}>
      {Array.isArray(thumbnail) &&
        thumbnail?.map((src) =>
          src === ("phoenix" as any) ? null : (
            <div className={styles.imageWrapperCategory} key={src}>
              <Skeleton
                height="100%"
                width="100%"
                className={styles.skeleton}
              />
              <img
                height="auto"
                width="auto"
                alt="foo"
                className={styles.imageCategory}
                src={`https://raw.githubusercontent.com/exile-watch/nucleus/main/packages/encounter-data/thumbnails/${src}.webp`}
              />
            </div>
          ),
        )}
    </SimpleGrid>
  );
};

export default HomepageThumbnail;
