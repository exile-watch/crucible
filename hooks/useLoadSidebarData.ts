import { useEffect, useState } from "react";

import { paths } from "@exile-watch/encounter-data";
import useActiveFeature from "#hooks/useActiveFeature";
import { PathDataType } from "#types";
function useLoadSidebarData() {
  const feature = useActiveFeature();
  const [data, setData] = useState<PathDataType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (feature) {
      setIsLoading(true);
      setData(paths);
      setIsLoading(false);
    }
  }, [feature]);

  return { isLoading, data };
}

export default useLoadSidebarData;
