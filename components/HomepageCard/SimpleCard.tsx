import { Card, Text } from "@exile-watch/writ-react";
import Link from "next/link";
import React from "react";
import styles from "./HomepageCard.module.scss";

type CardTextProps = {
  path: string;
  name: string;
};

const SimpleCard = ({ path, name }: CardTextProps) => {
  return (
    <Card
      className={styles.card}
      shadow="md"
      component={Link}
      href={path ?? "#"}
    >
      <Text ta="center">{name}</Text>
    </Card>
  );
};

export { SimpleCard };
