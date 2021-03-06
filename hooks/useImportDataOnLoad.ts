import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useImportDataProps, useImportDataReturnProps} from "#types";

function useImportDataOnLoad({pageDir = null, fileName = null} = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  if(!pageDir && !fileName) {
    const { query: { category, map} } = useRouter()

    useEffect(() => {
      setIsLoading(true)
      import(`../extracted-data/${category}/${map}.json`)
        .then(importedData => {
          setData(importedData.default)
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
        })
    }, [category, map])

    return {isLoading, data}
  }

  if(!pageDir) {
    useEffect(() => {
      setIsLoading(true)

      if(!!fileName) {
        import(`../extracted-data/${fileName}.json`)
          .then(importedData => {
            setData(importedData.default)
            setIsLoading(false)
          })
          .catch(err => {
            console.log(err)
            setIsLoading(false)
          })
      }
    }, [])

    return {isLoading, data}
  }

  const { query } = useRouter()
  const pageDirQuery = query[pageDir || query.category];
  const pageTitle = query[fileName || query.map]

  useEffect(() => {
    setIsLoading(true)

    if(pageDirQuery) {
      import(`../extracted-data/${pageDir}/${pageDirQuery}.json`)
        .then(importedData => {
          setData(importedData.default)
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
        })
    }
  }, [pageDirQuery, data])

  return {isLoading, data, pageTitle}
}

export default useImportDataOnLoad