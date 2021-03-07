import { useEffect, useState } from 'react';

import useRouter from '#hooks/useRouter';
import { DataType } from '#types';

type useImportDataOnLoadReturnProps<T> = {
  isLoading: boolean;
  data?: T;
};

type useImportDataOnLoadProps = {
  pageDir?: string | null;
  fileName?: string | null;
};

/* eslint-disable react-hooks/rules-of-hooks */
function useImportDataOnLoad<T = DataType>({
  pageDir = null,
  fileName = null,
}: useImportDataOnLoadProps = {}): useImportDataOnLoadReturnProps<T> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | undefined>(undefined);

  if (!pageDir && !fileName) {
    const {
      query: { category, map },
    } = useRouter();

    useEffect(() => {
      setIsLoading(true);

      import(`../extracted-data/${category}/${map}.json`)
        .then((importedData) => {
          setData(importedData.default);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setData(undefined);
        });
    }, [category, map]);

    return { isLoading, data };
  }

  if (!pageDir) {
    useEffect(() => {
      setIsLoading(true);

      if (!!fileName) {
        import(`../extracted-data/${fileName}.json`)
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
    }, [fileName]);

    return { isLoading, data };
  }

  const { query } = useRouter();
  const pageDirQuery = query[pageDir || query.category];

  useEffect(() => {
    setIsLoading(true);

    if (pageDirQuery) {
      import(`../extracted-data/${pageDir}/${pageDirQuery}.json`)
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
  }, [pageDir, pageDirQuery, data]);

  return { isLoading, data };
}

export default useImportDataOnLoad;
