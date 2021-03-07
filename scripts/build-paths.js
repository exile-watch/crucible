const { kebabCase } = require('lodash');
const _ = require('lodash');
const fs = require('fs');

const tokensDir = './tokens';
const outputDir = `./extracted-data`;
const data = [];

fs.readdirSync(tokensDir).forEach((dir) => {
  if(dir === 'README.md') return;
  fs.readdirSync(`./extracted-data/${dir}`).forEach((file) => {
    data.push(JSON.parse(fs.readFileSync(`./extracted-data/${dir}/${file}`)));
  });
});

const preparePathsData = () =>
  data.reduce((acc, map) => {
    const [bossName] = Object.keys(map.bosses[0]);
    const path = map.map
      ? `/${map.category}/${kebabCase(map.map)}/${kebabCase(bossName)}`
      : `/${map.category}/${map.category}/${kebabCase(bossName)}`;

    return acc.concat({
      [map.category]: [
        {
          label: map.category === 'maps' ? map.map : bossName,
          path,
        },
      ],
    });

    // In case we will want boss names instead of map names in sidebar
    // if(map.bosses) {
    //   map.bosses.map(boss => {
    //     const [bossName] = Object.entries(boss)[0];
    //     const path = map.map
    //       ? `/${map.category}/${kebabCase(map.map)}`
    //       : `/${map.category}/${kebabCase(map.category)}/${kebabCase(bossName)}`
    //     paths.push({
    //       [kebabCase(map.category)]: [
    //         {
    //           label: map.category === 'maps' ? map.map : bossName,
    //           path
    //         }
    //       ]
    //     })
    //   })
    // }
    // return acc.concat(paths)
  }, []);

const mergeSameKeysInArr = (arr) =>
  _(arr)
    .groupBy()
    .map((g) => _.mergeWith({}, ...g, (obj, src) => (_.isArray(obj) ? obj.concat(src) : undefined)))
    .value();

const buildPaths = async () => {
  const preparedPaths = await preparePathsData();
  const [paths] = await mergeSameKeysInArr(preparedPaths);

  return JSON.stringify(paths);
};

buildPaths().then((data) => {
  return fs.writeFileSync(`${outputDir}/paths.json`, data);
});
