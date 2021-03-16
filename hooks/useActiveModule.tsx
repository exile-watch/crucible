import useRouter from '#hooks/useRouter';

function useActiveModule() {
  const { route } = useRouter();
  const [, activeModule] = route.split('/');

  return activeModule;
}

export default useActiveModule;
