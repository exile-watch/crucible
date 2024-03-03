import { SimpleGrid } from "@exile-watch/writ-react";
import React from "react";
import HomepageVideo from "../HomepageVideo/HomepageVideo";

type HomepageVideoCategoryCardProps = {
  gif: string[];
  isCategory: boolean;
  isHovering: boolean;
};

const HomepageVideoCard = ({
  gif,
  isCategory,
  isHovering,
}: HomepageVideoCategoryCardProps) => {
  if (!isCategory) {
    return <HomepageVideo src={gif} isParentHovering={isHovering} />;
  }

  return (
    <SimpleGrid cols={2} spacing={4}>
      {gif?.map((src) => (
        <HomepageVideo
          key={src}
          src={src}
          isCategory
          isParentHovering={isHovering}
        />
      ))}
    </SimpleGrid>
  );
};

export default HomepageVideoCard;
