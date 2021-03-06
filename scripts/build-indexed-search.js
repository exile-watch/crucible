const { kebabCase } = require('lodash')
const fs = require('fs');

const inputDir = `./extracted-data/maps`;
const outputDir = `./extracted-data`
const data = [];

fs.readdirSync('./tokens').forEach(dir => {
  fs.readdirSync(`./extracted-data/${dir}`).forEach(file => {
    data.push(JSON.parse(fs.readFileSync(`./extracted-data/${dir}/${file}`)))
  })
})

const prepareIndexedSearchData = () => data.reduce((acc, map) => {
  const mapPath = map.map && `${map.category}/${kebabCase(map.map)}`;
  let searchObj = []

  /**
   * Add map name as a separate entity and path to redirect for indexed search
   */
  if(map.map) {
    const newMapIndexedSearch = {
      mapPath,
      mapName: map.map,
    }
    searchObj.push(newMapIndexedSearch)
  }

  /**
   * Add boss name as a separate entity and path to redirect for indexed search
   */
  if(map.bosses) {
    map.bosses.map(boss => {
      const [bossName, bossValues] = Object.entries(boss)[0];
      const bossPath = map.map
        ? `${mapPath}/${kebabCase(bossName)}`
        : `${map.category}/${map.category}/${kebabCase(bossName)}`
      const newBossIndexedSearch = {
        ...(map.map && {
          mapPath,
          mapName: map.map
        }),
        bossPath,
        bossName
      }
      searchObj.push(newBossIndexedSearch)

      /**
       * Add every boss ability as a separate entity and path to redirect for indexed search
       */
      if(bossValues.abilities) {
        bossValues.abilities.map(ability => {
          const [abilityName] = Object.entries(ability)[0];
          const newAbilityIndexedSearch = {
            ...newBossIndexedSearch,
            abilityPath: `${bossPath}?ability=${kebabCase(abilityName)}`,
            abilityName
          }

          searchObj.push(newAbilityIndexedSearch)
        })
      }
    })
  }
  return acc.concat(searchObj)
}, [])

const buildIndexedSearch = async () => {
  const preparedIndexedSearchData = await prepareIndexedSearchData();
  return JSON.stringify(preparedIndexedSearchData);
}

buildIndexedSearch().then(data => {
  return fs.writeFileSync(`${outputDir}/indexed-search.json`, data)
})