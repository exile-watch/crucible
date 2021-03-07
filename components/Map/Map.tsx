import { ReactNode } from 'react';
import { startCase } from 'lodash';

import Heading from '#components/Heading/Heading';
import MapBossesHeading from '#components/Map/MapBossesHeading';
import PageLoader from '#components/PageLoader/PageLoader';
import useImportDataOnLoad from '#hooks/useImportDataOnLoad';
import useRouter from '#hooks/useRouter';

type MapProps = {
  children?: ReactNode;
};

const Map = ({ children }: MapProps) => {
  const { isLoading, data } = useImportDataOnLoad();
  const {
    query: { map },
  } = useRouter();

  return (
    <>
      {isLoading && <PageLoader />}
      {!isLoading && data && (
        <>
          <Heading as="h4">{startCase(map)}</Heading>
          <MapBossesHeading data={data} />
          {children}
        </>
      )}
    </>
  );
};

export default Map;
