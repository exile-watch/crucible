import { Descendant } from 'slate';

import { Labirynth } from '#enums/labirynth';

type AscendancyType = {
  skill: string;
  possibleOutNodes: string[];
};

type Variant = {
  title: string;
  introductionText: Descendant[];
  ascendancy: {
    [Labirynth.Normal]: AscendancyType;
    [Labirynth.Cruel]: AscendancyType;
    [Labirynth.Merciless]: AscendancyType;
    [Labirynth.Eternal]: AscendancyType;
  };
};

export type BuildSlice = {
  title: string;
  activeVariant: number;
  variants: Variant[];
};
