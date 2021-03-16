import React, { useEffect, useState } from 'react';
import { startCase } from 'lodash';
import Link from 'next/link';

import Heading from '#components/Heading/Heading';
import Layout from '#components/Layout/Layout';
import useImportDataOnLoad from '#hooks/useImportDataOnLoad';
import useRouter from '#hooks/useRouter';
import { PathDataType } from '#types';

const Encounters = () => {
  const { data } = useImportDataOnLoad<PathDataType>({ module: 'encounters', fileName: 'paths' });
  const {
    query: { category },
  } = useRouter();
  // @ts-ignore
  const [activeCategory, setActiveEntity] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      Object.entries(data).find(({ 0: c }) => c === category && setActiveEntity(c));
    }
  }, [data, category]);

  return (
    <Layout>
      {data &&
        Object.entries(data).map(({ 0: cat, 1: ent }) => (
          <ul key={`content_${cat}`}>
            <li>
              <Heading as="h1">{startCase(cat)}</Heading>
              <ul>
                {ent.map((e) => (
                  <li key={`content_${e.label}`}>
                    <Link href={e.path}>{e.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
    </Layout>
  );
};

export default Encounters;
