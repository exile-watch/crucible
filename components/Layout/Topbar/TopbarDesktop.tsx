import styles from './TopbarDesktop.module.scss';
import cn from 'classnames'
import InputWithResults from "#components/InputWithResults/InputWithResults";

const TopbarDesktop = () => {
  return (
    <nav className={cn('py-2', styles.topbar)}>
      <InputWithResults />
    </nav>
  );
};

export default TopbarDesktop;