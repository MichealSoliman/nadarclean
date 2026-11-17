const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const services = [
  'house-cleaning', 'villa-cleaning', 'apartment-cleaning', 'office-cleaning',
  'steam-cleaning', 'sofa-cleaning', 'carpet-cleaning', 'majlis-cleaning',
  'kitchen-cleaning', 'bathroom-cleaning', 'post-construction-cleaning',
  'deep-cleaning', 'hospital-cleaning', 'building-cleaning'
];

for (const slug of services) {
  const file = path.join(ROOT, slug, 'index.html');
  const c = fs.readFileSync(file, 'utf8');
  const title = (c.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (c.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/) || [])[1] || '';
  console.log(`SERVICE: ${slug}`);
  console.log(`  Title (${title.length}c): ${title}`);
  console.log(`  Desc (${desc.length}c): ${desc}`);
}
