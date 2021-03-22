# Scripts

Every script is taking a part of auto-generating data content on the website.

There are 3 rules:
1. `extract-*-tokens.js` scripts always goes first.
2. Order of other scripts when they fire don't matter after that step.
3. `clean-invalid-data-files.js` always goes last. 


| script                        | description                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------- |
| `extract-*-tokens.js`         | Converts `.yml` token file to `.json` format                                 |
| `build-indexed-search.js`     | Squeezes all extracted data only to what we need in the `search input`       |
| `build-paths.js`              | Squeezes all extracted data only to what we need in the `sidebar navigation` |
| `clean-invalid-data-files.js` | Removes files have updated `file name`                                       |