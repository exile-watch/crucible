import React from 'react';
import cx from 'classnames';
import startCase from 'lodash/startCase';

import useRouter from '#hooks/useRouter';

import styles from './MissingContent.module.scss';

type MissingContentProps = {
  abilityName?: string;
  missingContentType: 'Video Source' | 'About' | 'Player Interaction tip';
  className?: string;
};

const MissingContent = ({
  abilityName = '',
  missingContentType,
  className,
}: MissingContentProps) => {
  const {
    query: { map, boss },
  } = useRouter();
  const issueTitle = map
    ? `[Invalid Ability Data][Missing ${missingContentType}]: ${startCase(map)} > ${startCase(
        boss
      )} > ${abilityName}`
    : `[Invalid Ability Data][Missing ${missingContentType}]: ${startCase(boss)} > ${abilityName}`;
  const issueSrc = `https://github.com/sbsrnt/poe-watch/issues/new?template=invalid-ability-data.md&labels=invalid%2Fmissing+data&title=${issueTitle}`;
  const target = '_blank';
  const rel = 'noreferrer noopener';

  return (
    <div className={cx(styles.missingContent, className)}>
      <p>
        There is missing <i>{missingContentType}</i> section for this ability.
      </p>
      <p>
        Before reporting an issue,{' '}
        <a
          href={`https://github.com/sbsrnt/poe-watch/issues?q=${abilityName}`}
          target={target}
          rel={rel}
        >
          check if it already exists
        </a>
        .
      </p>
      <p>
        If you can't find desired issue then{' '}
        <a href={issueSrc} target={target} rel={rel}>
          create a new issue
        </a>
      </p>
    </div>
  );
};

export default MissingContent;
