import { Stack, Title } from "@exile-watch/writ-react";
import cx from "classnames";
import { kebabCase, startCase } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MAP_WITHOUT_DIRECT_BOSS } from "#hooks/useEncounterData";
import styles from "./PageTitle.module.scss";

interface PageTitleProps {
  label?: string;
  sublabel?: string;
  title?: string | Array<{ name: string; isMap?: boolean; redirect: string }>;
}

type GetLabelAndTitleProps = Pick<PageTitleProps, "label" | "title"> & {
  category?: string;
  map?: string;
  queryBoss?: string;
};

type ReturnGetLabelAndTitleProps = {
  _label: PageTitleProps["label"];
  _title: PageTitleProps["title"];
};

const getLabelAndTitle = ({
  label,
  title,
  category,
  map,
  queryBoss,
}: GetLabelAndTitleProps): ReturnGetLabelAndTitleProps => {
  // /encounters/[category]
  if (category && !map && !queryBoss)
    return { _label: "Encounters", _title: category };

  // /encounters/[category]/[map]
  if (category && map && !queryBoss)
    return { _label: label || category, _title: title || map };

  // /encounters/[category]/[boss]
  if (category && !map && queryBoss)
    return { _label: label || category, _title: title || queryBoss };

  // /encounters/[category]/[map]/[boss]
  if (category && map && queryBoss)
    return { _label: label || map, _title: title || queryBoss };

  // encounters
  return { _label: label, _title: title };
};

const PageTitle = ({ label, sublabel, title }: PageTitleProps) => {
  const {
    asPath,
    query: { category, map, boss: queryBoss },
  } = useRouter();
  const { _label, _title } = getLabelAndTitle({
    label,
    title,
    map,
    queryBoss,
    category,
  } as GetLabelAndTitleProps);
  const redirectToPreviousCategory = MAP_WITHOUT_DIRECT_BOSS.includes(
    map as string,
  )
    ? asPath.split("/").slice(0, -2)?.join("/")
    : asPath.split("/").slice(0, -1)?.join("/");

  return (
    <Stack mt={_label ? "md" : "sm"} gap={0} ml="md">
      {_label && (
        <Title order={4}>
          <Link href={redirectToPreviousCategory} className={styles.label}>
            {startCase(_label)} {sublabel && `* ${sublabel}`}
          </Link>
        </Title>
      )}

      {!Array.isArray(_title) && (
        <Title order={2} className={styles.pageTitle}>
          {startCase(_title)}
        </Title>
      )}

      {Array.isArray(_title) && (
        <div className={styles.pageTitleContainer}>
          {_title.map(({ redirect, name, isMap }, _i, self) => {
            const kebabCasedEncounterName = kebabCase(name);
            const isActive = isMap
              ? kebabCasedEncounterName === queryBoss
              : kebabCasedEncounterName === map;

            if (self.length === 1)
              return (
                <Title
                  order={2}
                  className={styles.pageTitle}
                  key={`pageTitle${name}`}
                >
                  {name}
                </Title>
              );

            return (
              <Title order={2} key={`pageTitle${name}`}>
                <Link
                  href={redirect}
                  className={cx(
                    isActive ? styles.active : undefined,
                    styles.link,
                  )}
                >
                  {name}
                </Link>
              </Title>
            );
          })}
        </div>
      )}
    </Stack>
  );
};

export { PageTitle };
