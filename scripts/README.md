# Scripts

Every script is taking a part of auto-generating data content on the website.

`extract-tokens.js` always goes first. 

`clean-invalid-data-files.js` always goes last. 

Order of other scripts when they fire doesn't matter after that step.

| script                       | description                                                                  |
| ---------------------------  | ---------------------------------------------------------------------------- |
| `extract-tokens.js`          | Converts `.yml` token file to `.json` format                                 |
|`build-indexed-search.js`     | Squeezes all extracted data only to what we need in the `search input`       |
|`build-paths.js`              | Squeezes all extracted data only to what we need in the `sidebar navigation` |
|`clean-invalid-data-files.js` | Removes files have updated `file name`                                       |