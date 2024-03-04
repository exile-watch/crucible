import { Button } from "@exile-watch/writ-react";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import styles from "./WelcomePageButtons.module.scss";

interface ButtonProps {
  href: string;
  color: string;
  label: string;
}

const WelcomePageButton = ({ href, color, label }: ButtonProps) => {
  return (
    <Button
      component={Link}
      href={href}
      variant="gradient"
      gradient={{ from: "transparent", to: color }}
      rightSection={<IconArrowRight size={14} />}
      className={styles.button}
    >
      {label}
    </Button>
  );
};

export default WelcomePageButton;
