import { Burger, Group, Text } from "@exile-watch/writ-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { InputWithResults } from "#components";
const Image = dynamic(() => import("next/image"));
import { useMediaQuery } from "@exile-watch/writ-react";
import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

type HeaderProps = {
  isOpen: boolean;
  toggle: () => void;
};

const Header = ({ isOpen, toggle }: HeaderProps) => {
  const { isMobile } = useMediaQuery();
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
            <Image
              src="https://avatars.githubusercontent.com/u/158840748?s=400&u=4c73ba2a9a2ebc70b01c6303d41e8571df84ec37&v=4"
              alt="exile.watch logo"
              width={50}
              height={50}
            />
            <Text>exile.watch</Text>
          </Group>
        </Link>
      </Group>
      {isMounted && !isMobile && (
        <InputWithResults isOpen={isOpen} toggle={toggle} />
      )}
      <Group className={styles.icons}>
        <Link href="https://github.com/exile-watch" target="_blank">
          <IconBrandGithub color="beige" />
        </Link>
        <Link href="https://discord.gg/U3kXS4ej" target="_blank">
          <IconBrandDiscord color="beige" />
        </Link>
      </Group>
    </Group>
  );
};

export default Header;
