import fs from 'fs';
import { SkillTreeData } from '../components/SkillTree/models/SkillTreeData';
import data from '../skill-tree-data/data.json';
const colorifyConsole = require('#utils/colorifyConsole');
import {
  ascendancyDimensions,
  CURRENT_VERSION,
  generateEntry,
  generateSkillNodes,
  generateSkillPaths,
} from './utils';

const generateAscendancyTreeSVG = async (version: string, ascendancy: string) => {
  if (
    !fs.existsSync(
      `${process.cwd()}/features/builds/components/SkillTree/${version}/svg/${ascendancy}.svg`
    )
  ) {
    await fs.appendFile(
      `${process.cwd()}/features/builds/components/SkillTree/${version}/svg/${ascendancy}.svg`,
      '',
      (err) => err && console.log(err)
    );
  }

  const text = `${ascendancy} tree svg generated in`;
  await console.time(colorifyConsole({ label: 'time', text }));

  const { nodes, constants, groups } = await new SkillTreeData(data as any, version);

  let svg = [];
  const { circles, min_x, min_y, width, height } = await generateSkillNodes({
    nodes,
    constants,
    groups,
    ascendancy,
  });
  const entry = await generateEntry({ min_y, min_x, width, height });
  const lines = await generateSkillPaths({ nodes, constants, groups, ascendancy });
  const footer = [`</svg>`];

  await svg.push(entry);
  await svg.push(
    `<g style='transform: translate(calc(50% - ${
      ascendancyDimensions[ascendancy].width / 2
    }px) calc(50% - ${ascendancyDimensions[ascendancy].height / 2}px))'>`
  );
  await svg.push(lines);
  await svg.push(circles);
  await svg.push(`</g>`);
  await svg.push(footer);
  const tree = svg.join('\n').split(',').join('').split('px) ').join('px), ');

  await fs.writeFileSync(
    `features/builds/components/SkillTree/${version}/svg/${ascendancy}.svg`,
    tree
  );

  await console.timeEnd(colorifyConsole({ label: 'time', text }));
  ascendancy === 'Guardian' &&
    console.info(colorifyConsole({ label: 'info', text: 'All trees generated!' }));
};

Object.keys(ascendancyDimensions).map((ascendancy) =>
  generateAscendancyTreeSVG(CURRENT_VERSION, ascendancy)
);
