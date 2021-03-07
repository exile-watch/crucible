import cx from 'classnames';

import InputWithResults from '#components/InputWithResults/InputWithResults';

import styles from './TopbarDesktop.module.scss';

const TopbarDesktop = () => {
  return (
    <nav className={cx('py-2', styles.topbar)}>
      <InputWithResults />
    </nav>
  );
};

export default TopbarDesktop;
