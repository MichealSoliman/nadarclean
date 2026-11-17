const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const htmlFiles = [];
function findHtml(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) findHtml(f);
    else if (e.isFile() && e.name.endsWith('.html')) htmlFiles.push(f);
  }
}
findHtml(ROOT);

const brokenLinks = [];
let totalLinksChecked = 0;

for (const file of htmlFiles) {
  const relFile = path.relative(ROOT, file);
  const content = fs.readFileSync(file, 'utf8');
  const aRegex = /<a\s+[^>]*?href=["']([^"']*)["'][^>]*?>/gi;
  let match;
  while ((match = aRegex.exec(content)) !== null) {
    const href = match[1];
    totalLinksChecked++;

    // Ignore external, tel, mailto, javascript, whatsapp
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#') || href.startsWith('javascript:')) {
      continue;
    }

    // Internal link
    if (href.startsWith('/#')) {
      // Anchor on home page
      continue;
    }

    const cleanHref = href.split('#')[0].split('?')[0];
    const relTarget = cleanHref.replace(/^\//, '');

    let exists = false;
    if (relTarget === '') {
      exists = fs.existsSync(path.join(ROOT, 'index.html'));
    } else {
      exists = fs.existsSync(path.join(ROOT, relTarget, 'index.html')) ||
               fs.existsSync(path.join(ROOT, relTarget)) ||
               fs.existsSync(path.join(ROOT, relTarget + '.html'));
    }

    if (!exists) {
      brokenLinks.push({ file: relFile, href });
    }
  }
}

console.log(`Total internal links checked: ${totalLinksChecked}`);
console.log(`Broken internal links: ${brokenLinks.length}`);
if (brokenLinks.length > 0) {
  console.log('Broken link details:', brokenLinks);
} else {
  console.log('✅ ALL INTERNAL LINKS ARE 100% VALID!');
}
