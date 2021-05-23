import { useEffect, useState } from 'react';

import useActiveFeature from '#hooks/useActiveFeature';
import { PathDataType } from '#types';

function useLoadSidebarData() {
  const feature = useActiveFeature();
  const [data, setData] = useState<PathDataType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (feature) {
      setIsLoading(true);

      import(`../../client/features/${feature}/extracted-data/paths.json`)
        .then((importedData) => {
          setData(importedData.default);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setData(undefined);
          throw new Error(err);
        });
    }
  }, [feature]);

  return { isLoading, data };
}

export default useLoadSidebarData;
