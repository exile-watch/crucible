import { Group } from "@exile-watch/writ-react";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./HeaderDirectories.module.scss";

const directories = [
  {
    name: "Path of Exile 1",
    path: "/path-of-exile-1",
    isDisabled: false,
  },
  {
    name: "Path of Exile 2",
    path: "/path-of-exile-2",
    isDisabled: true,
  },
];

const HeaderDirectories = () => {
  const { query } = useRouter();

  return (
    <Group className={styles.directoryLinksContainer}>
      {directories.map((dir) => (
        <Link
          key={dir.path}
          href={dir.isDisabled ? "" : dir.path}
          className={cx(styles.directory, {
            [styles.disabledDirectory]: dir.isDisabled,
            [styles.activeDirectory]: `/${query.directory}` === dir.path,
          })}
        >
          {dir.name}
        </Link>
      ))}
    </Group>
  );
};

export default HeaderDirectories;
