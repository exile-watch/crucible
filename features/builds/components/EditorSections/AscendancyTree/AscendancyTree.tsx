import { Labirynth } from '#enums/labirynth';
import EditorSectionWrapper from '#features/builds/components/EditorSections/EditorSectionWrapper';
import * as Trees314 from '#features/builds/components/SkillTree/3.14/components';
import usePassiveTreeHighlight from '#features/builds/hooks/usePassiveTreeHighlight';
import {
  selectActiveVariant,
  selectNormalAscendancyNodes,
  toggleAscendancyNode,
} from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import styles from './AscendancyTree.module.scss';

type Event = { target: { id: string } };

const AscendancyTree = () => {
  const dispatch = useDispatch();
  const activeVariant = useSelector(selectActiveVariant);
  const AscendancyTree: any = Trees314['Assassin'];
  const selector = `v${activeVariant}_${Labirynth.Normal}`;
  const nodes: any = useSelector(selectNormalAscendancyNodes);

  usePassiveTreeHighlight({
    selector: `#${selector}`,
    nodes,
    action: toggleAscendancyNode,
    labirynth: Labirynth.Normal,
  });

  const handleNodeClick = ({ target: { id } }: Event) => {
    const [outNodes, , root]: any = document.getElementById(id)?.classList;
    const possibleOutNodes = outNodes.split('-').slice(1);

    !root &&
      dispatch(toggleAscendancyNode({ skill: id, possibleOutNodes, labirynth: Labirynth.Normal }));
  };

  return (
    <EditorSectionWrapper section="Ascendancy Tree">
      <div className={styles.treeSvg}>
        <AscendancyTree id={selector} onClick={handleNodeClick} />
      </div>
    </EditorSectionWrapper>
  );
};

export default AscendancyTree;
