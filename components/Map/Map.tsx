import {ReactNode} from 'react';
import useImportDataOnLoad from "#hooks/useImportDataOnLoad";
import Heading from "#components/Heading/Heading";
import {startCase} from "lodash";
import PageLoader from "#components/PageLoader/PageLoader";
import MapBossesHeading from "#components/Map/MapBossesHeading";
import useRouter from "#hooks/useRouter";

type MapProps = {
  children?: ReactNode;
}

const Map = ({children}: MapProps) => {
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