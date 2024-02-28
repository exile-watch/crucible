import React from 'react';
import { startCase } from 'lodash';
import Link from 'next/link';
import {paths} from '@exile-watch/encounter-data'
import {Layout} from "#components";

const Categories = () => {
  return (
    <Layout>
      {paths &&
        Object.entries(paths).map(({ 0: cat, 1: ent }) => (
          <ul key={`content_${cat}`}>
            <li>
              <h1>{startCase(cat)}</h1>
              <ul>
                {ent.map((e) => (
                  <li key={`content_${e.label}`}>
                    <Link href={e.path} legacyBehavior>{e.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
    </Layout>
  );
};

export default Categories;
