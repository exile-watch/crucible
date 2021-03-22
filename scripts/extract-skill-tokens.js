const fs = require('fs');
const yaml = require('js-yaml');

const getExtractedData = async () => {
  await console.time('Spells Data Extract Time')
  const input = `./tokens/skills.yml`;
  return yaml.load(fs.readFileSync(input, 'utf8'));
};

getExtractedData().then(async (extractedData)=> {
  await fs.writeFileSync(`./extracted-data/skills.json`, JSON.stringify(extractedData));
  await console.timeEnd('Spells Data Extract Time')
});
