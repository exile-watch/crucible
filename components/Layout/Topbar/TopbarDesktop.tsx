import cx from 'classnames';
import Link from 'next/link';

import InputWithResults from '#components/InputWithResults/InputWithResults';
import Icons from '#components/Layout/Topbar/Icons';

import Modules from './Modules';

import styles from './TopbarDesktop.module.scss';

const TopbarDesktop = () => {
  return (
    <nav className={cx('theme-transition-scope', styles.topbar)}>
      <div className="px-3 py-2">
        <Link href="/" legacyBehavior>exile.watch</Link>
      </div>
      <Modules />
      <InputWithResults />
      <Icons />
    </nav>
  );
};

export default TopbarDesktop;
