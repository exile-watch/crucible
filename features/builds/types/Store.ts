import { Descendant } from 'slate';

type Variant = {
  title: string;
  conceptText: Descendant[];
  ascendancy: {
    tree: string[];
  };
  passives: {
    tree: string[];
  };
  bandit: number | null;
};

export type BuildSlice = {
  title: string;
  activeVariant: number;
  introductionText: Descendant[];
  kudosText: Descendant[];
  variants: Variant[];
};
