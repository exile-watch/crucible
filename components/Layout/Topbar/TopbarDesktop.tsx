import cx from 'classnames';
import Link from 'next/link';

import InputWithResults from '#components/InputWithResults/InputWithResults';

import Modules from './Modules';

import styles from './TopbarDesktop.module.scss';

const TopbarDesktop = () => {
  return (
    <nav className={cx('py-2', styles.topbar)}>
      <div className="px-3">
        <Link href="/">exile.watch</Link>
      </div>
      <Modules />
      <InputWithResults />
    </nav>
  );
};

export default TopbarDesktop;
