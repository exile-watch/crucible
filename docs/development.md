# Development

---
### Prerequisites
1. `node > 15.x`
2. `yarn > 2.x` (`eslint` with `yarn 2` doesn't work with JetBrains IDE's - see https://youtrack.jetbrains.com/issue/WEB-47366)

### Usage
```bash
git clone https://github.com/sbsrnt/poe-watch
cd poe-watch
yarn && yarn dev
```
You should now have a running server! Visit [localhost:3000](localhost:3000) in your browser. It will automatically restart as you make changes to site content.

### Scripts breakdown
| yarn                     | desc                                  |
| ------------------------ | ------------------------------------- |
| yarn                     | install dependencies                  |
| yarn dev                 | dev server                            |
| yarn build && yarn start | prod server                           |
| yarn svgr                | convert svg icons to react components |
| yarn data:update         | generate / update data from tokens    |
| yarn tsc                 | type check                            |
| yarn lint                | linter                                |