const fs = require('fs');
const yaml = require('js-yaml');
const colorifyConsole = require('../../../utils/colorifyConsole');

const rootPath = './features/encounters';
const tokensPath = `${rootPath}/tokens`;
const extractedDataPath = `${rootPath}/extracted-data`;

const getExtractedData = async () => {
  await console.time(colorifyConsole({ label: 'time', text: 'Extract Encounters Spells' }));
  return yaml.load(fs.readFileSync(`${tokensPath}/skills.yml`, 'utf8'));
};

getExtractedData()
  .then(async (extractedData) => {
    await fs.writeFileSync(`${extractedDataPath}/skills.json`, JSON.stringify(extractedData));
    await console.timeEnd(colorifyConsole({ label: 'time', text: 'Extract Encounters Spells' }));
  })
  .catch(async (err) => {
    await console.log(err);
    await console.timeEnd(colorifyConsole({ label: 'time', text: 'Extract Encounters Spells' }));
  });
