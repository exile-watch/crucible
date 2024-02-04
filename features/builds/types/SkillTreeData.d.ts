interface ISkillTreeData {
  patch: string;
  version: number;
  groups: { [id: string]: IGroup };
  root: IRootNode;
  nodes: { [id: string]: ISkillNode };
  min_x: number;
  min_y: number;
  max_x: number;
  max_y: number;
  constants: IConstants;
}
