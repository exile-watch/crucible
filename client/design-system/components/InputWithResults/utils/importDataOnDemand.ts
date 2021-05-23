import { useImportDataProps } from '#types';

const importDataOnDemand = ({ feature, fileName }: useImportDataProps) =>
  import(`../../../../../client/features/${feature}/extracted-data/${fileName}.json`)
    .then((importedData) => importedData.default)
    .catch((err) => err);

export default importDataOnDemand;
