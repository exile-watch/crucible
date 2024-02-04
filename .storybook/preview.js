import '!style-loader!css-loader!sass-loader!./design-system/styles/styles.scss';
import theme from './theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme
  }
}