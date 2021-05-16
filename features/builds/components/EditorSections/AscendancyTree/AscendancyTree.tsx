import EditorSectionWrapper from '#features/builds/components/EditorSections/EditorSectionWrapper';
import * as Trees314 from '#features/builds/components/SkillTree/3.14/components';
import usePassiveTreeHighlight from '#features/builds/hooks/usePassiveTreeHighlight';
import {
  selectActiveVariant,
  selectAscendancyTreeNodes,
  toggleAscendancyTreeNode,
} from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import styles from './AscendancyTree.module.scss';

type Event = { target: { id: string } };

const AscendancyTree = () => {
  const dispatch = useDispatch();
  const activeVariant = useSelector(selectActiveVariant);
  const AscendancyTree: any = Trees314['Assassin'];
  const selector = `v${activeVariant}_ascendancyTree`;
  const nodes: any = useSelector(selectAscendancyTreeNodes);

  usePassiveTreeHighlight({
    selector: `#${selector}`,
    nodes,
    action: toggleAscendancyTreeNode,
  });

  const handleNodeClick = ({ target: { id } }: Event) => {
    const [outNodes, , root]: any = document.getElementById(id)?.classList;
    const possibleOutNodes = outNodes.split('-').slice(1);

    !root && dispatch(toggleAscendancyTreeNode({ skill: id, possibleOutNodes }));
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
