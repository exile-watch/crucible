import {Card, SimpleGrid} from "@exile-watch/writ-react";
import HomepageVideo from "../HomepageVideo/HomepageVideo";
import React from "react";

interface HomepageVideoCategoryCardProps {

}

const HomepageVideoCard = ({gif, isCategory, isHovering}) => {

  if(!isCategory) {
    return <HomepageVideo src={gif} isParentHovering={isHovering} />;
  }

  return (
    <SimpleGrid cols={2} spacing={4}>
      {gif?.map(src => <HomepageVideo key={src} src={src} isCategory isParentHovering={isHovering} />)}
    </SimpleGrid>
  );
};

export default HomepageVideoCard;