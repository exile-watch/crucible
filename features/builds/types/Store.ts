import { Descendant } from 'slate';

type FAQType = {
  id: number;
  q: string;
  a: string;
};

type VariantType = {
  title: string;
  conceptText: Descendant[];
  detrimentalMapMods: { label: string; value: string }[];
  ascendancy: {
    tree: string[];
  };
  passives: {
    tree: string[];
  };
  faq: FAQType[];
  bandit: number | null;
};

export type BuildSlice = {
  title: string;
  activeVariant: number;
  introductionText: Descendant[];
  kudosText: Descendant[];
  faq: FAQType[];
  variants: VariantType[];
};
