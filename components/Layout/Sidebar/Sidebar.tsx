import cx from 'classnames';

import useActiveModule from '#hooks/useActiveModule';

import SidebarEncountersDesktop from './encounters/SidebarEncountersDesktop';

import styles from './Sidebar.module.scss';

const sidebarComponents = [
  {
    name: 'encounters',
    component: SidebarEncountersDesktop,
  },
];

const Sidebar = () => {
  const activeModule = useActiveModule();

  if (!activeModule) return null;

  const ActiveSidebar = sidebarComponents.find((s) => s.name === activeModule)!.component;

  return (
    <div className={cx('pt-1', styles.sidebar)}>
      <ActiveSidebar />
    </div>
  );
};

export default Sidebar;
