const { kebabCase } = require('lodash');
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

const prepareIndexedSearchData = () =>
  data.reduce((acc, map) => {
    const mapPath = map.map && `/encounters/${map.category}/${kebabCase(map.map)}`;
    let searchObj = [];

    /**
     * Add map name as a separate entity and path to redirect for indexed search
     */
    if (map.map) {
      const newMapIndexedSearch = {
        mapPath,
        mapName: map.map,
      };
      searchObj.push(newMapIndexedSearch);
    }

    /**
     * Add boss name as a separate entity and path to redirect for indexed search
     */
    if (map.bosses) {
      map.bosses.map((boss) => {
        const [bossName, bossValues] = Object.entries(boss)[0];
        const bossPath = map.map
          ? `${mapPath}/${kebabCase(bossName)}`
          : `/encounters/${map.category}/${kebabCase(bossName)}`;
        const newBossIndexedSearch = {
          ...(map.map && {
            mapPath,
            mapName: map.map,
          }),
          bossPath,
          bossName,
        };
        searchObj.push(newBossIndexedSearch);

        /**
         * Add every boss ability as a separate entity and path to redirect for indexed search
         */
        if (bossValues.abilities) {
          bossValues.abilities.map((ability) => {
            const [abilityName] = Object.entries(ability)[0];
            const newAbilityIndexedSearch = {
              ...newBossIndexedSearch,
              abilityPath: `${bossPath}?ability=${kebabCase(abilityName)}`,
              abilityName,
            };

            searchObj.push(newAbilityIndexedSearch);
          });
        }
      });
    }
    return acc.concat(searchObj);
  }, []);

const buildIndexedSearch = async () => {
  await console.time('Indexed Search Time')
  const preparedIndexedSearchData = await prepareIndexedSearchData();
  return JSON.stringify(preparedIndexedSearchData);
};

buildIndexedSearch()
  .then(async (data) => {
    await fs.writeFileSync(`${extractedDataPath}/indexed-search.json`, data);
    await console.timeEnd('Indexed Search Time')
  })
  .catch(async (err) => {
    await console.log(err)
    await console.timeEnd('Indexed Search Time')
  });
