import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";

function useActiveFeature() {
  const { route } = useRouter();
  const [, activeFeature] = route.split("/");

  return isEmpty(activeFeature) || !activeFeature ? null : activeFeature;
}

export default useActiveFeature;
