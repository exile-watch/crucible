import { create } from '@storybook/theming';

const common = {
  brandTitle: 'poe.watch',
  brandUrl: 'https://example.com',
}


const colorPrimaryDark = '#e6e2af';
const colorSecondaryDark = '#3e3e34';
const bgPrimaryDark = '#181818';
const bgSecondaryDark = '#212121';
const bgTertiaryDark = '#aaaaaa';

export default create({
  ...common,
  base: 'dark',

  colorPrimary: colorPrimaryDark,
  colorSecondary: colorSecondaryDark,

  appBg: bgSecondaryDark,
  appContentBg: bgPrimaryDark,
  appBorderColor: bgTertiaryDark,

  textColor: colorPrimaryDark,

  barBg: bgSecondaryDark,
  barSelectedColor: colorPrimaryDark,
  barTextColor: colorPrimaryDark,

  inputBg: colorSecondaryDark,
  inputBorder: colorPrimaryDark,
  inputTextColor: colorPrimaryDark
});