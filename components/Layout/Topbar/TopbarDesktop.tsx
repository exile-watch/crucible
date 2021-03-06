import styles from './TopbarDesktop.module.scss';
import cx from 'classnames'
import InputWithResults from "#components/InputWithResults/InputWithResults";

const TopbarDesktop = () => {
  return (
    <nav className={cx('py-2', styles.topbar)}>
      <InputWithResults />
    </nav>
  );
};

export default TopbarDesktop;