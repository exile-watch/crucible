import React from 'react';
import useImportDataOnLoad from "#hooks/useImportDataOnLoad";
import {useRouter} from "next/router";
import Heading from "#components/Heading/Heading";
import {startCase} from "lodash";
import PageLoader from "#components/PageLoader/PageLoader";
import MapBossesHeading from "#components/Map/MapBossesHeading";

const Map = ({children}: any) => {
  const {isLoading, data} = useImportDataOnLoad()
  const { query: { map } } = useRouter()

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