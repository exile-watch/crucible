import { startCase } from "lodash";
import { ReactNode } from "react";

import { Title } from "@exile-watch/writ-react";

import { useEncounterData } from "#hooks/useEncounterData";
import MapBossesHeading from "./MapBossesHeading";

type MapProps = {
  children?: ReactNode;
};

const Map = ({ children }: MapProps) => {
  const { isLoading, data, heading, subheading } = useEncounterData();

  return (
    <>
      {!isLoading && data && (
        <>
          <Title order={4} c="dimmed">
            {startCase(heading as string)} {subheading && `* ${subheading}`}
          </Title>
          <MapBossesHeading />
          {children}
        </>
      )}
    </>
  );
};

export default Map;
