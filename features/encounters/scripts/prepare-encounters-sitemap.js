const fs = require('fs');
const yaml = require('js-yaml');
const { toLower, kebabCase } = require('lodash');

const getDirectories = require('../../../utils/getDirectories.js');
const generateXmlUrl = require('../../../utils/generateXmlUrl.js');
const SITEMAP_PRIORITY = require('../../../constants/sitemapPriority.js');

const domain = 'https://TBD';
const rootPath = './features/encounters';
const tokensPath = `${rootPath}/tokens`;

const getExtractedEncountersData = async () => {
  let xml = [];
  await getDirectories(tokensPath).forEach((dir) => {
    try {
      fs.readdirSync(`${tokensPath}/${dir}`).forEach((file) => {
        try {
          const convertedDataToJson = yaml.load(
            fs.readFileSync(`${tokensPath}/${dir}/${file}`, 'utf8')
          );

          const dataWithDir = { category: dir, ...convertedDataToJson };
          xml.push(dataWithDir);
        } catch (fileErr) {
          console.log(fileErr);
        }
      });
    } catch (dirErr) {
      console.log(dirErr);
    }
  });
  return xml;
};

const encounterCategoriesSitemapUrls = async () => {
  let xml = [];
  await getDirectories(tokensPath).forEach((dir) => {
    const categoryLoc = `${domain}/encounters/${dir}`;

    xml.push(
      generateXmlUrl({
        loc: categoryLoc,
        priority: SITEMAP_PRIORITY.FEATURE_ENCOUNTERS_CATEGORY,
      })
    );
  });

  return xml;
};

const encountersMapsBossesAndAbilitiesSitemapUrls = async () =>
  await getExtractedEncountersData().then((extractedEncountersData) => {
    let xml = [];
    extractedEncountersData.forEach(async (data) => {
      const [bossName] = await Object.keys(data.bosses[0]);
      const encounterAbilities = Object.values(data.bosses[0])[0].abilities;
      const fileName = data.map
        ? `${toLower(kebabCase(data.map))}`
        : `${toLower(kebabCase(bossName))}`; // console.log();
      const mapOrBossLoc = `${domain}/encounters/${data.category}/${fileName}`;
      // xml.push(xmlUrl({ loc: categoryLoc, priority: PRIORITY.FEATURE_ENCOUNTERS_CATEGORY }));
      xml.push(
        generateXmlUrl({
          loc: mapOrBossLoc,
          priority: SITEMAP_PRIORITY.FEATURE_ENCOUNTERS_CATEGORY_MAP,
        })
      );

      encounterAbilities.forEach((ability) => {
        const [abilityName] = Object.keys(ability);
        const abilityLoc = `${domain}/encounters/${data.category}/${fileName}?ability=${toLower(
          kebabCase(abilityName)
        )}`;

        xml.push(
          generateXmlUrl({
            loc: abilityLoc,
            priority: SITEMAP_PRIORITY.FEATURE_ENCOUNTERS_CATEGORY_MAP_BOSS_SKILLS,
          })
        );
      });
    });

    return xml;
  });

module.exports = {
  encounterCategoriesSitemapUrls,
  encountersMapsBossesAndAbilitiesSitemapUrls,
};
