import cx from 'classnames';

import * as icons from '#assets/icons';
import Heading from '#components/Heading/Heading';

import styles from './SidebarBuildsDesktop.module.scss';

type IconProps = {
  icon: keyof typeof icons;
};

const Icon = ({ icon }: IconProps) => {
  const ImportedIcon = icons[icon];
  const [iconWithoutSuffix] = icon.split('Icon');
  const lowercasedIcon = iconWithoutSuffix.toLowerCase();
  return <ImportedIcon className={styles?.[lowercasedIcon]} style={{ gridArea: lowercasedIcon }} />;
};

const SidebarBuildsDesktop = () => {
  return (
    <nav className={cx('px-3', styles.buildsSidebar)}>
      <div className={cx('pt-3', styles.classes)}>
        <Heading as="h4" className={cx('mb-3', styles.header)}>
          CLASS BUILDS
        </Heading>
        <div className={cx(styles.svgWrapper, styles.classGrid)}>
          <Icon icon="DuelistIcon" />
          <Icon icon="MarauderIcon" />
          <Icon icon="RangerIcon" />
          <Icon icon="ScionIcon" />
          <Icon icon="ShadowIcon" />
          <Icon icon="TemplarIcon" />
          <Icon icon="WitchIcon" />
        </div>
        <Heading as="h4" className={cx('my-5', styles.header)}>
          ASCENDANCY BUILDS
        </Heading>
        <div className={cx('mt-3', styles.svgWrapper, styles.ascendancyGrid)}>
          <Icon icon="SlayerIcon" />
          <Icon icon="GladiatorIcon" />
          <Icon icon="ChampionIcon" />
          <Icon icon="NecromancerIcon" />
          <Icon icon="ElementalistIcon" />
          <Icon icon="OccultistIcon" />
          <Icon icon="JuggernoutIcon" />
          <Icon icon="BerserkerIcon" />
          <Icon icon="ChieftainIcon" />
          <Icon icon="DeadeyeIcon" />
          <Icon icon="RaiderIcon" />
          <Icon icon="PathfinderIcon" />
          <Icon icon="AscendantIcon" />
          <Icon icon="AssassinIcon" />
          <Icon icon="SaboteurIcon" />
          <Icon icon="TricksterIcon" />
          <Icon icon="InquisitorIcon" />
          <Icon icon="HierophantIcon" />
          <Icon icon="GuardianIcon" />
        </div>
      </div>
    </nav>
  );
};

export default SidebarBuildsDesktop;
