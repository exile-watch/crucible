import { Meta, Story } from '@storybook/react';

import { Heading } from '#design-system/components';

import * as icons from '.';

const classes = [
  'WitchIcon',
  'ScionIcon',
  'ShadowIcon',
  'DuelistIcon',
  'MarauderIcon',
  'TemplarIcon',
  'MarauderIcon',
];

const ascendancies = [
  'AscendantIcon',
  'BerserkerIcon',
  'ChieftainIcon',
  'JuggernoutIcon',
  'DeadeyeIcon',
  'PathfinderIcon',
  'RaiderIcon',
  'ElementalistIcon',
  'NecromancerIcon',
  'OccultistIcon',
  'HierophantIcon',
  'GuardianIcon',
  'InquisitorIcon',
  'SlayerIcon',
  'GladiatorIcon',
  'ChampionIcon',
  'AssassinIcon',
  'TricksterIcon',
  'SaboteurIcon',
];

const formats = [
  'FormatBoldIcon',
  'FormatItalicIcon',
  'FormatUnderlineIcon',
  'FormatCodeIcon',
  'FormatHeadingOneIcon',
  'FormatHeadingTwoIcon',
  'FormatQuoteIcon',
  'FormatBulletedListIcon',
  'FormatNumberedListIcon',
];

const infos = ['InfoIcon', 'SuccessIcon', 'WarningIcon', 'ErrorIcon'];

const fillMisc = ['MoonIcon', 'SunIcon', 'VerticalMenuIcon', 'PreviewIcon'];

const strokeMisc = [
  'ArrowDownIcon',
  'ArrowRightIcon',
  'LinkIcon',
  'RedirectIcon',
  'SearchIcon',
  'TrashIcon',
  'AddIcon',
  'CommentsIcon',
  'CrossIcon',
  'EditIcon',
];

const filterBy = (arr: any) => Object.entries(icons).filter(([k]) => arr.includes(k));

const classIcons = filterBy(classes);
const ascendancyIcons = filterBy(ascendancies);
const formatIcons = filterBy(formats);
const infoIcons = filterBy(infos);
const fillMiscIcons = filterBy(fillMisc);
const strokeMiscIcons = filterBy(strokeMisc);

const Group = ({ group, icons, className = 'icons' }: any) => (
  <>
    <Heading as="h2" className={`mb-3 ${group !== 'Class' && 'mt-5'}`}>
      {group} Icons
    </Heading>
    <div className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {icons.map(([k, Icon]: any) => (
        <div
          key={k}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          className="mr-3 mb-3"
        >
          <Icon
            width={['icons', 'stroke'].includes(className) ? 40 : 60}
            height={['icons', 'stroke'].includes(className) ? 40 : 60}
            className="mb-2"
          />
          <p>{k}</p>
        </div>
      ))}
    </div>
  </>
);

const Icons = () => (
  <>
    <Group group="Class" icons={classIcons} className="rounded" />
    <Group group="Ascendancy" icons={ascendancyIcons} className="rounded" />
    <Group group="Format" icons={formatIcons} />
    <Group group="Info" icons={infoIcons} />
    <Group group="Fill Misc" icons={fillMiscIcons} />
    <Group group="Stroke Misc" icons={strokeMiscIcons} className="stroke" />
  </>
);

export default {
  title: 'Icons',
  component: Icons,
  parameters: {
    viewMode: 'docs',
  },
} as Meta;

const Template: Story = (args) => <Icons {...args} />;

export const All = Template.bind({});
