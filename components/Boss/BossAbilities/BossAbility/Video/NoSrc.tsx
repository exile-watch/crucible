import React from 'react';
import styles from './Video.module.scss';
import useRouter from '#hooks/useRouter';
import startCase from 'lodash/startCase';

type NoSrcProps = {
  abilityName: string;
}

const NoSrc = ({abilityName}: NoSrcProps) => {
  const {query: { map, boss }} = useRouter();
  const issueTitle = map
    ? `[Missing Ability Data][Video Source]: ${startCase(map)} > ${startCase(boss)} > ${abilityName}`
    : `[Missing Ability Data][Video Source]: ${startCase(boss)} > ${abilityName}`
  const issueSrc = `https://github.com/sbsrnt/poe-watch/issues/new?template=missing-ability-data.md&title=${issueTitle}`
  const target = "_blank"
  const rel = "noreferrer noopener"

  return (
    <div className={styles.noSrc}>
      <p>There is no video source for this ability.</p>
      <p>Before reporting an issue, <a href={`https://github.com/sbsrnt/poe-watch/issues?q=${abilityName}`} target={target} rel={rel}>check if it already exists</a>.</p>
      <p>If you can't find desired issue then <a href={issueSrc} target={target} rel={rel}>create a new issue</a></p>
    </div>
  );
};

export default NoSrc;