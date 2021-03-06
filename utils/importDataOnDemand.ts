import {useImportDataProps} from "#types";

const importDataOnDemand = ({fileName}: useImportDataProps) =>
  import(`../extracted-data/${fileName}.json`)
    .then(importedData => importedData.default)
    .catch(err => err)

export default importDataOnDemand