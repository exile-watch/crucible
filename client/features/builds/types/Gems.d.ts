export type GemType = {
  id: string;
  img: string;
  skill: string;
  tags: string[];
  type: 'a' | 'c' | 's'; // a: aura, c: curse, s: support
  types: string[];
};

export type GemAttributeCategoriesTypes = {
  actives: GemType[];
  auras: GemType[];
  curses: GemType[];
  supports: GemType[];
};

export type GemsDataType = {
  version: 3.14 | 3.15;
  gems: {
    dex: GemAttributeCategoriesTypes;
    int: GemAttributeCategoriesTypes;
    str: GemAttributeCategoriesTypes;
  };
};

export type AttributeTypes = 'Dexterity' | 'Intelligence' | 'Strength';
export type AttributeAbbrTypes = 'dex' | 'int' | 'str';

type BuildGemType = { id: string | null; level: number; quality: number };
export type SocketsType = BuildGemType[];

export type SkillsType = {
  mainhand: {
    primary: SocketsType;
    secondary: SocketsType;
    tertiary?: SocketsType;
    quaternary?: SocketsType;
  };
  offhand: {
    primary: SocketsType;
    secondary: SocketsType;
  };
  body: {
    primary: SocketsType;
    secondary: SocketsType;
  };
  helmet: SocketsType;
  gloves: SocketsType;
  boots: SocketsType;
};
