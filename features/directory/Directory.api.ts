const directoryPaths = [
  { params: { directory: "path-of-exile-1" } },
  { params: { directory: "path-of-exile-2" } }
]

async function checkIfDirExists(directory: string) {
  try {
    await import(`@exile-watch/encounter-data/dist/extracted-data/${directory}/paths.mjs` as string);
    return true
  } catch(e) {
    return false
  }
}

export {directoryPaths, checkIfDirExists}