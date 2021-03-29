import React from 'react';

import useRouter from '#hooks/useRouter';

import Boss from './[boss]';

const Map = () => {
  const {
    query: { category },
  } = useRouter();
  if (category !== 'common-maps') return <Boss />;

  return <div>map index page</div>;
};

export default Map;
