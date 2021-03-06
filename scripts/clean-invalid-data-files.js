const fs = require('fs');
const {kebabCase} = require('lodash')

const cleanInvalidDataFiles = async () => {
  await fs.readdirSync('./tokens').forEach(dir => {
    try {
      const d = kebabCase(dir);
      const supportedFiles = fs.readdirSync(`./tokens/${d}`);
      const currentDataFiles = fs.readdirSync(`./extracted-data/${d}`)
      const supportedFilesInJsonExt = supportedFiles.map(file => `${file.split('.').shift()}.json`) //.yml by default
      console.log(d);
      currentDataFiles.map(currentFile => {
        if(!supportedFilesInJsonExt.includes(currentFile)) {
          try {
            fs.unlinkSync(`./extracted-data/${d}/${currentFile}`)
          } catch(err){
            console.error(`[Error][Clean Invalid Data - Single File]: ${err}`);
          }
        }
      })
    } catch(err) {
      console.error(`[Error][Clean Invalid Data - All Files]: ${err}`);
    }
  })
}

cleanInvalidDataFiles();