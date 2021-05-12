import { Constants } from './Constants';
import { SkillNode, SkillNodeStates } from './SkillNode';

export class SkillTreeData implements ISkillTreeData {
  patch: string;
  version: number;
  groups: { [id: string]: IGroup };
  root: IRootNode;
  nodes: { [id: string]: SkillNode };
  min_x: number;
  min_y: number;
  max_x: number;
  max_y: number;
  constants: Constants;
  circles: { [id: string]: ICircleOption[] };

  width: number;
  height: number;
  Build: ISkillTreeBuild;

  constructor(skillTree: ISkillTreeData, patch: string, options?: ISkillTreeOptions | undefined) {
    this.patch = patch || options?.version || 'test';
    this.version = 4;
    skillTree.version = this.version;
    //this.skillTreeOptions = options;
    this.groups = skillTree.groups;
    this.root = skillTree.root || skillTree.nodes['root'];
    this.min_x = skillTree.min_x;
    this.max_x = skillTree.max_x;
    this.min_y = skillTree.min_y;
    this.max_y = skillTree.max_y;
    this.constants = new Constants(skillTree.constants);
    this.circles = options?.circles || {
      Small: [
        { level: 0.1246, width: 199 },
        { level: 0.2109, width: 337 },
        { level: 0.2972, width: 476 },
        { level: 0.3835, width: 614 },
      ],
      Medium: [
        { level: 0.1246, width: 299 },
        { level: 0.2109, width: 506 },
        { level: 0.2972, width: 713 },
        { level: 0.3835, width: 920 },
      ],
      Large: [
        { level: 0.1246, width: 374 },
        { level: 0.2109, width: 633 },
        { level: 0.2972, width: 892 },
        { level: 0.3835, width: 1151 },
      ],
    };
    this.width = Math.abs(this.min_x) + Math.abs(this.max_x);
    this.height = Math.abs(this.min_y) + Math.abs(this.max_y);
    this.Build = { JewelSettings: {}, TreeHash: '' } as ISkillTreeBuild;

    // #region Setup in/out properties correctly
    {
      for (const id in skillTree.nodes) {
        skillTree.nodes[id].in = [];
      }
      for (const id in skillTree.nodes) {
        if (skillTree.nodes[id].isMastery) {
          continue;
        }
        if (skillTree.nodes?.[id]?.out) {
          for (const outId of skillTree.nodes[id].out) {
            if (skillTree.nodes[id].in.indexOf(outId) < 0) {
              skillTree.nodes[id].in.push(outId);
            }
            if (skillTree.nodes[outId]?.out.indexOf(+id) < 0) {
              skillTree.nodes[outId].out.push(+id);
            }
          }

          for (const inId of skillTree.nodes[id]?.in) {
            if (skillTree.nodes[id].out.indexOf(inId) < 0) {
              skillTree.nodes[id].out.push(inId);
            }
            if (skillTree.nodes[inId]?.in.indexOf(+id) < 0) {
              skillTree.nodes[inId].in.push(+id);
            }
          }
        }
      }
    }
    // #endregion

    const groupsCompleted: { [id: string]: boolean | undefined } = {};
    for (const id in skillTree.nodes) {
      const node = skillTree.nodes[id];
      const nodeGroupId = node.g || node.group || 0;
      if (node.isAscendancyStart && groupsCompleted[nodeGroupId] === undefined) {
        let startNode: ISkillNode | undefined = undefined;
        for (const o of node.out) {
          if (skillTree.nodes[o].classStartIndex !== undefined) {
            startNode = skillTree.nodes[o];
          }
        }

        for (const o of node.in) {
          if (skillTree.nodes[o].classStartIndex !== undefined) {
            startNode = skillTree.nodes[o];
          }
        }

        if (startNode === undefined) {
          continue;
        }

        let offset = 0;
        const centerThreshold = 100;
        const offsetDistance = 1450;
        let baseX = 0;
        let baseY = 0;
        const startGroup = this.groups[startNode.g || startNode.group || 0];

        if (
          startGroup.x > -centerThreshold &&
          startGroup.x < centerThreshold &&
          startGroup.y > -centerThreshold &&
          startGroup.y < centerThreshold
        ) {
          // Scion
          baseX = this.min_x * 0.65;
          baseY = this.max_y * 0.95;
        } else if (startGroup.x > -centerThreshold && startGroup.x < centerThreshold) {
          // Witch, Duelist
          baseX = startGroup.x + Math.sign(startGroup.x) * offset * offsetDistance;
          baseY = Math.sign(startGroup.y) > 0 ? this.max_y * 1.05 : this.min_y;
        } else {
          // Templar, Marauder, Ranger, Shadow
          baseX = startGroup.x < 0 ? this.min_x * 0.8 : this.max_x;
          baseY = startGroup.y + Math.sign(startGroup.y) * (offset + 1) * offsetDistance;
        }

        groupsCompleted[nodeGroupId] = true;
        for (const oid in skillTree.nodes) {
          const other = skillTree.nodes[oid];
          const otherGroupId = other.g || other.group || 0;
          if (
            groupsCompleted[otherGroupId] === undefined &&
            other.ascendancyName === node.ascendancyName
          ) {
            const diffX = this.groups[nodeGroupId].x - this.groups[otherGroupId].x;
            const diffY = this.groups[nodeGroupId].y - this.groups[otherGroupId].y;
            this.groups[otherGroupId].x = baseX - diffX;
            this.groups[otherGroupId].y = baseY - diffY;
            groupsCompleted[otherGroupId] = true;
          }
        }

        this.groups[nodeGroupId].x = baseX;
        this.groups[nodeGroupId].y = baseY;
      }
    }
    // #endregion

    this.nodes = {};
    for (const id in skillTree.nodes) {
      const groupId = skillTree.nodes[id].g || skillTree.nodes[id].group || 0;
      const node = new SkillNode(
        skillTree.nodes[id],
        skillTree.groups[groupId],
        skillTree.constants.orbitRadii,
        skillTree.constants.skillsPerOrbit
      );
      if (node.classStartIndex === 3) {
        node.add(SkillNodeStates.Active);
      }

      this.nodes[id] = node;
    }
  }
}
