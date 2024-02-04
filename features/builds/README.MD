# Builds

This feature focuses on Path of Exile's builds.

## Passive Skill Tree

### Updating Passive Tree SVGs for latest league

1. Create new dir with latest league version if it doesn't exist in `#features/builds/components/SkillTree/{league.version}`
2. Put latest league `json` into `#features/builds/components/SkillTree/{league.version}/data.json`. Be sure that the file is named as `data.json`.
3. Update in `package.json` `svgr:trees` script with latest `{league.version}` (would be nice to have some flag in the future like `svgr:trees --3.14`)
3. In root dir run `yarn generate:builds:trees`
4. Commit newly created `#features/builds/components/SkillTree/{league.version}` dir.

### Scripts

| script                                       | purpose                                                                           |
| -------------------------------------------- | --------------------------------------------------------------------------------- |
| `yarn generate:builds:skill-tree-svg`        | Generates Passive Skill tree `svg` without ascendancies and cluster jewel sockets |
| `yarn generate:builds:ascendencies-tree-svg` | Generates Passive Skill tree `svg` for every Ascendancy                           |
| `yarn svgr:trees`                            | Converts `{league.version}` `svg` into `tsx` components                           |
| `yarn generate:builds:trees`                 | Runs all above scripts at once                                                    |

The order of how scripts should be run are defined by table - from top to bottom.
Due to how node scripts and saving variables in memory work it is required to have 2 separate generating functions so stuff don't hang up or override.

### Models
Rendering Passive Trees wouldn't as easy as it is now thanks to tremendous work of [EmmittJ's](https://github.com/EmmittJ/) [SkillTree models](https://github.com/EmmittJ/SkillTree_TypeScript) and continuous GGG support.