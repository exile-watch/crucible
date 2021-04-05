const { kebabCase } = require('lodash');
const _ = require('lodash');
const fs = require('fs');
const getDirectories = require('../../../utils/getDirectories');

const rootPath = './features/encounters'
const tokensPath = `${rootPath}/tokens`;
const extractedDataPath = `${rootPath}/extracted-data`
const data = [];

getDirectories(tokensPath).forEach((dir) => {
  fs.readdirSync(`${extractedDataPath}/${dir}`).forEach((file) => {
    data.push(JSON.parse(fs.readFileSync(`${extractedDataPath}/${dir}/${file}`)));
  });
});

const preparePathsData = () =>
  data.reduce((acc, map) => {
    const [bossName] = Object.keys(map.bosses[0]);
    const path = map.map
      ? `/encounters/${map.category}/${kebabCase(map.map)}/${kebabCase(bossName)}`
      : `/encounters/${map.category}/${kebabCase(bossName)}`;

    return acc.concat({
      [map.category]: [
        {
          label: map.map ? map.map : bossName,
          path,
        },
      ],
    });

    // In case we will want boss names instead of map names in sidebar
    // if(map.bosses) {
    //   map.bosses.map(boss => {
    //     const [bossName] = Object.entries(boss)[0];
    //     const path = map.map
    //       ? `/encounters/${map.category}/${kebabCase(map.map)}`
    //       : `/encounters/${map.category}/${kebabCase(map.category)}/${kebabCase(bossName)}`
    //     paths.push({
    //       [kebabCase(map.category)]: [
    //         {
    //           label: map.category === 'common-maps' ? map.map : bossName,
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
  await console.time('Build Paths Time')
  const preparedPaths = await preparePathsData();
  const [paths] = await mergeSameKeysInArr(preparedPaths);

  return JSON.stringify(paths);
};

buildPaths()
  .then(async (data) => {
    await fs.writeFileSync(`${extractedDataPath}/paths.json`, data);
    await console.timeEnd('Build Paths Time')
  })
  .catch(async (err) => {
    await console.log(err)
    await console.timeEnd('Build Paths Time')
  });
