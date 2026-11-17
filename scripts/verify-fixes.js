const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

let errors = [];
let passedChecks = [];

// 1. Search for old dummy phone numbers across all project files (except node_modules and .git)
function checkDirectoryForOldNumber(dir) {
  const dummy1 = ['05', '00000000'].join('');
  const dummy2 = ['9665', '00000000'].join('');
  const dummy3 = ['+9665', '00000000'].join('');
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'verify-fixes.js') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkDirectoryForOldNumber(fullPath);
    } else if (entry.isFile()) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(dummy1) || content.includes(dummy2) || content.includes(dummy3)) {
        errors.push(`Old dummy number found in: ${path.relative(ROOT_DIR, fullPath)}`);
      }
    }
  }
}

checkDirectoryForOldNumber(ROOT_DIR);
if (errors.length === 0) {
  passedChecks.push('Zero occurrences of dummy phone numbers across entire repository.');
}

// 2. Check all 29 HTML files
const htmlFiles = [];
function findHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
}
findHtmlFiles(ROOT_DIR);

let telCount = 0;
let waCount = 0;
let footerAddressCount = 0;
let workingHoursMatchCount = 0;

for (const file of htmlFiles) {
  const relPath = path.relative(ROOT_DIR, file);
  const content = fs.readFileSync(file, 'utf8');

  // Verify all tel links
  const telMatches = content.match(/href="tel:[^"]*"/g) || [];
  for (const match of telMatches) {
    telCount++;
    if (match !== 'href="tel:+966533553620"') {
      errors.push(`${relPath}: Invalid tel link -> ${match}`);
    }
  }

  // Verify all wa.me links
  const waMatches = content.match(/href="https:\/\/wa\.me\/[^"]*"/g) || [];
  for (const match of waMatches) {
    waCount++;
    if (!match.startsWith('href="https://wa.me/966533553620')) {
      errors.push(`${relPath}: Invalid WhatsApp link -> ${match}`);
    }
  }

  // Verify footer address TODO
  if (content.includes('[TODO: عنوان المقر أو اكتب منطقة الخدمة فقط]')) {
    footerAddressCount++;
  } else if (!relPath.includes('404')) {
    errors.push(`${relPath}: Missing footer address TODO placeholder`);
  }

  // Verify working hours announcement
  if (content.includes('السبت - الخميس: 8:00 ص - 10:00 م')) {
    workingHoursMatchCount++;
  } else {
    errors.push(`${relPath}: Missing unified working hours header`);
  }
}

passedChecks.push(`Validated ${htmlFiles.length} HTML files.`);
passedChecks.push(`Validated ${telCount} tel:+966533553620 link occurrences.`);
passedChecks.push(`Validated ${waCount} wa.me/966533553620 link occurrences.`);
passedChecks.push(`Validated footer address TODO placeholder in ${footerAddressCount} pages.`);
passedChecks.push(`Validated unified working hours in ${workingHoursMatchCount}/${htmlFiles.length} pages.`);

// 3. Verify 14 service pages have tailored WhatsApp messages
const serviceSlugs = [
  'house-cleaning', 'villa-cleaning', 'apartment-cleaning', 'office-cleaning',
  'steam-cleaning', 'sofa-cleaning', 'carpet-cleaning', 'majlis-cleaning',
  'kitchen-cleaning', 'bathroom-cleaning', 'post-construction-cleaning',
  'deep-cleaning', 'hospital-cleaning', 'building-cleaning'
];

let serviceWaMessageVerified = 0;
for (const slug of serviceSlugs) {
  const filePath = path.join(ROOT_DIR, slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing service page: ${slug}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('https://wa.me/966533553620?text=')) {
    serviceWaMessageVerified++;
  } else {
    errors.push(`Service page ${slug} lacks pre-filled WhatsApp text parameter (?text=)`);
  }
}
passedChecks.push(`Verified tailored encoded WhatsApp messages on ${serviceWaMessageVerified}/14 service pages.`);

// 4. Hero image alt check
const indexContent = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
if (indexContent.includes('alt="شعار شركة نضار للتنظيف بجدة — NADAR CLEANING [TODO: صورة حقيقية]"')) {
  passedChecks.push('Verified homepage hero image has accurate alt tag and [TODO: صورة حقيقية] placeholder.');
} else {
  errors.push('Homepage hero image alt tag does not match expected description.');
}

console.log('=== VERIFICATION SUMMARY ===');
passedChecks.forEach(p => console.log(`✓ ${p}`));
if (errors.length > 0) {
  console.error('\nERRORS FOUND:');
  errors.forEach(e => console.error(`✗ ${e}`));
  process.exit(1);
} else {
  console.log('\n🎉 ALL 100% OF VERIFICATIONS PASSED SUCCESSFULLY!');
}
