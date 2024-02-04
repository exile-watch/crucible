# IDK Design System
IDK Design System provides components and tools to help contributors work more efficiently, and to make IDK modules more cohesive.

### Principles
IDK Design System is based on real-world situations.

While IDK Design System is not yet accessibility friendly as well as not thoroughly tested, this will be changed in the future.

Aim of IDK Design System is to provide high quality experience for both, developers and users, that effortlessly scales across IDK modules.
IDK Design System is intended for all platforms. This may not be the case in the MVP (Minimum Viable Product) phase, but it sets a ground up for the future.

### Structure Breakdown
```
design-system
├─ components                     React components that are shared accross different modules
│  ├─ ComponentA                  React component directory
│  │  ├─ ComponentA.tsx           React component that shares the same name as directory
│  │  ├─ ComponentA.stories.tsx   ComponentA Storybook stories | See: https://storybook.js.org/docs/react/writing-stories/introduction
│  │  ├─ ComponentA.module.scss   ComponentA Styles
│  └─ ComponentB
├─ icons                          Icons that are shared accross different modules
│  ├─ svg                         Raw svgs
│  │  ├─ IconA.svg
│  │  ├─ IconB.svg
│  ├─ IconA.tsx                   Icon component converted from raw svg via `svgr` script
│  └─ IconB.tsx
└─ styles                         Global styles shared accross different modules
   ├─ styles.scss                 "index" scss file imported in `_app.tsx`
   ├─ mixins                      scss mixins | See: https://sass-lang.com/documentation/at-rules/mixin
   │   └─ mixinA.scss
   ├─ colors.scss                 List of all color variables (including light and dark themes)
   ├─ reset.scss                  Common approach to reset styles to avoid browser-specific issues and have a common styling ground
   └─ variables.scss              List of all variables that are not colors (z-index, line-height, font-size, spacing, etc)
```