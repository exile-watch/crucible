import { Labirynth } from '#enums/labirynth';
import {
  selectCruelAscendancyNodes,
  selectEternalAscendancyNodes,
  selectMercilessAscendancyNodes,
  selectNormalAscendancyNodes,
} from '#features/builds/slices/buildSlice';
import { useSelector } from '#hooks/useStore';

import EditorSectionWrapper from '../EditorSectionWrapper';
import Ascendancy from './Ascendancy';

import styles from './AscendancyProgress.module.scss';

const AscendancyProgress = () => {
  const normalAscendancyNodes = useSelector(selectNormalAscendancyNodes);
  const cruelAscendancyNodes = useSelector(selectCruelAscendancyNodes);
  const mercilessAscendancyNodes = useSelector(selectMercilessAscendancyNodes);
  const eternalAscendancyNodes = useSelector(selectEternalAscendancyNodes);

  return (
    <EditorSectionWrapper section="Ascendancy Progress">
      <div className={styles.treeSvg}>
        <Ascendancy labirynth={Labirynth.Normal} nodes={normalAscendancyNodes} />
        <Ascendancy labirynth={Labirynth.Cruel} nodes={cruelAscendancyNodes} />
        <Ascendancy labirynth={Labirynth.Merciless} nodes={mercilessAscendancyNodes} />
        <Ascendancy labirynth={Labirynth.Eternal} nodes={eternalAscendancyNodes} />
      </div>
    </EditorSectionWrapper>
  );
};

export default AscendancyProgress;
