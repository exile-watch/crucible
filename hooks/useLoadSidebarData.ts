import { useEffect, useState } from 'react';

import useActiveModule from '#hooks/useActiveModule';
import { PathDataType } from '#types';

function useLoadSidebarData() {
  const module = useActiveModule();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<PathDataType | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    console.log('Init (effect#2 | sidebar data): ', `../extracted-data/${module}/paths.json`);

    import(`../extracted-data/${module}/paths.json`)
      .then((importedData) => {
        setData(importedData.default);
        setIsLoading(false);
        console.log('Loaded (effect#2 | sidebar data): ', `../extracted-data/${module}/paths.json`);
      })
      .catch((err) => {
        console.log('Fail (effect#2 | sidebar data): ', `../extracted-data/${module}/paths.json`);
        setIsLoading(false);
        setData(undefined);
        throw new Error(err);
      });
  }, [module]);

  return { isLoading, data };
}

export default useLoadSidebarData;
