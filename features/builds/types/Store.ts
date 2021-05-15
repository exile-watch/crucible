import { Descendant } from 'slate';

import { Labirynth } from '#enums/labirynth';

type AscendancyType = {
  skill: string;
  possibleOutNodes: string[];
};

type Variant = {
  title: string;
  activeVariant: number;
  conceptText: Descendant[];
  ascendancy: {
    [Labirynth.Normal]: AscendancyType;
    [Labirynth.Cruel]: AscendancyType;
    [Labirynth.Merciless]: AscendancyType;
    [Labirynth.Eternal]: AscendancyType;
  };
  leveling: {
    tree: string[];
  };
};

export type BuildSlice = {
  title: string;
  activeVariant: number;
  introductionText: Descendant[];
  variants: Variant[];
};
