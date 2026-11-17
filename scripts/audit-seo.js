const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const pages = [
  { url: 'https://nadarclean.com/', file: 'index.html', type: 'core' },
  { url: 'https://nadarclean.com/about/', file: 'about/index.html', type: 'core' },
  { url: 'https://nadarclean.com/contact/', file: 'contact/index.html', type: 'core' },
  { url: 'https://nadarclean.com/pricing/', file: 'pricing/index.html', type: 'core' },
  { url: 'https://nadarclean.com/faq/', file: 'faq/index.html', type: 'core' },
  { url: 'https://nadarclean.com/gallery/', file: 'gallery/index.html', type: 'core' },
  { url: 'https://nadarclean.com/privacy-policy/', file: 'privacy-policy/index.html', type: 'legal' },
  { url: 'https://nadarclean.com/terms-and-conditions/', file: 'terms-and-conditions/index.html', type: 'legal' },
  { url: 'https://nadarclean.com/house-cleaning/', file: 'house-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/villa-cleaning/', file: 'villa-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/apartment-cleaning/', file: 'apartment-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/office-cleaning/', file: 'office-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/steam-cleaning/', file: 'steam-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/sofa-cleaning/', file: 'sofa-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/carpet-cleaning/', file: 'carpet-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/majlis-cleaning/', file: 'majlis-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/kitchen-cleaning/', file: 'kitchen-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/bathroom-cleaning/', file: 'bathroom-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/post-construction-cleaning/', file: 'post-construction-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/deep-cleaning/', file: 'deep-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/hospital-cleaning/', file: 'hospital-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/building-cleaning/', file: 'building-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/blog/', file: 'blog/index.html', type: 'blog-index' },
  { url: 'https://nadarclean.com/blog/home-cleaning-guide-jeddah/', file: 'blog/home-cleaning-guide-jeddah/index.html', type: 'blog-post' },
  { url: 'https://nadarclean.com/blog/how-to-clean-sofas/', file: 'blog/how-to-clean-sofas/index.html', type: 'blog-post' },
  { url: 'https://nadarclean.com/blog/house-cleaning-prices-jeddah/', file: 'blog/house-cleaning-prices-jeddah/index.html', type: 'blog-post' },
  { url: 'https://nadarclean.com/blog/tile-grout-cleaning/', file: 'blog/tile-grout-cleaning/index.html', type: 'blog-post' },
  { url: 'https://nadarclean.com/blog/post-construction-cleaning-jeddah/', file: 'blog/post-construction-cleaning-jeddah/index.html', type: 'blog-post' }
];

let issues = [];
const tableRows = [];

for (const p of pages) {
  const filePath = path.join(ROOT_DIR, p.file);
  if (!fs.existsSync(filePath)) {
    issues.push(`File missing: ${p.file}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // html lang and dir
  if (!content.includes('lang="ar"')) issues.push(`${p.file}: missing lang="ar"`);
  if (!content.includes('dir="rtl"')) issues.push(`${p.file}: missing dir="rtl"`);

  // Title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';
  const titleLen = title.length;
  if (!title) issues.push(`${p.file}: missing title`);

  // Meta description
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  const desc = descMatch ? descMatch[1] : '';
  const descLen = desc.length;
  if (!desc) issues.push(`${p.file}: missing description`);

  // Canonical
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';
  if (!canonical) issues.push(`${p.file}: missing canonical`);
  if (canonical !== p.url) issues.push(`${p.file}: canonical mismatch (got ${canonical}, expected ${p.url})`);

  // H1 count
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length !== 1) issues.push(`${p.file}: H1 count is ${h1Matches.length} (expected exactly 1)`);

  // Heading hierarchy check: look for heading skips (e.g. h1 followed directly by h3 without h2, etc.)
  const headingTags = Array.from(content.matchAll(/<h([1-6])[^>]*>/gi)).map(m => parseInt(m[1], 10));
  let prevLevel = 0;
  for (const lvl of headingTags) {
    if (prevLevel > 0 && lvl > prevLevel + 1) {
      issues.push(`${p.file}: Heading level skip from h${prevLevel} to h${lvl}`);
    }
    prevLevel = lvl;
  }

  // OG tags
  if (!content.includes('property="og:title"')) issues.push(`${p.file}: missing og:title`);
  if (!content.includes('property="og:description"')) issues.push(`${p.file}: missing og:description`);
  if (!content.includes('property="og:url"')) issues.push(`${p.file}: missing og:url`);
  if (!content.includes('property="og:image"')) issues.push(`${p.file}: missing og:image`);
  if (!content.includes('property="og:locale" content="ar_SA"')) issues.push(`${p.file}: missing og:locale ar_SA`);

  // Twitter cards
  if (!content.includes('name="twitter:card"')) issues.push(`${p.file}: missing twitter:card`);
  if (!content.includes('name="twitter:title"')) issues.push(`${p.file}: missing twitter:title`);
  if (!content.includes('name="twitter:description"')) issues.push(`${p.file}: missing twitter:description`);
  if (!content.includes('name="twitter:image"')) issues.push(`${p.file}: missing twitter:image`);

  // Check noindex
  if (content.includes('noindex')) issues.push(`${p.file}: unexpected noindex found`);

  tableRows.push({
    url: p.url,
    title,
    titleLen,
    desc,
    descLen,
    canonical
  });
}

// Check 404 page specifically
const p404 = path.join(ROOT_DIR, '404.html');
if (fs.existsSync(p404)) {
  const content404 = fs.readFileSync(p404, 'utf8');
  if (!content404.includes('content="noindex, follow"')) {
    issues.push('404.html: missing "noindex, follow" robots tag');
  }
  if (content404.includes('<link rel="canonical"')) {
    issues.push('404.html: should not have canonical link');
  }
} else {
  issues.push('404.html: file does not exist');
}

console.log('--- AUDIT RESULTS ---');
console.log(`Total Pages Audited: ${pages.length}`);
console.log(`Issues Found: ${issues.length}`);
if (issues.length > 0) {
  console.log('Issues List:');
  issues.forEach(iss => console.log(' - ' + iss));
} else {
  console.log('✅ ALL SEO AUDIT CHECKS PASSED WITH 0 ISSUES!');
}

console.log('\n--- TITLE & DESCRIPTION LENGTH STATS ---');
tableRows.forEach(r => {
  console.log(`[${r.titleLen}c / ${r.descLen}c] ${r.url}`);
});

fs.writeFileSync(path.join(ROOT_DIR, 'scripts', 'seo-report-data.json'), JSON.stringify(tableRows, null, 2), 'utf8');
