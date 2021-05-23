import { useEffect } from 'react';

import * as Trees314 from '#features/builds/components/SkillTree/3.14/components';
import usePassiveTreeHighlight from '#features/builds/hooks/usePassiveTreeHighlight';
import {
  selectActiveVariant,
  selectPassivesTreeNodes,
  togglePassivesTreeNode,
} from '#features/builds/slices/buildSlice';
import useRouter from '#hooks/useRouter';
import { useDispatch, useSelector } from '#hooks/useStore';

import EditorSectionWrapper from '../EditorSectionWrapper';
import { startingNodes } from './starting-nodes';

import styles from './PassivesTree.module.scss';

const PassivesTree = () => {
  const isWindow = typeof window !== 'undefined';
  const dispatch = useDispatch();
  const {
    query: { poe_class },
  } = useRouter();
  const activeVariant = useSelector(selectActiveVariant);
  const PassivesTree: any = Trees314['Tree'];
  const nodes: any = useSelector(selectPassivesTreeNodes);
  const selector = `v${activeVariant}_leveling`;

  useEffect(() => {
    if (isWindow) {
      const startingNode = startingNodes[poe_class].id;
      const [outNodes]: any = document.getElementById(`skill-${startingNode}`)?.classList;
      const possibleOutNodes = outNodes.split('-').slice(1);
      dispatch(togglePassivesTreeNode({ skill: `skill-${startingNode}`, possibleOutNodes }));
    }
  }, [isWindow]);

  usePassiveTreeHighlight({
    selector: `#${selector}`,
    nodes,
    action: togglePassivesTreeNode,
  });

  const handleNodeClick = ({ target: { id } }: Event) => {
    const [outNodes, , , root]: any = document.getElementById(id)?.classList;
    const possibleOutNodes = outNodes.split('-').slice(1);

    !root && dispatch(togglePassivesTreeNode({ skill: id, possibleOutNodes }));
  };

  return (
    <EditorSectionWrapper section="Passives Tree">
      <div className={styles.treeSvg}>
        <PassivesTree id={selector} onClick={handleNodeClick} />
      </div>
    </EditorSectionWrapper>
  );
};

export default PassivesTree;
