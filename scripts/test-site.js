const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const requiredFiles = [
  'index.html',
  'about/index.html',
  'contact/index.html',
  'pricing/index.html',
  'faq/index.html',
  'gallery/index.html',
  'privacy-policy/index.html',
  'terms-and-conditions/index.html',
  '404.html',
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
  'blog/post-construction-cleaning-jeddah/index.html',
  'robots.txt',
  'sitemap.xml',
  '.htaccess',
  'site.webmanifest',
  'favicon.ico',
  'assets/css/style.css',
  'assets/js/main.js',
  'assets/images/brand/logo.webp',
  'assets/images/brand/logo.webp',
  'assets/images/brand/favicon.svg'
];

let errors = [];
let warnings = [];
let passedChecks = 0;

console.log('--- STARTING COMPREHENSIVE SITE VALIDATION ---');

// 1. Check all required files exist
console.log('\n[1/6] Checking required file existence...');
for (const file of requiredFiles) {
  const full = path.join(ROOT_DIR, file);
  if (!fs.existsSync(full)) {
    errors.push(`Missing required file: ${file}`);
  } else {
    passedChecks++;
  }
}
console.log(`Passed: ${passedChecks}/${requiredFiles.length} files exist.`);

// 2. Inspect HTML files
const htmlFiles = requiredFiles.filter(f => f.endsWith('.html'));
const titles = new Set();
const descriptions = new Set();

console.log(`\n[2/6] Inspecting ${htmlFiles.length} HTML files for SEO & semantics...`);

for (const relPath of htmlFiles) {
  const full = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(full)) continue;

  const content = fs.readFileSync(full, 'utf8');

  // Check doctype and html tags
  if (!content.includes('<!DOCTYPE html>')) errors.push(`${relPath}: Missing <!DOCTYPE html>`);
  if (!content.includes('lang="ar"')) errors.push(`${relPath}: Missing lang="ar"`);
  if (!content.includes('dir="rtl"')) errors.push(`${relPath}: Missing dir="rtl"`);

  // Title check
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch) {
    errors.push(`${relPath}: Missing <title> tag`);
  } else {
    const title = titleMatch[1];
    if (titles.has(title)) {
      warnings.push(`${relPath}: Duplicate title: "${title}"`);
    }
    titles.add(title);
  }

  // Meta description check
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (!descMatch && !relPath.includes('404')) {
    errors.push(`${relPath}: Missing meta description`);
  } else if (descMatch) {
    const desc = descMatch[1];
    if (descriptions.has(desc)) {
      warnings.push(`${relPath}: Duplicate meta description: "${desc.slice(0, 30)}..."`);
    }
    descriptions.add(desc);
  }

  // Canonical check
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (!canonicalMatch && !relPath.includes('404')) {
    errors.push(`${relPath}: Missing canonical link tag`);
  }

  // H1 tag check
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (!h1Matches) {
    errors.push(`${relPath}: Missing <h1> tag`);
  } else if (h1Matches.length > 1) {
    warnings.push(`${relPath}: Multiple <h1> tags found (${h1Matches.length})`);
  }

  // Check structured data
  const jsonLdMatches = content.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
  if (jsonLdMatches) {
    for (const block of jsonLdMatches) {
      const jsonStr = block.replace(/<\/?script[^>]*>/gi, '').trim();
      try {
        const parsed = JSON.parse(jsonStr);
        if (!parsed) errors.push(`${relPath}: JSON-LD parsed to null`);
      } catch (e) {
        errors.push(`${relPath}: Invalid JSON-LD structured data (${e.message})`);
      }
    }
  }

  // Check images inside HTML
  const imgRegex = /<img\s+[^>]*src="([^"]+)"[^>]*>/gi;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(content)) !== null) {
    const fullImgTag = imgMatch[0];
    const src = imgMatch[1];

    if (!fullImgTag.includes('alt=')) {
      errors.push(`${relPath}: Image tag missing alt attribute (${src})`);
    }

    if (src.startsWith('/')) {
      const diskPath = path.join(ROOT_DIR, src);
      if (!fs.existsSync(diskPath)) {
        errors.push(`${relPath}: Referenced local image does not exist: ${src}`);
      }
    }
  }

  // Check internal links
  const hrefRegex = /<a\s+[^>]*href="([^"]+)"[^>]*>/gi;
  let hrefMatch;
  while ((hrefMatch = hrefRegex.exec(content)) !== null) {
    const href = hrefMatch[1];

    // Check no .html or index.html in internal hrefs
    if (href.startsWith('/') && !href.startsWith('/assets/')) {
      if (href.includes('.html') && href !== '/404.html') {
        errors.push(`${relPath}: Internal link contains .html: ${href}`);
      }
      if (href.includes('index.html')) {
        errors.push(`${relPath}: Internal link contains index.html: ${href}`);
      }

      // Check target path exists
      if (href.startsWith('/#')) {
        // anchor on homepage, valid
      } else {
        const cleanHref = href.split('#')[0].replace(/^\//, '');
        let targetExists = false;
        if (cleanHref === '') {
          targetExists = fs.existsSync(path.join(ROOT_DIR, 'index.html'));
        } else {
          targetExists = fs.existsSync(path.join(ROOT_DIR, cleanHref, 'index.html')) ||
            fs.existsSync(path.join(ROOT_DIR, cleanHref)) ||
            fs.existsSync(path.join(ROOT_DIR, cleanHref.replace(/\/$/, '') + '.html'));
        }
        if (!targetExists) {
          errors.push(`${relPath}: Broken internal link -> "${href}"`);
        }
      }
    }
  }
}

// 3. Sitemap validation
console.log('\n[3/6] Validating sitemap.xml...');
const sitemapContent = fs.readFileSync(path.join(ROOT_DIR, 'sitemap.xml'), 'utf8');
const locMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g);
if (!locMatches || locMatches.length === 0) {
  errors.push('sitemap.xml has no <loc> entries');
} else {
  console.log(`sitemap.xml contains ${locMatches.length} URLs.`);
  for (const locTag of locMatches) {
    const url = locTag.replace(/<\/?loc>/g, '');
    const urlPath = new URL(url).pathname.replace(/^\//, '');
    let fileExists = false;
    if (urlPath === '') {
      fileExists = fs.existsSync(path.join(ROOT_DIR, 'index.html'));
    } else {
      fileExists = fs.existsSync(path.join(ROOT_DIR, urlPath, 'index.html'));
    }
    if (!fileExists) {
      errors.push(`Sitemap lists non-existent page URL: ${url}`);
    }
  }
}

// 4. Robots.txt validation
console.log('\n[4/6] Validating robots.txt...');
const robotsContent = fs.readFileSync(path.join(ROOT_DIR, 'robots.txt'), 'utf8');
if (!robotsContent.includes('Sitemap:')) {
  warnings.push('robots.txt does not explicitly declare Sitemap:');
}
if (robotsContent.includes('Disallow: /assets/')) {
  errors.push('robots.txt incorrectly disallows /assets/ directory');
}

// 5. CSS validation
console.log('\n[5/6] Validating style.css bundle...');
const cssPath = path.join(ROOT_DIR, 'assets/css/style.css');
const cssStat = fs.statSync(cssPath);
if (cssStat.size < 1000) {
  errors.push(`style.css is unexpectedly tiny (${cssStat.size} bytes)`);
} else {
  console.log(`style.css verified (${(cssStat.size / 1024).toFixed(2)} KB).`);
}

// 6. Report results
console.log('\n========================================');
console.log(`TEST SUMMARY:`);
console.log(`Total Errors: ${errors.length}`);
console.log(`Total Warnings: ${warnings.length}`);
console.log('========================================');

if (errors.length > 0) {
  console.error('\nERRORS ENCOUNTERED:');
  errors.forEach(err => console.error(` ❌ ${err}`));
  process.exit(1);
} else {
  console.log('\n✅ ALL CRITICAL TESTS PASSED WITH 0 ERRORS!');
  if (warnings.length > 0) {
    console.log('\nADVISORY WARNINGS:');
    warnings.forEach(w => console.log(` ⚠️ ${w}`));
  }
}
