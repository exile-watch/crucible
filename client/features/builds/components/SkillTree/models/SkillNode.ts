import { utils } from '../utils';

export enum SkillNodeStates {
  None = 0,
  Active = 1 << 0,
  Hovered = 1 << 1,
  Pathing = 1 << 2,
  Highlighted = 1 << 3,
  Compared = 1 << 4,
  Moved = 1 << 5,
}

export class SkillNode implements ISkillNode {
  skill: number;
  id: number;
  dn: string | undefined;
  name: string;
  icon: string;
  ks: boolean | undefined;
  isKeystone: boolean;
  not: boolean | undefined;
  isNotable: boolean;
  m: boolean | undefined;
  isMastery: boolean;
  isJewelSocket: boolean;
  isMultipleChoice: boolean;
  isMultipleChoiceOption: boolean;
  passivePointsGranted: number;
  ascendancyName: string;
  isAscendancyStart: boolean;
  spc: number[] | undefined;
  classStartIndex: number | undefined;
  sd: string[] | undefined;
  stats: string[];
  reminderText: string[];
  flavourText: string[];
  g: number | undefined;
  group: number | undefined;
  o: number | undefined;
  orbit: number;
  oidx: number | undefined;
  orbitIndex: number;
  da: number | undefined;
  grantedDexterity: number;
  ia: number | undefined;
  grantedIntelligence: number;
  sa: number | undefined;
  grantedStrength: number;
  out: number[];
  in: number[];
  state: SkillNodeStates;

  nodeGroup: IGroup | undefined;
  orbitRadii: Array<number>;
  skillsPerOrbit: Array<number>;
  arc: number;
  x: number;
  y: number;
  isRegular2: boolean;
  isRegular1: boolean;

  constructor(
    node: ISkillNode,
    group: IGroup | undefined,
    orbitRadii: Array<number>,
    skillsPerOrbit: Array<number>
  ) {
    this.skill = node.skill || -1;
    this.id = node.id || node.skill;
    this.dn = node.dn;
    this.name = node.name || node.dn || '';
    this.icon = node.icon || '';
    this.ks = node.ks;
    this.isKeystone = node.isKeystone || node.ks || false;
    this.not = node.not;
    this.isNotable = node.isNotable || node.not || false;
    this.m = node.m;
    this.isMastery = node.isMastery || node.m || false;
    this.isJewelSocket = node.isJewelSocket || false;
    this.isMultipleChoice = node.isMultipleChoice || false;
    this.isMultipleChoiceOption = node.isMultipleChoiceOption || false;
    this.passivePointsGranted = node.passivePointsGranted || 0;
    this.ascendancyName = node.ascendancyName || '';
    this.isAscendancyStart = node.isAscendancyStart || false;
    this.spc = node.spc;
    this.classStartIndex =
      node.classStartIndex !== undefined
        ? node.classStartIndex
        : this.spc && this.spc.length > 0
        ? this.spc[0]
        : undefined;
    this.sd = node.sd;
    this.stats = node.stats || node.sd || [];
    this.reminderText = node.reminderText || [];
    this.flavourText = node.flavourText || [];
    this.g = node.g;
    this.group = node.group || node.g;
    this.o = node.o;
    this.orbit = node.orbit || node.o || 0;
    this.oidx = node.oidx;
    this.orbitIndex = node.orbitIndex || node.oidx || 0;
    this.da = node.da;
    this.grantedDexterity = node.grantedDexterity || node.da || 0;
    this.ia = node.ia;
    this.grantedIntelligence = node.grantedIntelligence || node.ia || 0;
    this.sa = node.sa;
    this.grantedStrength = node.grantedStrength || node.sa || 0;
    this.out = node.out || [];
    this.in = node.in || [];
    this.state = SkillNodeStates.None;

    this.nodeGroup = group;
    this.orbitRadii = orbitRadii;
    this.skillsPerOrbit = skillsPerOrbit;
    this.arc = this.getArc(this.orbitIndex);
    this.x = this.getX(this.arc);
    this.y = this.getY(this.arc);
    this.isRegular2 = !this.isKeystone && !this.isNotable && !this.isJewelSocket && !this.isMastery;
    this.isRegular1 =
      this.isRegular2 &&
      (this.grantedStrength > 0 || this.grantedDexterity > 0 || this.grantedIntelligence > 0) &&
      this.stats.filter(utils.NotNullOrWhiteSpace).length === 1;

    if (this.passivePointsGranted > 0) {
      this.stats.push(
        `Grants ${this.passivePointsGranted} Passive Skill Point${
          this.passivePointsGranted > 1 ? 's' : ''
        }`
      );
    }
  }

  private getArc = (oidx: number): number =>
    this.skillsPerOrbit.length > this.orbit
      ? (2 * Math.PI * oidx) / this.skillsPerOrbit[this.orbit]
      : 0;
  private getX = (arc: number): number =>
    this.orbitRadii.length > this.orbit && this.nodeGroup !== undefined
      ? this.nodeGroup.x - this.orbitRadii[this.orbit] * Math.sin(-arc)
      : 0;
  private getY = (arc: number): number =>
    this.orbitRadii.length > this.orbit && this.nodeGroup !== undefined
      ? this.nodeGroup.y - this.orbitRadii[this.orbit] * Math.cos(-arc)
      : 0;

  public is = (test: SkillNodeStates) => {
    return (this.state & test) === test;
  };

  public add = (state: SkillNodeStates) => {
    this.state |= state;
  };

  public remove = (state: SkillNodeStates) => {
    this.state &= ~state;
  };
}
