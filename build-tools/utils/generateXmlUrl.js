const { format } = require('date-fns');

// See https://www.w3.org/TR/NOTE-datetime
const lastmod = format(new Date(), `yyyy-MM-dd'T'HH:mmxxx`);

const generateXmlUrl = ({ loc, priority }) => `
  <url>
    <loc>${loc}</loc>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  `;

module.exports = generateXmlUrl;
