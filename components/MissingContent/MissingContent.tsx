import React from 'react';
import cx from 'classnames';

import {RedirectIcon} from '@exile-watch/writ-icons';
import styles from './MissingContent.module.scss';
import {Anchor, Group, Stack, Text} from "@mantine/core";

type MissingContentProps = {
  abilityName?: string;
  missingContentType: 'Video Source' | 'About' | 'Player Interaction tip';
  className?: string;
  issueTitle?: string;
  redirect?: string;
  isEven?: boolean;
};

const MissingContent = ({
  // abilityName = '',
  missingContentType,
  className,
  issueTitle,
  redirect,
  isEven
}: MissingContentProps) => {
  // const redirect = `https://github.com/sbsrnt/poe-watch/issues?q=${startCase(boss)} > ${abilityName}`
  // const issueTitle = map
  //   ? `[Invalid Ability Data][Missing ${missingContentType}]: ${startCase(map)} > ${startCase(
  //       boss
  //     )} > ${abilityName}`
  //   : `[Invalid Ability Data][Missing ${missingContentType}]: ${startCase(boss)} > ${abilityName}`;
  const issueSrc = `https://github.com/sbsrnt/poe-watch/issues/new?template=invalid-ability-data.md&labels=invalid%2Fmissing+data&title=${issueTitle}`;
  const target = '_blank';
  const rel = 'noreferrer noopener';

  return (
    <Stack className={cx(styles.missingContent, className)} gap={0} align={isEven ? 'end' : 'start'}>
      <Text>
        There is missing <i>{missingContentType}</i> section for this ability.
      </Text>
      <Group gap={4} align="center">
        <Text>Before reporting an issue, </Text>
        <Anchor
          href={redirect}
          target={target}
          rel={rel}
          underline="always"
          className={styles.anchor}
        >
          check if it already exists <RedirectIcon />
        </Anchor>
      </Group>
      <Group gap={4}>
        <Text>If you can't find desired issue then</Text>
        <Anchor underline="always" href={issueSrc} target={target} rel={rel} className={styles.anchor}>
          create a new issue <RedirectIcon />
        </Anchor>
      </Group>
    </Stack>
  );
};

export {MissingContent};
