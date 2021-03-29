const fs = require('fs');
const yaml = require('js-yaml');

const rootPath = './features/encounters'
const tokensPath = `${rootPath}/tokens`;
const extractedDataPath = `${rootPath}/extracted-data`

const getExtractedData = async () => {
  await console.time('Spells Data Extract Time')
  return yaml.load(fs.readFileSync(`${tokensPath}/skills.yml`, 'utf8'));
};

getExtractedData()
  .then(async (extractedData)=> {
    await fs.writeFileSync(`${extractedDataPath}/skills.json`, JSON.stringify(extractedData));
    await console.timeEnd('Spells Data Extract Time')
  })
  .catch(async (err) => {
    await console.log(err)
    await console.timeEnd('Spells Data Extract Time')
  });
