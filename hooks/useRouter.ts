import {useRouter as useNextRouter} from "next/router";
import {RouterType} from "#types";

function useRouter(): RouterType {
  return useNextRouter()
}

export default useRouter