import {Card, SimpleGrid, Text} from "@mantine/core";
import styles from './HomepageCard.module.scss'
import Link from "next/link";
import HomepageVideo from "./HomepageVideo/HomepageVideo";
import {useState, useCallback, useEffect} from "react";
import {debounce} from 'lodash'
interface HomepageCardProps {

}

const HomepageCard = ({name, gif, path, isCategory = true}) => {
  const [isHovering, setIsHovering]=useState(false);
  const DELAY = 1000;

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
    <Card className={styles.card} shadow="md" component={Link} href={path ?? "#"} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      {(!gif || gif.length === 0) && <Card.Section><Text ta="center" mt="md">This encounter has no gif source</Text></Card.Section>}
      {!!gif && <Card.Section>
        {isCategory && Array.isArray(gif) ? <SimpleGrid cols={2} spacing={4}>{gif?.map(src => <HomepageVideo key={src} src={src} isCategory isParentHovering={isHovering} />)}</SimpleGrid> : <HomepageVideo src={gif} isParentHovering={isHovering} />}
      </Card.Section>
      }
      <Card.Section mt="md">
        <Text ta="center" mb="md">{name}</Text>
      </Card.Section>
    </Card>
  );
};

export {HomepageCard};