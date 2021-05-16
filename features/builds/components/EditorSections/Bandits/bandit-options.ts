type BanditOptionType = {
  label: string;
  value: number;
  rewards: string[];
}[];

const BANDIT_OPTIONS: BanditOptionType = [
  {
    label: 'Save Alira',
    value: 1,
    rewards: [
      '5 Mana Regenerated per second',
      '+20% to Global Critical Strike Multiplier',
      '+15% to all Elemental Resistances',
    ],
  },
  {
    label: 'Save Oak',
    value: 2,
    rewards: [
      '1% of Life Regenerated per second',
      '2% additional Physical Damage Reduction',
      '20% increased Physical Damage',
    ],
  },
  {
    label: 'Save Kraityn',
    value: 3,
    rewards: [
      '6% increased Attack and Cast Speed',
      '3% chance to Dodge Attacks',
      '6% increased Movement Speed',
    ],
  },
  {
    label: 'Kill All',
    value: 4,
    rewards: ['2 Passive Skill Points'],
  },
];

export default BANDIT_OPTIONS;
