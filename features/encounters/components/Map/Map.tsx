import { ReactNode } from 'react';
import { startCase } from 'lodash';

import { Heading, PageLoader } from '@exile-watch/writ-react';
import useRouter from '#hooks/useRouter';
import { DataType } from '#types';

import MapBossesHeading from './MapBossesHeading';

type MapProps = {
  children?: ReactNode;
  isLoading: boolean;
  data: DataType;
};

const Map = ({ children, isLoading, data }: MapProps) => {
  const {
    query: { category, map },
  } = useRouter();
  const heading = category === 'common-maps' ? map : category;
  const subheading = category !== 'common-maps' && data?.map;
  return (
    <>
      {isLoading && <PageLoader />}
      {!isLoading && data && (
        <>
          <Heading as="h4">
            {startCase(heading)} {subheading && `* ${subheading}`}
          </Heading>
          <MapBossesHeading data={data} />
          {children}
        </>
      )}
    </>
  );
};

export default Map;
