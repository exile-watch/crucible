import React, { useEffect, useState } from 'react';
import { startCase } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PathDataType } from '#types';

const Categories = () => {
  const [data, setData] = useState<PathDataType>(null);
  const {
    query: { category },
  } = useRouter();

  useEffect(() => {
    if (!data) {
      import(`../../../features/encounters/extracted-data/paths.json`)
        .then((d) => {
          setData(d.default);
        })
        .catch(() => {
          setData([]);
        });
    }
  }, [category]);

  return (
    <div>
      {data &&
        Object.entries(data).map(({ 0: cat, 1: ent }) => (
          <ul key={`content_${cat}`}>
            <li>
              <h1>{startCase(cat)}</h1>
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
    </div>
  );
};

export default Categories;
