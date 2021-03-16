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

    if (!category || !map) {
      console.log('No category or map', `../extracted-data/${module}/${category}/${map}.json`);
      return { isLoading, data };
    }

    useEffect(() => {
      setIsLoading(true);
      console.log(
        'Init (effect#1 | content data): ',
        `../extracted-data/${module}/${category}/${map}.json`
      );
      import(`../extracted-data/${module}/${category}/${map}.json`)
        .then((importedData) => {
          setData(importedData.default);
          setIsLoading(false);
          console.log(
            'Loaded (effect#1 | content data): ',
            `../extracted-data/${module}/${category}/${map}.json`
          );
        })
        .catch((err) => {
          throw new Error(err);
          setIsLoading(false);
          setData(undefined);
          console.log(
            'Fail (effect#1 | content data): ',
            `../extracted-data/${module}/${category}/${map}.json`
          );
        });
    }, [map]);

    return { isLoading, data };
  }

  if (!pageDir) {
    useEffect(() => {
      setIsLoading(true);
      console.log(
        'Init (effect#2 | sidebar data): ',
        `../extracted-data/${module}/${fileName}.json`
      );

      if (!!fileName) {
        import(`../extracted-data/${module}/${fileName}.json`)
          .then((importedData) => {
            setData(importedData.default);
            setIsLoading(false);
            console.log(
              'Loaded (effect#2 | sidebar data): ',
              `../extracted-data/${module}/${fileName}.json`
            );
          })
          .catch((err) => {
            console.log(
              'Fail (effect#2 | sidebar data): ',
              `../extracted-data/${module}/${fileName}.json`
            );
            throw new Error(err);
            setIsLoading(false);
            setData(undefined);
          });
      }
    }, []);

    return { isLoading, data };
  }

  const { query } = useRouter();
  const pageDirQuery = query[pageDir || query.category];

  useEffect(() => {
    setIsLoading(true);
    console.log('Init (effect#3): ', `../extracted-data/${module}/${pageDir}/${pageDirQuery}.json`);

    if (pageDirQuery) {
      import(`../extracted-data/${module}/${pageDir}/${pageDirQuery}.json`)
        .then((importedData) => {
          setData(importedData.default);
          setIsLoading(false);
        })
        .catch((err) => {
          throw new Error(err);
          setIsLoading(false);
          setData(undefined);
        });
    }
  }, []);

  return { isLoading, data };
}

export default useImportDataOnLoad;
