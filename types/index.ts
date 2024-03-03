/**
 * pageDir = all available page directories under {dirName} in `/pages/[dirName]/[fileName].json` path
 * fileName = all available pages under {fileName} in `/pages/[dirName]/[fileName].json` path
 */
export type useImportDataProps = {
  feature?: "encounters";
  pageDir?: "bosses";
  fileName: "boss" | "paths" | "indexed-search";
};

export type IndexedSearchResultsBossProps = {
  mapPath: string;
  mapName: string;
  encounterPath: string;
  encounterName: string;
  encounterAbilityPath: string;
  encounterAbilityName: string;
};

export type IndexedSearchResultsProps =
  Array<IndexedSearchResultsBossProps> | null;

export type SupportedDamageTypes =
  | "fire"
  | "lightning"
  | "cold"
  | "chaos"
  | "physical";

export type SingleBossDataType = {
  name: string;
  phases: number;
  transmissions: number;
  damageTypes: SupportedDamageTypes[];
  abilities: BossAbilityType[];
};

export type MultipleBossDataType = {
  multiple: boolean;
  bosses: BossDataType[];
};

export type BossDataType = SingleBossDataType | MultipleBossDataType;

/**
 * useRouter()
 */
export type RouterType = {
  query: {
    category: string;
    map?: string;
    boss?: string;
    ability?: string;
  };
};

export type AtomPathData = Array<{
  label: string;
  path: string;
}>;

export type PathDataType =
  | {
      [category: string]: AtomPathData;
    }
  | null
  | [];

/**
 * Category / Map / Boss Data
 */
export type BossAbilityWithNameType = {
  tip: string[];
  about: string[];
  gif: string;
  isChallenge?: boolean;
  aboutChallenge?: string;
  type?: string;
  name?: string;
};

export type PureBossAbilityType = {
  tip: string[];
  about?: string[];
  gif: string;
  isChallenge?: boolean;
  aboutChallenge?: string;
  type?: string;
  name?: string;
  isEven?: boolean;
};

export type BossAbilityType = {
  [abilityName: string]: PureBossAbilityType;
};

export type BossType = {
  [bossName: string]: {
    abilities: BossAbilityType[];
    damageTypes: string[];
  };
};

export type MapType = {
  bosses: BossType[];
  category: string;
  map: string;
};

export type DataType = MapType | null;

export type Themes = "light" | "dark";
