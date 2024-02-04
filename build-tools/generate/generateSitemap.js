const fs = require('fs');

const colorifyConsole = require('../utils/colorifyConsole');
const getDirectories = require('../utils/getDirectories');
const generateXmlUrl = require('../utils/generateXmlUrl');
const SITEMAP_PRIORITY = require('../../constants/sitemapPriority');
const {
  encounterCategoriesSitemapUrls,
  encountersMapsBossesAndAbilitiesSitemapUrls,
} = require('../../features/encounters/scripts/prepare-encounters-sitemap.js');

const domain = 'https://TBD';
const rootPath = './features';

const featuresSitemapUrls = async () => {
  let xml = [];
  await getDirectories(rootPath).forEach((dir) => {
    const featureLoc = `${domain}/${dir}`;

    xml.push(
      generateXmlUrl({
        loc: featureLoc,
        priority: SITEMAP_PRIORITY.FEATURE,
      })
    );
  });

  return xml;
};

const generateSitemap = async () => {
  await console.time(colorifyConsole({ label: 'time', text: 'Generate Sitemap' }));
  let sitemapXml = [];

  const xmlVersion = [`<?xml version="1.0" encoding="UTF-8"?>`];
  const xmlUrlset = [`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`];
  const domainUrl = generateXmlUrl({ loc: domain, priority: SITEMAP_PRIORITY.DOMAIN });
  const footer = [`</urlset>`];

  await sitemapXml.push(xmlVersion);
  await sitemapXml.push(xmlUrlset);
  await sitemapXml.push(domainUrl);
  await sitemapXml.push(await featuresSitemapUrls());
  await sitemapXml.push(await encounterCategoriesSitemapUrls());
  await sitemapXml.push(await encountersMapsBossesAndAbilitiesSitemapUrls());
  await sitemapXml.push(footer);

  fs.writeFileSync('public/sitemap.xml', sitemapXml.join('\n').split(',').join(''));

  await console.timeEnd(colorifyConsole({ label: 'time', text: 'Generate Sitemap' }));
};

generateSitemap();
