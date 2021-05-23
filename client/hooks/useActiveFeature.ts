import isEmpty from 'lodash/isEmpty';

import useRouter from '#hooks/useRouter';

function useActiveFeature() {
  const { route } = useRouter();
  const [, activeFeature] = route.split('/');

  return isEmpty(activeFeature) || !activeFeature ? null : activeFeature;
}

export default useActiveFeature;
