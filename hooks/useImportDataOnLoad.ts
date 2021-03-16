import { useEffect, useState } from 'react';

import useRouter from '#hooks/useRouter';
import { DataType } from '#types';

type useImportDataOnLoadReturnProps<T> = {
  isLoading: boolean;
  data?: T;
};

type useImportDataOnLoadProps = {
  module?: 'encounters' | null;
  pageDir?: string | null;
  fileName?: string | null;
};

/* eslint-disable react-hooks/rules-of-hooks */
function useImportDataOnLoad<T = DataType>({
  module = null,
  pageDir = null,
  fileName = null,
}: useImportDataOnLoadProps = {}): useImportDataOnLoadReturnProps<T> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | undefined>(undefined);

  if (!pageDir && !fileName) {
    const {
      query: { category, map },
    } = useRouter();

    if (!category || !map) return { isLoading, data };

    useEffect(() => {
      setIsLoading(true);
      import(`../extracted-data/${module}/${category}/${map}.json`)
        .then((importedData) => {
          setData(importedData.default);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setData(undefined);
        });
    }, [module, category, map]);

    return { isLoading, data };
  }

  if (!pageDir) {
    useEffect(() => {
      setIsLoading(true);

      if (!!fileName) {
        import(`../extracted-data/${module}/${fileName}.json`)
          .then((importedData) => {
            setData(importedData.default);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            setData(undefined);
          });
      }
    }, [module, fileName]);

    return { isLoading, data };
  }

  const { query } = useRouter();
  const pageDirQuery = query[pageDir || query.category];

  useEffect(() => {
    setIsLoading(true);

    if (pageDirQuery) {
      import(`../extracted-data/${module}/${pageDir}/${pageDirQuery}.json`)
        .then((importedData) => {
          setData(importedData.default);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setData(undefined);
        });
    }
  }, [module, pageDir, pageDirQuery, data]);

  return { isLoading, data };
}

export default useImportDataOnLoad;
