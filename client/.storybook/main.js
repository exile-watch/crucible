const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    "../design-system/components/**/*.stories.mdx",
    "../design-system/components/**/*.stories.tsx"
  ],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          }
        }
      }
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-pseudo-states"
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      propFilter: {
        skipPropsWithName: ['as', 'id', 'className', 'style'],
      },
    },
  },
  webpackFinal: async (config) => {
    const tsconfig = new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.json')
    });

    if (config.resolve.plugins) {
      config.resolve.plugins.push(tsconfig);
    } else {
      config.resolve.plugins = [tsconfig];
    }

    return config;
  }
}