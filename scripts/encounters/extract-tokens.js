const fs = require('fs');
const { toLower, kebabCase } = require('lodash');
const yaml = require('js-yaml');
const skills = require('../../extracted-data/skills.json');

/**
 * Replaces `/SKILL/` value to matched key/value in `tokens/skills.yml`
 *
 * @example
 * // ...
 * abilities:
 *  - Slam
 *    - about:
 *      - /FIREBALL/
 *      - does something specific to this boss's ability
 *      - and something else
 * // ...
 * @becomes:
 * abilities:
 *  - Slam
 *    - about:
 *      - Unleashes a ball of fire towards a target which explodes, damaging nearby foes
 *      - does something specific to this boss's ability
 *      - and something else
 */
const replaceTokenWithValue = arr => arr.map(about => {
  // See more at https://github.com/sbsrnt/poe-watch/tree/main/tokens/README.md
  const IS_SKILL_TOKEN = about && about.charAt && about.charAt(0) === '/'
  if(IS_SKILL_TOKEN) {
    const [, skill] = about.split('/');
    about = skills[skill];
  }
  return about;
})

const injectAllAbilityDamageTypesToBoss = (data) => {
  const bosses = data.bosses.map((d) => {
    let damageTypes = [];
    const [bossName, { abilities }] = Object.entries(d)[0];
    abilities.map((ability) => {
      const [a] = Object.values(ability);
      if(a.type ) {
        damageTypes.push(a.type);
      }


      if(a.about) {
        a.about = replaceTokenWithValue(a.about)
      }
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
  await console.time('Data Extract Time')
  let data = [];
  await fs.readdirSync('./tokens/encounters').forEach((dir) => {
    if(dir === 'README.md') return;
    const outputDir = `./tokens/encounters/${dir}`;
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

getExtractedData().then(async (extractedData)=> {
  await extractedData.forEach((data) => {
    const [bossName] = Object.keys(data.bosses[0]);
    const fileName = data.map
      ? `${toLower(kebabCase(data.map))}.json`
      : `${toLower(kebabCase(bossName))}.json`;

    fs.writeFileSync(`./extracted-data/encounters/${data.category}/${fileName}`, JSON.stringify(data));
  });
  await console.timeEnd('Data Extract Time')
});
