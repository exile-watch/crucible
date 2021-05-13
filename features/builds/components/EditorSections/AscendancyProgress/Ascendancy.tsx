import { Labirynth } from '#enums/labirynth';
import * as Trees314 from '#features/builds/components/SkillTree/3.14/components';
import usePassiveTreeHighlight from '#features/builds/hooks/usePassiveTreeHighlight';
import { selectActiveVariant, toggleAscendancyNode } from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

type AscendancyTypes = {
  labirynth: Labirynth;
  nodes: any;
};

type Event = { target: { id: string } };

const Ascendancy = ({ labirynth, nodes }: AscendancyTypes) => {
  const dispatch = useDispatch();
  const activeVariant = useSelector(selectActiveVariant);
  const AscendancyTree: any = Trees314['Assassin'];
  const selector = `v${activeVariant}_${labirynth}`;

  usePassiveTreeHighlight({
    selector: `#${selector}`,
    nodes,
    action: toggleAscendancyNode,
    labirynth,
  });

  const handleNodeClick = ({ target: { id } }: Event) => {
    const [outNodes, , root]: any = document.getElementById(id)?.classList;
    const possibleOutNodes = outNodes.split('-').slice(1);

    !root && dispatch(toggleAscendancyNode({ skill: id, possibleOutNodes, labirynth }));
  };

  return <AscendancyTree id={selector} onClick={handleNodeClick} />;
};

export default Ascendancy;
