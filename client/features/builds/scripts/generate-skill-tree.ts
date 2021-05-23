import { SkillTreeData } from '../components/SkillTree/models/SkillTreeData';
import * as fs from 'fs';

const colorifyConsole = require('../../../build-tools/utils/colorifyConsole');
import data from '../skill-tree-data/data.json';
import { CURRENT_VERSION, generateEntry, generateSkillNodes, generateSkillPaths } from './utils';

console.info(colorifyConsole({ label: 'info', text: 'Starting generating trees...' }));
const generateTreeSVG = async (version: string) => {
  if (!fs.existsSync(`${process.cwd()}/features/builds/components/SkillTree/${version}/svg`)) {
    await fs.mkdirSync(`${process.cwd()}/features/builds/components/SkillTree/${version}/svg`, {
      recursive: true,
    });
  }

  if (
    !fs.existsSync(`${process.cwd()}/features/builds/components/SkillTree/${version}/svg/Tree.svg`)
  ) {
    await fs.appendFile(
      `${process.cwd()}/features/builds/components/SkillTree/${version}/svg/Tree.svg`,
      '',
      (err) => err && console.log(err)
    );
  }

  const text = `Skill tree svg generated in`;
  await console.time(colorifyConsole({ label: 'time', text }));

  const { nodes, constants, groups } = await new SkillTreeData(data as any, version);

  let svg = [];
  const { circles, min_x, min_y, width, height } = await generateSkillNodes({
    nodes,
    constants,
    groups,
  });
  const entry = await generateEntry({ min_y, min_x, width, height });
  const lines = await generateSkillPaths({ nodes, constants, groups });
  const footer = [`</svg>`];
  await svg.push(entry);
  await svg.push(lines);
  await svg.push(circles);
  await svg.push(footer);
  const tree = svg.join('\n').split(',').join('');

  await fs.writeFileSync(`features/builds/components/SkillTree/${version}/svg/Tree.svg`, tree);

  await console.timeEnd(colorifyConsole({ label: 'time', text }));
};

generateTreeSVG(CURRENT_VERSION);
