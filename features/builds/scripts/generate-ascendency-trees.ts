import fs from 'fs';
import { SkillTreeData } from '../components/SkillTree/models/SkillTreeData';
import data from '../skill-tree-data/data.json';
const colorifyConsole = require('../../../build-tools/utils/colorifyConsole');
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
    fs.appendFile(
      `${process.cwd()}/features/builds/components/SkillTree/${version}/svg/${ascendancy}.svg`,
      '',
      (err) => err && console.log(err)
    );
  }

  const text = `${ascendancy} tree svg generated in`;
  console.time(colorifyConsole({ label: 'time', text }));

  const { nodes, constants, groups } = new SkillTreeData(data as any, version);

  let svg = [];
  const { circles, min_x, min_y, width, height } = await generateSkillNodes({
    nodes,
    constants,
    groups,
    ascendancy,
  });
  const entry = generateEntry({ min_y, min_x, width, height });
  const lines = await generateSkillPaths({ nodes, constants, groups, ascendancy });
  const footer = [`</svg>`];

  svg.push(entry);
  svg.push(
    `<g style='transform: translate(calc(50% - ${
      ascendancyDimensions[ascendancy].width / 2
    }px) calc(50% - ${ascendancyDimensions[ascendancy].height / 2}px))'>`
  );
  svg.push(lines);
  svg.push(circles);
  svg.push(`</g>`);
  svg.push(footer);
  const tree = svg.join('\n').split(',').join('').split('px) ').join('px), ');

  fs.writeFileSync(
    `features/builds/components/SkillTree/${version}/svg/${ascendancy}.svg`,
    tree
  );

  console.timeEnd(colorifyConsole({ label: 'time', text }));
  ascendancy === 'Guardian' &&
    console.info(colorifyConsole({ label: 'info', text: 'All trees generated!' }));
};

Object.keys(ascendancyDimensions).map((ascendancy) =>
  generateAscendancyTreeSVG(CURRENT_VERSION, ascendancy)
);
