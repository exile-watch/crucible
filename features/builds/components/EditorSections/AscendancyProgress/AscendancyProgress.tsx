import { Labirynth } from '#enums/labirynth';
import { selectNormalAscendancyNodes } from '#features/builds/slices/buildSlice';
import { useSelector } from '#hooks/useStore';

import EditorSectionWrapper from '../EditorSectionWrapper';
import Ascendancy from './Ascendancy';

import styles from './AscendancyProgress.module.scss';

const AscendancyProgress = () => {
  const normalAscendancyNodes = useSelector(selectNormalAscendancyNodes);

  return (
    <EditorSectionWrapper section="Ascendancy Progress">
      <div className={styles.treeSvg}>
        <Ascendancy labirynth={Labirynth.Normal} nodes={normalAscendancyNodes} />
      </div>
    </EditorSectionWrapper>
  );
};

export default AscendancyProgress;
