const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    "../design-system/components/**/*.stories.tsx",
    "../design-system/icons/**/*.stories.tsx"
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
    "@storybook/addon-essentials"
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (prop.declarations !== undefined && prop.declarations.length > 0) {
          const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
            return !declaration.fileName.includes("node_modules");
          });

          return Boolean(hasPropAdditionalDescription);
        }

        return true;
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