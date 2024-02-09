import { SkillsType } from '#features/builds/types/Gems';

export type FAQType = {
  id: number;
  q: string;
  a: string;
};

type VariantType = {
  title: string;
  conceptText: Descendant[];
  prosAndCons: {
    pros: { label: string; id: string }[];
    cons: { label: string; id: string }[];
  };
  detrimentalMapMods: { label: string; value: string }[];
  ascendancy: {
    tree: string[];
  };
  passives: {
    tree: string[];
  };
  draftSkills: SkillsType;
  skills: SkillsType;
  faq: FAQType[];
  bandit: number | null;
};

export type BuildSlice = {
  title: string;
  pob: string;
  activeVariant: number;
  introductionText: Descendant[];
  kudosText: Descendant[];
  faq: FAQType[];
  variants: VariantType[];
};
