async function fetchHomeData() {
  try {
    return await import(
      "@exile-watch/encounter-data/dist/extracted-data/path-of-exile-1/homepage.mjs" as string
    );
  } catch (e) {
    return null;
  }
}
export { fetchHomeData };
