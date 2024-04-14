type FetchCategoryDataProps = {
  category: string;
  directory: string;
}
async function fetchCategoryData({ directory, category }: FetchCategoryDataProps) {
  try {
    return await import(`@exile-watch/encounter-data/dist/extracted-data/${directory}/${category}.mjs`);
  } catch(e) {
    return null
  }
}

async function fetchCategoryPaths() {
  const directories = ['path-of-exile-1', 'path-of-exile-2']

  const paths = await Promise.all(directories.map(async directory => {
    const dir = await import(`@exile-watch/encounter-data/dist/extracted-data/${directory}/encounters.mjs`);
    return Object.keys(dir.default).map(category => ({
      params: {
        directory,
        category
      }
    }))
  }))

  return paths.flat();
}

export {fetchCategoryData, fetchCategoryPaths}