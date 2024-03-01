import styles from "./HomepageThumbnail.module.scss";
import {SimpleGrid, Skeleton} from "@exile-watch/writ-react";
import React from "react";
import Image from "next/image";

interface HomepageThumbnailProps {

}

const HomepageThumbnail = ({thumbnail, isCategory}) => {

  if (!isCategory) {
    return (
      <div className={styles.imageWrapper}>
        <Skeleton height="100%" width="100%" className={styles.skeleton}/>
        <Image height={100} width={400} alt="foo" className={styles.image}
             src={`https://raw.githubusercontent.com/exile-watch/nucleus/main/packages/encounter-data/thumbnails/${thumbnail}.webp`}/>
      </div>
    )
  }

  return (
    <SimpleGrid cols={2} spacing={4}>
      {thumbnail?.map(src => src === 'phoenix' ? null : (
          <div className={styles.imageWrapperCategory}>
            <Skeleton height="100%" width="100%" className={styles.skeleton}/>
            <Image height={100} width={400} alt="foo" className={styles.imageCategory}
                 src={`https://raw.githubusercontent.com/exile-watch/nucleus/main/packages/encounter-data/thumbnails/${src}.webp`}/>
          </div>
        )
      )}
    </SimpleGrid>
  )
}

      export default HomepageThumbnail;