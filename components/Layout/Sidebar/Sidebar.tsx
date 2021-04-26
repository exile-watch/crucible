import cx from 'classnames';

import SidebarEncountersDesktop from '#features/encounters/components/Sidebar/SidebarEncountersDesktop';
import useActiveFeature from '#hooks/useActiveFeature';

import styles from './Sidebar.module.scss';

const sidebarComponents = [
  {
    name: 'encounters',
    component: SidebarEncountersDesktop,
  },
];

const Sidebar = () => {
  const activeModule = useActiveFeature();

  if (!activeModule) return null;

  const ActiveSidebar = sidebarComponents.find((s) => s.name === activeModule)?.component;

  return !ActiveSidebar ? null : (
    <div className={cx('theme-transition-scope pt-1', styles.sidebar)}>
      <ActiveSidebar />
    </div>
  );
};

export default Sidebar;
