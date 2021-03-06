/**
 * pageDir = all available page directories under {dirName} in `/pages/[dirName]/[fileName].json` path
 * fileName = all available pages under {fileName} in `/pages/[dirName]/[fileName].json` path
 */
export type useImportDataProps = {
  pageDir?: 'bosses';
  fileName: 'boss' | 'paths' | 'indexed-search';
}

export type useImportDataReturnProps = {
  pageTitle?: string | string[];
  isLoading: boolean;
  data: IndexedSearchResultsProps
}

export type IndexedSearchResultsBossProps = {
  mapPath: string;
  mapName: string;
  bossPath: string;
  bossName: string;
  abilityPath: string;
  abilityName: string;
}

export type IndexedSearchResultsProps = Array<IndexedSearchResultsBossProps> | null

export type SupportedDamageTypes = 'fire' | 'lightning' | 'cold' | 'chaos' | 'physical';

export type BossAbilityType = {
  name: string;
  about: string[];
  gif: string;
  phases: number[];
  transmissions: number[];
  playerInteraction?: string[]
}

export type SingleBossDataType = {
  name: string;
  phases: number;
  transmissions: number;
  damageTypes: SupportedDamageTypes[];
  abilities: BossAbilityType[]
}

export type MultipleBossDataType = {
  multiple: boolean;
  bosses: BossDataType[]
}

export type BossDataType = SingleBossDataType | MultipleBossDataType;