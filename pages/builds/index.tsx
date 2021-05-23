import React from 'react';

import { Layout } from '#design-system/components';
import useRouter from '#hooks/useRouter';

const Builds = () => {
  const { pathname } = useRouter();

  return (
    <Layout>
      <a href={`${pathname}/create`}>create build</a>
    </Layout>
  );
};

export default Builds;
