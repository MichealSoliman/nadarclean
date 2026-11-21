const fs = require('fs');
const path = require('path');
const targetFile = path.resolve(__dirname, 'build-service-pages.js');
const code = fs.readFileSync(targetFile, 'utf8');

// Require the services data or evaluate it
const { servicesList } = require('./template');

// Let's check each generated HTML page in the filesystem directly!
const serviceSlugs = [
  'house-cleaning',
  'villa-cleaning',
  'apartment-cleaning',
  'office-cleaning',
  'steam-cleaning',
  'sofa-cleaning',
  'carpet-cleaning',
  'majlis-cleaning',
  'kitchen-cleaning',
  'bathroom-cleaning',
  'post-construction-cleaning',
  'deep-cleaning',
  'hospital-cleaning',
  'building-cleaning',
  'ac-cleaning',
  'marble-polishing',
  'glass-facade-cleaning',
  'curtain-cleaning'
];

console.log('--- AUDITING PUBLISHED SERVICE PAGES ---');
serviceSlugs.forEach(slug => {
  const file = path.resolve(__dirname, '..', slug, 'index.html');
  if (!fs.existsSync(file)) {
    console.log(slug + ': FILE MISSING');
    return;
  }
  const html = fs.readFileSync(file, 'utf8');
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainText = (mainMatch ? mainMatch[1] : html)
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = mainText.match(/[\u0621-\u064A0-9]+/g) || [];
  
  // Count internal links inside <main>
  const mainHtml = mainMatch ? mainMatch[1] : '';
  const internalLinks = [...mainHtml.matchAll(/href="(\/[a-z0-9\/-]*)"/gi)].map(m => m[1]);
  const uniqueInternalLinks = [...new Set(internalLinks)];

  // Check unique angle
  const hasUniqueAngle = mainHtml.includes('<!-- Unique Angle Section -->');
  
  console.log(`${slug.padEnd(28)} | Words: ${String(words.length).padStart(4)} | In-main Links: ${uniqueInternalLinks.length} | UniqueAngle: ${hasUniqueAngle}`);
});
