import { useImportDataProps } from '#types';

const importDataOnDemand = ({ module, fileName }: useImportDataProps) =>
  import(`../extracted-data/${module}/${fileName}.json`)
    .then((importedData) => importedData.default)
    .catch((err) => err);

export default importDataOnDemand;
