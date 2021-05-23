import fs from 'fs';
import yaml from 'js-yaml';
import colorifyConsole from '../../../build-tools/utils/colorifyConsole';

const rootPath = './features/builds';
const tokensPath = `${rootPath}/tokens`;
const extractedDataPath = `${rootPath}/extracted-data`;

const getExtractedData = async () => {
  // @ts-ignore
  await console.time(colorifyConsole({ label: 'time', text: 'Extract Map Mods' }));
  return yaml.load(fs.readFileSync(`${tokensPath}/map-mods.yml`, 'utf8'));
};

getExtractedData()
  .then(async (extractedData) => {
    await fs.writeFileSync(`${extractedDataPath}/map-mods.json`, JSON.stringify(extractedData));
    // @ts-ignore
    await console.timeEnd(colorifyConsole({ label: 'time', text: 'Extract Map Mods' }));
  })
  .catch(async (err) => {
    await console.log(err);
    // @ts-ignore
    await console.timeEnd(colorifyConsole({ label: 'time', text: 'Extract Map Mods' }));
  });
