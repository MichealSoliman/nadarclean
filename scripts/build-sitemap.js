const fs = require('fs');
const path = require('path');
const { SITE_URL } = require('./template');

const ROOT_DIR = path.resolve(__dirname, '..');

// All 28 real content pages with their relative file path and SEO config
const contentPages = [
  // Homepage
  { path: 'index.html', loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },

  // Core pages
  { path: 'about/index.html', loc: `${SITE_URL}/about/`, priority: '0.8', changefreq: 'monthly' },
  { path: 'contact/index.html', loc: `${SITE_URL}/contact/`, priority: '0.8', changefreq: 'monthly' },
  { path: 'pricing/index.html', loc: `${SITE_URL}/pricing/`, priority: '0.8', changefreq: 'monthly' },
  { path: 'faq/index.html', loc: `${SITE_URL}/faq/`, priority: '0.7', changefreq: 'monthly' },
  { path: 'gallery/index.html', loc: `${SITE_URL}/gallery/`, priority: '0.7', changefreq: 'monthly' },
  { path: 'privacy-policy/index.html', loc: `${SITE_URL}/privacy-policy/`, priority: '0.3', changefreq: 'yearly' },
  { path: 'terms-and-conditions/index.html', loc: `${SITE_URL}/terms-and-conditions/`, priority: '0.3', changefreq: 'yearly' },

  // 18 Published Service pages
  { path: 'house-cleaning/index.html', loc: `${SITE_URL}/house-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'villa-cleaning/index.html', loc: `${SITE_URL}/villa-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'apartment-cleaning/index.html', loc: `${SITE_URL}/apartment-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'office-cleaning/index.html', loc: `${SITE_URL}/office-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'steam-cleaning/index.html', loc: `${SITE_URL}/steam-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'sofa-cleaning/index.html', loc: `${SITE_URL}/sofa-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'carpet-cleaning/index.html', loc: `${SITE_URL}/carpet-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'majlis-cleaning/index.html', loc: `${SITE_URL}/majlis-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'kitchen-cleaning/index.html', loc: `${SITE_URL}/kitchen-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'bathroom-cleaning/index.html', loc: `${SITE_URL}/bathroom-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'post-construction-cleaning/index.html', loc: `${SITE_URL}/post-construction-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'deep-cleaning/index.html', loc: `${SITE_URL}/deep-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'hospital-cleaning/index.html', loc: `${SITE_URL}/hospital-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'building-cleaning/index.html', loc: `${SITE_URL}/building-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'ac-cleaning/index.html', loc: `${SITE_URL}/ac-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'marble-polishing/index.html', loc: `${SITE_URL}/marble-polishing/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'glass-facade-cleaning/index.html', loc: `${SITE_URL}/glass-facade-cleaning/`, priority: '0.9', changefreq: 'weekly' },
  { path: 'curtain-cleaning/index.html', loc: `${SITE_URL}/curtain-cleaning/`, priority: '0.9', changefreq: 'weekly' },

  // Blog pages (Index + 5 Articles)
  { path: 'blog/index.html', loc: `${SITE_URL}/blog/`, priority: '0.8', changefreq: 'weekly' },
  { path: 'blog/home-cleaning-guide-jeddah/index.html', loc: `${SITE_URL}/blog/home-cleaning-guide-jeddah/`, priority: '0.7', changefreq: 'monthly' },
  { path: 'blog/how-to-clean-sofas/index.html', loc: `${SITE_URL}/blog/how-to-clean-sofas/`, priority: '0.7', changefreq: 'monthly' },
  { path: 'blog/house-cleaning-prices-jeddah/index.html', loc: `${SITE_URL}/blog/house-cleaning-prices-jeddah/`, priority: '0.7', changefreq: 'monthly' },
  { path: 'blog/tile-grout-cleaning/index.html', loc: `${SITE_URL}/blog/tile-grout-cleaning/`, priority: '0.7', changefreq: 'monthly' },
  { path: 'blog/post-construction-cleaning-jeddah/index.html', loc: `${SITE_URL}/blog/post-construction-cleaning-jeddah/`, priority: '0.7', changefreq: 'monthly' }
];

function buildSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const urlElements = contentPages.map(page => {
    const fullPath = path.join(ROOT_DIR, page.path);
    let lastmod = today;
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      lastmod = stat.mtime.toISOString().split('T')[0];
    }

    return `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements.join('\n')}
</urlset>
`;

  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Generated: sitemap.xml with ${contentPages.length} URLs and real lastmod dates.`);
}

buildSitemap();
