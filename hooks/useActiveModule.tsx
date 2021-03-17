import isEmpty from 'lodash/isEmpty';

import useRouter from '#hooks/useRouter';

function useActiveModule() {
  const { route } = useRouter();
  const [, activeModule] = route.split('/');

  return isEmpty(activeModule) || !activeModule ? null : activeModule;
}

export default useActiveModule;
