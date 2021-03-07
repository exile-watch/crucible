const fs = require('fs');
const { toLower, kebabCase } = require('lodash');
const yaml = require('js-yaml');

const injectAllAbilityDamageTypesToBoss = (data) => {
  const bosses = data.bosses.map((d) => {
    let damageTypes = [];
    const [bossName, { abilities }] = Object.entries(d)[0];
    abilities.map((ability) => {
      const [a] = Object.values(ability);
      a.type && damageTypes.push(a.type);
    });

    return {
      [bossName]: {
        damageTypes: [...new Set(damageTypes.flat())],
        abilities,
      },
    };
  });

  return {
    ...data,
    bosses,
  };
};

const getExtractedData = async () => {
  let data = [];
  await fs.readdirSync('./tokens').forEach((dir) => {
    if(dir === 'README.md') return;
    const outputDir = `./tokens/${dir}`;
    try {
      fs.readdirSync(outputDir).forEach((file) => {
        try {
          const convertedDataToJson = yaml.load(fs.readFileSync(`${outputDir}/${file}`, 'utf8'));
          const dataWithBossDamageTypes = injectAllAbilityDamageTypesToBoss(convertedDataToJson);

          const dataWithDir = { category: dir, ...dataWithBossDamageTypes };
          data.push(dataWithDir);
        } catch (fileErr) {
          console.log(fileErr);
        }
      });
    } catch (dirErr) {
      console.log(dirErr);
    }
  });
  return data;
};

getExtractedData().then((extractedData) => {
  extractedData.forEach((data) => {
    const [bossName] = Object.keys(data.bosses[0]);
    const fileName = data.map
      ? `${toLower(kebabCase(data.map))}.json`
      : `${toLower(kebabCase(bossName))}.json`;

    fs.writeFileSync(`./extracted-data/${data.category}/${fileName}`, JSON.stringify(data));
  });
});
