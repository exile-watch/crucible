const Uint8ArryToBase64 = (arr: Uint8Array): string => {
  return btoa(Array.prototype.map.call(arr, (c: number) => String.fromCharCode(c)).join(''))
    .replace(/\+/gi, '-')
    .replace(/\//gi, '_');
};

const Base64ToUint8Array = (str: string): Uint8Array => {
  str = atob(str.replace(/-/gi, '+').replace(/_/gi, '/'));
  const arr = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i);
  }
  return arr;
};

const encodeURL = ({ classid, ascid, skilledNodes, treeVersion = 4 }): string => {
  const bytes = [];
  bytes.push((treeVersion >> 24) & 0xff);
  bytes.push((treeVersion >> 16) & 0xff);
  bytes.push((treeVersion >> 8) & 0xff);
  bytes.push((treeVersion >> 0) & 0xff);
  bytes.push(classid);
  bytes.push(ascid);
  bytes.push(0); //fullscreen -false = 0, true = 1

  const nodes = new Array<ISkillNode>();
  for (const id in skilledNodes) {
    nodes.push(skilledNodes[id]);
  }
  nodes.sort((a, b) => {
    return (a.id || a.skill) - (b.id || b.skill);
  });

  for (const node of nodes) {
    if (node.classStartIndex !== undefined || node.isAscendancyStart) {
      continue;
    }
    bytes.push(((node.id || node.skill) >> 8) & 0xff);
    bytes.push((node.id || node.skill) & 0xff);
  }

  return Uint8ArryToBase64(new Uint8Array(bytes));
};

const decodeURL = (encoding: string, skillTreeData: ISkillTreeData): SkillTreeDefinition => {
  const skillTreeDefinition: SkillTreeDefinition = {
    Version: 4,
    Class: 0,
    Ascendancy: 0,
    Fullscreen: 0,
    Nodes: new Array<ISkillNode>(),
  };
  const bytes = Base64ToUint8Array(encoding);
  skillTreeDefinition.Version = (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
  skillTreeDefinition.Class = bytes[4];
  skillTreeDefinition.Ascendancy = bytes[5];

  if (skillTreeDefinition.Version > 3) {
    skillTreeDefinition.Fullscreen = bytes[6];
  }
  for (let i = skillTreeDefinition.Version > 3 ? 7 : 6; i < bytes.length; i += 2) {
    const id = (bytes[i] << 8) | bytes[i + 1];
    const node = skillTreeData.nodes[id];
    if (node !== undefined) {
      skillTreeDefinition.Nodes.push(node);
    }
  }
  return skillTreeDefinition;
};

export { encodeURL, decodeURL };
