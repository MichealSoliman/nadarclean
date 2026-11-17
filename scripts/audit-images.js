const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const pages = [
  'index.html',
  'about/index.html',
  'contact/index.html',
  'pricing/index.html',
  'faq/index.html',
  'gallery/index.html',
  'privacy-policy/index.html',
  'terms-and-conditions/index.html',
  'house-cleaning/index.html',
  'villa-cleaning/index.html',
  'apartment-cleaning/index.html',
  'office-cleaning/index.html',
  'steam-cleaning/index.html',
  'sofa-cleaning/index.html',
  'carpet-cleaning/index.html',
  'majlis-cleaning/index.html',
  'kitchen-cleaning/index.html',
  'bathroom-cleaning/index.html',
  'post-construction-cleaning/index.html',
  'deep-cleaning/index.html',
  'hospital-cleaning/index.html',
  'building-cleaning/index.html',
  'blog/index.html',
  'blog/home-cleaning-guide-jeddah/index.html',
  'blog/how-to-clean-sofas/index.html',
  'blog/house-cleaning-prices-jeddah/index.html',
  'blog/tile-grout-cleaning/index.html',
  'blog/post-construction-cleaning-jeddah/index.html'
];

const imgAudit = [];

for (const p of pages) {
  const file = path.join(ROOT, p);
  const c = fs.readFileSync(file, 'utf8');
  const imgRegex = /<img\s+([^>]*?)>/gi;
  let match;
  while ((match = imgRegex.exec(c)) !== null) {
    const tag = match[1];
    const srcMatch = tag.match(/src=["']([^"']*)["']/);
    const altMatch = tag.match(/alt=["']([^"']*)["']/);
    const widthMatch = tag.match(/width=["']([^"']*)["']/);
    const heightMatch = tag.match(/height=["']([^"']*)["']/);

    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : null;
    const width = widthMatch ? widthMatch[1] : null;
    const height = heightMatch ? heightMatch[1] : null;

    imgAudit.push({
      page: p,
      src,
      alt,
      width,
      height,
      hasAlt: alt !== null,
      hasDimensions: !!(width && height)
    });
  }
}

const missingAlt = imgAudit.filter(i => !i.hasAlt);
const missingDim = imgAudit.filter(i => !i.hasDimensions);

console.log(`Total images checked across 28 pages: ${imgAudit.length}`);
console.log(`Images missing alt: ${missingAlt.length}`);
console.log(`Images missing dimensions (width/height): ${missingDim.length}`);

if (missingAlt.length > 0) console.log('Missing ALT:', missingAlt);
if (missingDim.length > 0) console.log('Missing DIMENSIONS:', missingDim);

// Print unique images and their alt texts
const uniqueMap = new Map();
imgAudit.forEach(i => {
  if (!uniqueMap.has(i.src)) {
    uniqueMap.set(i.src, { alt: i.alt, width: i.width, height: i.height });
  }
});

console.log('\nUnique images in the site:');
for (const [src, data] of uniqueMap.entries()) {
  console.log(`- ${src} (w:${data.width}, h:${data.height}) => alt: "${data.alt}"`);
}
