async function fetchEncountersData(directory: string) {
  try {
    return await import(
      `@exile-watch/encounter-data/dist/extracted-data/${directory}/encounters.mjs`
    );
  } catch (e) {
    return null;
  }
}

export { fetchEncountersData };
