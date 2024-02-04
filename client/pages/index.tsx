import cx from 'classnames';

import { Layout } from '#design-system/components';
import Video from '#features/encounters/components/Boss/BossAbilities/BossAbility/Video/Video';

import styles from './styles.module.scss';

export default function Home() {
  return (
    <Layout>
      <div className={styles.w}>
        <div className={styles.f}>
          <div className={cx(styles.v, styles.v1)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v2)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v3)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v4)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v5)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v6)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v8)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v9)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v10)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v11)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v12)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
          <div className={cx(styles.v, styles.v13)}>
            <Video src="https://i.gyazo.com/0ae5e57e06c64c6640de7ffd196836e1.mp4" />
          </div>
        </div>
        <div className={styles.g}>
          <div className={cx(styles.v, styles.v1)}>
            <Video src="https://i.gyazo.com/41c10c1cc7d06c7d5fee3287cdf58724.mp4" />
          </div>
          <div className={cx(styles.v, styles.v2)}>
            <Video src="https://i.gyazo.com/533749402c4ef1e510627be5a3c3be2d.mp4" />
          </div>
          <div className={cx(styles.v, styles.v3)}>
            <Video src="https://i.gyazo.com/c81d99f82cbd7d107d2d79eaafa05003.mp4" />
          </div>
          <div className={cx(styles.v, styles.v4)}>
            <Video src="https://i.gyazo.com/af587790623c80b1c3e35bc475c1ff07.mp4" speed={1.2} />
          </div>
          <div className={cx(styles.v, styles.v5)}>
            <Video src="https://i.gyazo.com/7253f72da3642c889a24471ac8f0adca.mp4" />
          </div>
          <div className={cx(styles.v, styles.v6)}>
            <Video src="https://i.gyazo.com/f463b4ae782b0d3b95993e84501392b8.mp4" />
          </div>
          <div className={cx(styles.v, styles.v8)}>
            <Video src="https://i.gyazo.com/41c10c1cc7d06c7d5fee3287cdf58724.mp4" />
          </div>
          <div className={cx(styles.v, styles.v9)}>
            <Video src="https://i.gyazo.com/133891e728790ee87a2ff63574ba9146.mp4" />
          </div>
          <div className={cx(styles.v, styles.v10)}>
            <Video src="https://i.gyazo.com/da1fea337f53f65f408dd500ab90478a.mp4" />
          </div>
          <div className={cx(styles.v, styles.v11)}>
            <Video src="https://i.gyazo.com/e8752c9c1899b02a551a593e5a467c7b.mp4" />
          </div>
          <div className={cx(styles.v, styles.v12)}>
            <Video src="https://i.gyazo.com/9fc638cc0cffd82754d4205f025dfcf4.mp4" />
          </div>
          <div className={cx(styles.v, styles.v13)}>
            <Video src="https://i.gyazo.com/d0583bb3c9d03c81cbcfef9338f690be.mp4" />
          </div>
        </div>
      </div>
      <div className={styles.bg} />
      <div className={styles.text}></div>
    </Layout>
  );
}
