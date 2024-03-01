import {Card, Text} from "@exile-watch/writ-react";
import styles from './HomepageCard.module.scss'
import Link from "next/link";
import React, {useState, useCallback, useEffect} from "react";
import {debounce} from 'lodash'
import HomepageThumbnail from "./HomepageThumbnail/HomepageThumbnail";
import HomepageVideoCard from "./HomepageVideoCard/HomepageVideoCard";
import {useRouter} from "next/router";
interface HomepageCardProps {

}

const HomepageCard = ({name, gif, path, thumbnail = '', isCategory = true}) => {
  const [isHovering, setIsHovering]=useState(false);
  const DELAY = 1000;
  const {pathname} = useRouter()
  const preferThumbnailOverVideoOnPaths = pathname === '/' || pathname === '/encounters'
  // Without debouncing the mouseover, we can start requests immediately
  // In an "edge" case where a "curious" user decides to furiously...
  // ...mouseover and mouseleave over 20+ video elements (homepage)...
  // ...this can lead to huge memory overload causing page crashes
  const handleMouseOver = useCallback(debounce(() => {
    setIsHovering(true);
  }, DELAY), []);

  const handleMouseLeave = () => {
    setIsHovering(false);
    handleMouseOver.cancel();
  }

  useEffect(() => {
    return () => {
      handleMouseOver.cancel();
    };
  }, [handleMouseOver]);

  return (
    <Card className={styles.card} padding={0} shadow="md" component={Link} href={path ?? "#"} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <Card.Section>
        {thumbnail && !isHovering && <HomepageThumbnail thumbnail={thumbnail} isCategory={isCategory}/>}
        {gif && (isHovering || !preferThumbnailOverVideoOnPaths) && <HomepageVideoCard gif={gif} isHovering={isHovering} isCategory={isCategory}/>}
        {/*{gif && <HomepageVideoCard gif={gif} isHovering={isHovering} isCategory={isCategory}/>}*/}
      </Card.Section>
      <Card.Section mt="md">
        <Text ta="center" mb="md">{name}</Text>
      </Card.Section>
    </Card>
  );
};

export {HomepageCard};