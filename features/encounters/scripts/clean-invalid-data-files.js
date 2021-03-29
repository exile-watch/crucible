const fs = require('fs');
const { kebabCase } = require('lodash');

const cleanInvalidDataFiles = async () => {
  await fs.readdirSync('./tokens/encounters').forEach((dir) => {
    if(dir === 'README.md') return;
    try {
      const d = kebabCase(dir);
      const supportedFiles = fs.readdirSync(`./tokens/encounters/${d}`);
      const currentDataFiles = fs.readdirSync(`./extracted-data/encounters/${d}`);
      const supportedFilesInJsonExt = supportedFiles.map(
        (file) => `${file.split('.').shift()}.json`
      ); //.yml by default
      console.log(d);
      currentDataFiles.map((currentFile) => {
        if (!supportedFilesInJsonExt.includes(currentFile)) {
          try {
            fs.unlinkSync(`./extracted-data/encounters/${d}/${currentFile}`);
          } catch (err) {
            console.error(`[Error][Clean Invalid Data - Single File]: ${err}`);
          }
        }
      });
    } catch (err) {
      console.error(`[Error][Clean Invalid Data - All Files]: ${err}`);
    }
  });
};

cleanInvalidDataFiles();
