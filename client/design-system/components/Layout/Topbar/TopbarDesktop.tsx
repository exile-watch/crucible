import cx from 'classnames';
import Link from 'next/link';

import { InputWithResults } from '#design-system/components';

import Icons from './Icons';
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
