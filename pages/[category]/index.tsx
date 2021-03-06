import React, {useEffect, useState} from 'react';
import Layout from "#components/Layout/Layout";
import {useRouter} from "next/router";
import useImportDataOnLoad from "#hooks/useImportDataOnLoad";
import Heading from "#components/Heading/Heading";
import { startCase } from 'lodash'
import Link from 'next/link';

const Categories = () => {
  const {isLoading, data} = useImportDataOnLoad({fileName: 'paths'})
  const { query: { category } } = useRouter();
  const [activeCategory, setActiveEntity] = useState(null)

  useEffect(() => {
    if(data) {
      Object.entries(data).find(({0: c, 1: entities}) => {
        c === category && setActiveEntity(c)
      });
    }
  }, [data])

  console.log(activeCategory);
  return (
    <Layout>
      {data && Object.entries(data)?.map(({0: cat, 1: ent}) => (
        <ul key={`content_${cat}`}>
          <li>
            <Heading as="h1">{startCase(cat)}</Heading>
            <ul>
              {ent.map(e => (
                <li key={`content_${e.label}`}>
                  <Link href={e.path}>
                    {e.label}
                  </Link>
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