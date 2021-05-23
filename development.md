# Development

### Prerequisites
1. `node > 14.x`
2. `yarn > 2.x`

### Usage
```bash
1. git clone https://github.com/sbsrnt/poe-watch
2. cd poe-watch/client
3. yarn && yarn dev
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