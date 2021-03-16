import { useImportDataProps } from '#types';

const importDataOnDemand = ({ module, fileName }: useImportDataProps) => {
  console.log('Init (search): ', `../extracted-data/${module}/${fileName}.json`);
  return import(`../extracted-data/${module}/${fileName}.json`)
    .then((importedData) => importedData.default)
    .catch((err) => err);
};

export default importDataOnDemand;
