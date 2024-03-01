import styles from "./HomepageCard.module.scss";
import Link from "next/link";
import {Card, Text} from "@exile-watch/writ-react";
import React from "react";

interface CardTextProps {

}

const SimpleCard = ({path, name}) => {
  return (
    <Card className={styles.card} shadow="md" component={Link} href={path ?? "#"}>
      <Text ta="center">{name}</Text>
    </Card>
  );
};

export {SimpleCard};