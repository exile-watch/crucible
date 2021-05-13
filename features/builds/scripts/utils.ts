import { minBy, maxBy, uniqBy } from 'lodash';

const CURRENT_VERSION = '3.14';
const nonSupportedJewels = ['Small Jewel Socket', 'Medium Jewel Socket', 'Position Proxy'];

const generateEntry = ({ min_y, min_x, width, height }: GenerateEntryProps) => {
  const viewBox = `${min_x} ${min_y} ${width} ${height}`;

  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + viewBox + '">';
};

const generateSkillNodes = async ({ nodes, constants, groups, ascendancy }: GenerateSkillTypes) => {
  let circles: string[] = [];
  let sortedNodes = [];
  for (const n in nodes) {
    let node: any = nodes[n];
    const nodeGroup = groups?.[node.group];
    const arc = (2 * Math.PI * node.orbitIndex) / constants.skillsPerOrbit[node.orbit];
    const generateNonAscendencyNodes = !ascendancy && node.ascendancyName !== '';
    const generateAscendencyNodes = ascendancy && node.ascendancyName !== ascendancy;

    if (
      nonSupportedJewels.includes(node.name) ||
      generateAscendencyNodes ||
      generateNonAscendencyNodes
    )
      continue;

    if (nodeGroup) {
      node.x = nodeGroup.x - constants.orbitRadii[node.orbit] * Math.sin(-arc);
      node.y = nodeGroup.y - constants.orbitRadii[node.orbit] * Math.cos(-arc);
    }

    if (!node.isMastery) {
      const supportedJewels = ['Large Jewel Socket', 'Basic Jewel Socket'];
      sortedNodes.push(node);
      const id = `skill-${node.skill}`;
      const outNodes = ['out', ...uniqBy(node.out, (v) => +v)].join('-');
      const rootClass = node.isAscendancyStart ? ' root ' : '';

      if (supportedJewels.includes(node.name)) {
        const dimensions = 50;
        const x = node.x - dimensions / 2;
        const y = node.y - dimensions / 2;

        circles.push(
          ` <rect x="${x}" y="${y}" width="${dimensions}" height="${dimensions}" id="${id}" class="${outNodes} s0" />`
        );
      } else {
        const radius = !node.isRegular2 || node.isKeystone ? 50 : 30;
        circles.push(
          `  <circle cx='${node.x}' cy="${node.y}" r="${radius}" fill="var(--secondary-bg)" id="${id}" class="${outNodes} s0 ${rootClass}"/>`
        );
      }
    }
  }

  const { x: max_x } = await maxBy(sortedNodes, (node) => node.x);
  const { y: max_y } = await maxBy(sortedNodes, (node) => node.y);
  const { x: min_x } = await minBy(sortedNodes, (node) => node.x);
  const { y: min_y } = await minBy(sortedNodes, (node) => node.y);
  const width = Math.abs(max_x) + Math.abs(min_x);
  const height = Math.abs(max_y) + Math.abs(min_y);
  const data = { circles };

  return ascendancy
    ? { ...data, min_x, min_y, width: 1450, height: 1450 }
    : { ...data, min_x: min_x - 60, min_y: min_y - 100, width: width + 150, height: height + 200 };
};

const generateSkillPaths = async ({ nodes, constants, groups, ascendancy }: GenerateSkillTypes) => {
  let lines: any = [];
  let duplicates: any = [];
  let reversedPairs: any = [];

  for (const n in nodes) {
    let node: any = nodes[n];
    const generateNonAscendencyNodes = !ascendancy && node.ascendancyName !== '';
    const generateAscendencyNodes = ascendancy && node.ascendancyName !== ascendancy;
    if (
      [...nonSupportedJewels, 'Large Jewel Socket'].includes(node.name) ||
      generateAscendencyNodes ||
      generateNonAscendencyNodes
    )
      continue;

    let nodeGroup = groups?.[node.group];
    let arc = (2 * Math.PI * node.orbitIndex) / constants.skillsPerOrbit[node.orbit];

    if (nodeGroup) {
      node.x = nodeGroup.x - constants.orbitRadii[node.orbit] * Math.sin(-arc);
      node.y = nodeGroup.y - constants.orbitRadii[node.orbit] * Math.cos(-arc);
      node.arc = arc;
    }
    if (node.out.length <= 1) continue;
    if (node.out && node?.group) {
      node.out.map((nodeOutId) => {
        const connectedNode = Object.values(nodes).find(
          (nodeToConnect) => +nodeToConnect.skill === +nodeOutId
        );
        if (!connectedNode?.skill) return;

        if (
          reversedPairs.some(
            (pair) =>
              (pair[0] === +node.skill || pair[0] === +nodeOutId) &&
              (pair[1] === +node.skill || pair[1] === +nodeOutId)
          )
        )
          return;

        if (
          !!duplicates.find(
            (p) => p.connectedNodeId === connectedNode.skill && p.nodeId === node.skill
          ) ||
          +connectedNode.skill === +node.skill
        )
          return;

        if (
          (node.ascendancyName !== '' && connectedNode.ascendancyName === '') ||
          (node?.ascendancyName === '' && connectedNode.ascendancyName !== '')
        )
          return;

        if (connectedNode.classStartIndex) return;

        duplicates.push({ connectedNodeId: connectedNode.skill, nodeId: node.skill });
        reversedPairs.push([+node.skill, +nodeOutId].sort((a, b) => a > b));
        const strokeWidth = 30;
        const id = `skill-${node.skill}-${nodeOutId}`;
        if (node.group === connectedNode.group && node.orbit === connectedNode.orbit) {
          const r = constants.orbitRadii[node.orbit];

          if (
            (node.arc - connectedNode.arc > 0 && node.arc - connectedNode.arc <= Math.PI) ||
            node.arc - connectedNode.arc < -Math.PI
          ) {
            const d = `M ${node.x} ${node.y} A ${r} ${r} 0 0 0 ${connectedNode.x} ${connectedNode.y}`;
            lines.push(
              `  <path d='${d}' stroke='var(--secondary-bg)' fill='transparent' stroke-width='${strokeWidth}' id='${id}' />`
            );
          } else {
            const d = `M ${connectedNode.x} ${connectedNode.y} A ${r} ${r} 0 0 0 ${node.x} ${node.y}`;
            lines.push(
              `  <path d='${d}' stroke='var(--secondary-bg)' fill='transparent' stroke-width='${strokeWidth}' id='${id}'/>`
            );
          }
        } else {
          lines.push(
            `  <line x1='${node.x}' y1='${node.y}' x2='${connectedNode.x}' y2='${connectedNode.y}' stroke='var(--secondary-bg)' stroke-width='${strokeWidth}' id="${id}" />`
          );
        }
      });
    }
  }

  return lines;
};

type AscendancyDimensionsProps = {
  [k: string]: {
    width: number;
    height: number;
  };
};
const ascendancyDimensions: AscendancyDimensionsProps = {
  ['Ascendant']: {
    width: 1170,
    height: 1200,
  },
  // Witch
  ['Occultist']: {
    width: 930,
    height: 600,
  },
  ['Necromancer']: {
    width: 930,
    height: 600,
  },
  ['Elementalist']: {
    width: 930,
    height: 600,
  },
  // Shadow
  ['Assassin']: {
    width: 950,
    height: 900,
  },
  ['Trickster']: {
    width: 910,
    height: 600,
  },
  ['Saboteur']: {
    width: 460,
    height: 680,
  },
  // Ranger
  ['Deadeye']: {
    width: 770,
    height: 700,
  },
  ['Pathfinder']: {
    width: 630,
    height: 660,
  },
  ['Raider']: {
    width: 640,
    height: 680,
  },
  // Duelist
  ['Slayer']: {
    width: 950,
    height: 640,
  },
  ['Champion']: {
    width: 880,
    height: 600,
  },
  ['Gladiator']: {
    width: 820,
    height: 700,
  },
  // Marauder
  ['Juggernaut']: {
    width: 530,
    height: 630,
  },
  ['Berserker']: {
    width: 710,
    height: 960,
  },
  ['Chieftain']: {
    width: 800,
    height: 920,
  },
  // Templar
  ['Inquisitor']: {
    width: 930,
    height: 760,
  },
  ['Hierophant']: {
    width: 700,
    height: 960,
  },
  ['Guardian']: {
    width: 440,
    height: 960,
  },
};

export {
  CURRENT_VERSION,
  generateEntry,
  generateSkillNodes,
  generateSkillPaths,
  nonSupportedJewels,
  ascendancyDimensions,
};
