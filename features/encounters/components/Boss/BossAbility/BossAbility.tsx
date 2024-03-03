import cx from "classnames";
import kebabCase from "lodash/kebabCase";
import React, { useEffect, useRef } from "react";

import { PureBossAbilityType } from "#types";

import { AbilityName, AbilityTip, AboutAbility } from "./Details";
import Video from "./Video/Video";

import { useRouter } from "next/router";
import styles from "./BossAbility.module.scss";

const BossAbility = ({
  name,
  about,
  gif,
  tip,
  isEven,
}: PureBossAbilityType) => {
  const { query } = useRouter();
  const activeAbilityRef = useRef<HTMLDivElement>(null);
  const isActive = query.ability === kebabCase(name);
  const activeClassname = isActive
    ? styles.activeAbility
    : query.ability && styles.inactiveAbility;

  useEffect(() => {
    if (activeAbilityRef.current)
      activeAbilityRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }, [isActive]);

  return (
    <div
      className={cx("mx-5", styles.ability, activeClassname)}
      ref={isActive ? activeAbilityRef : null}
    >
      <Video isActive={isActive} src={gif} abilityName={name} />
      <div className={styles.details}>
        <AbilityName name={name} />
        {about && (
          <AboutAbility about={about} abilityName={name} isEven={isEven} />
        )}
        <AbilityTip tip={tip} />
      </div>
    </div>
  );
};

export default BossAbility;
