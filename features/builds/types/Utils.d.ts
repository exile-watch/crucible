type GenerateEntryProps = {
  min_y: ISkillTreeData['min_y'];
  min_x: ISkillTreeData['min_x'];
  width: number;
  height: number;
};

type GenerateSkillTypes = {
  nodes: ISkillTreeData['nodes'];
  constants: ISkillTreeData['constants'];
  groups: ISkillTreeData['groups'];
  ascendancy?: string;
};
