import {Group, Text} from "@mantine/core";
import Link from "next/link";
import {InputWithResults} from "#components";
import Image from "next/image";
import styles from './Header.module.scss'

const Header = () => {
  return (
    <Group h="100%" px="xs" justify="space-between">
      <Link href="/" className={styles.link}>
        <Group gap="xs">
          <Image src="https://avatars.githubusercontent.com/u/158840748?s=400&u=4c73ba2a9a2ebc70b01c6303d41e8571df84ec37&v=4" alt="exile.watch logo" width={50} height={50} />
          <Text>exile.watch</Text>
        </Group>
      </Link>
      <InputWithResults />
      <div />
    </Group>
  );
};

export default Header;