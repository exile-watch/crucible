import { useEffect, useState } from 'react';

import useActiveModule from '#hooks/useActiveModule';
import { PathDataType } from '#types';

function useLoadSidebarData() {
  const module = useActiveModule();
  const [data, setData] = useState<PathDataType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (module) {
      setIsLoading(true);

      import(`../extracted-data/${module}/paths.json`)
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
  }, [module]);

  return { isLoading, data };
}

export default useLoadSidebarData;
