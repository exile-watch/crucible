import {Burger, Group, Text} from "@mantine/core";
import Link from "next/link";
import {InputWithResults} from "#components";
import dynamic from 'next/dynamic'
const Image = dynamic(() => import('next/image'))
import styles from './Header.module.scss'
import {useIsMobile} from "#hooks/useIsMobile";
import {useEffect, useState} from "react";

const Header = ({isOpen, toggle}) => {
  const {isMobile} = useIsMobile()
  // hydration issues...
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <Group h="100%" px="xs" justify="space-between">
      <Group gap="xs">
        <Burger opened={isOpen} onClick={toggle} hiddenFrom="md" size="sm" />
        <Link href="/" className={styles.link}>
          <Group gap="xs">
            <Image src="https://avatars.githubusercontent.com/u/158840748?s=400&u=4c73ba2a9a2ebc70b01c6303d41e8571df84ec37&v=4" alt="exile.watch logo" width={50} height={50} />
            <Text>exile.watch</Text>
          </Group>
        </Link>
      </Group>
      {isMounted && !isMobile && <InputWithResults isOpen={isOpen} toggle={toggle} />}
      <div />
    </Group>
  );
};

export default Header;