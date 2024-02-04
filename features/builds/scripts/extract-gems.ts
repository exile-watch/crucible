import fs from 'fs';
import {startCase, snakeCase} from 'lodash'
import colorifyConsole from '../../../build-tools/utils/colorifyConsole';

import gems from '../tokens/gems.json';
import base_items from '../tokens/base_items.json';

const rootPath = './features/builds';
const extractedDataPath = `${rootPath}/components/SkillTree/3.14`;
const cdnPath = (gem: any) => `https://web.poecdn.com/image/${gem}?w=1&h=1&scale=1`

const extractGemImageFromMetadata = (base_item: any) => {
  // @ts-ignore
  return cdnPath(base_items[base_item.id].visual_identity.dds_file.replace('.dds', '.png'))
}

const filterByAttribute = ({tags, attr, acc, key, active_skill, is_support, gemName, base_item}: any) => {
  if (tags.includes(attr)) {
    if (!active_skill && is_support) {
      const skillNameWithRemovedSuppPrefix = gemName.includes('Support')
        ? startCase(gemName.split('Support').find((v: string) => v.length !== 0))
        : startCase(gemName);
      const supportSkillLite = {
        skill: skillNameWithRemovedSuppPrefix,
        id: snakeCase(skillNameWithRemovedSuppPrefix),
        tags,
        img: extractGemImageFromMetadata(base_item)
      }

      if (tags.includes('aura')) {
        return {
          ...acc,
          [key]: {
            ...acc[key],
            auras: [...acc[key].auras, { ...supportSkillLite, type: ['s', 'a'], }]
          }
        }
      }

      if (tags.includes('curse')) {
        return {
          ...acc,
          [key]: {
            ...acc[key],
            curses: [...acc[key].curses, { ...supportSkillLite, type: ['s', 'c'] }]
          }
        }
      }

      return {
        ...acc,
        [key]: {
          ...acc[key],
          supports: [...acc[key].supports, { ...supportSkillLite, type: 's' }]
        }
      }
    }

    const { display_name, id, types, } = active_skill;
    const activeSkillLite = { skill: display_name, id, types, tags, img: extractGemImageFromMetadata(base_item) }

    if (tags.includes('aura')) {
      return {
        ...acc,
        [key]: {
          ...acc[key],
          auras: [...acc[key].auras, { ...activeSkillLite, type: 'a' }]
        }
      }
    }

    if (tags.includes('curse')) {
      return {
        ...acc,
        [key]: {
          ...acc[key],
          curses: [...acc[key].curses, { ...activeSkillLite, type: 'c' }]
        }
      }
    }

    return {
      ...acc,
      [key]: {
        ...acc[key],
        actives: [...acc[key].actives, activeSkillLite]
      }
    }
  }
}

const getExtractedData = async () => {
  await console.time(colorifyConsole({ label: 'time', text: 'Extract Gems' }));
  // @ts-ignore
  const sortedSkills = Object.entries(gems as any[]).reduce((acc: any, gem: any) => {
    const [gemName, {
      active_skill,
      base_item,
      is_support,
      tags
    }] = gem;
    if (!base_item || base_item.release_state === 'unreleased' || gemName.includes('Plus')) return acc;

    const strSkills = filterByAttribute({attr: 'strength', key: 'str', tags, acc, active_skill, is_support, gemName, base_item})
    const dexSkills = filterByAttribute({attr: 'dexterity', key: 'dex', tags, acc, active_skill, is_support, gemName, base_item})
    const intSkills = filterByAttribute({attr: 'intelligence', key: 'int', tags, acc, active_skill, is_support, gemName, base_item})

    return {
      ...acc,
      ...strSkills,
      ...dexSkills,
      ...intSkills,
    }
  }, {
    str: { supports: [], actives: [], curses: [], auras: [] },
    dex: { supports: [], actives: [], curses: [], auras: [] },
    int: { supports: [], actives: [], curses: [], auras: [] }
  });

  return {
    version: 3.14,
    gems: sortedSkills,
  }
};

getExtractedData()
  .then(async (extractedData) => {
    await fs.writeFileSync(`${extractedDataPath}/gems.json`, JSON.stringify(extractedData));
    await console.timeEnd(colorifyConsole({ label: 'time', text: 'Extract Gems' }));
  })
  .catch(async (err) => {
    await console.log(err);
    await console.timeEnd(colorifyConsole({ label: 'time', text: 'Extract Gems' }));
  });
