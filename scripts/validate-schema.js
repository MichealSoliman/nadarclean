const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const pages = [
  { url: 'https://nadarclean.com/', file: 'index.html', type: 'home' },
  { url: 'https://nadarclean.com/about/', file: 'about/index.html', type: 'about' },
  { url: 'https://nadarclean.com/contact/', file: 'contact/index.html', type: 'contact' },
  { url: 'https://nadarclean.com/pricing/', file: 'pricing/index.html', type: 'pricing' },
  { url: 'https://nadarclean.com/faq/', file: 'faq/index.html', type: 'faq' },
  { url: 'https://nadarclean.com/gallery/', file: 'gallery/index.html', type: 'gallery' },
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
  { url: 'https://nadarclean.com/ac-cleaning/', file: 'ac-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/marble-polishing/', file: 'marble-polishing/index.html', type: 'service' },
  { url: 'https://nadarclean.com/glass-facade-cleaning/', file: 'glass-facade-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/curtain-cleaning/', file: 'curtain-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/drafts/water-tank-cleaning/', file: 'drafts/water-tank-cleaning/index.html', type: 'service' },
  { url: 'https://nadarclean.com/drafts/pest-control/', file: 'drafts/pest-control/index.html', type: 'service' },
  { url: 'https://nadarclean.com/blog/', file: 'blog/index.html', type: 'blog-index' },
  { url: 'https://nadarclean.com/blog/home-cleaning-guide-jeddah/', file: 'blog/home-cleaning-guide-jeddah/index.html', type: 'blog-post' },
  { url: 'https://nadarclean.com/blog/how-to-clean-sofas/', file: 'blog/how-to-clean-sofas/index.html', type: 'blog-post' },
  { url: 'https://nadarclean.com/blog/house-cleaning-prices-jeddah/', file: 'blog/house-cleaning-prices-jeddah/index.html', type: 'blog-post' },
  { url: 'https://nadarclean.com/blog/tile-grout-cleaning/', file: 'blog/tile-grout-cleaning/index.html', type: 'blog-post' },
  { url: 'https://nadarclean.com/blog/post-construction-cleaning-jeddah/', file: 'blog/post-construction-cleaning-jeddah/index.html', type: 'blog-post' }
];

let errors = [];
let warnings = [];
let schemaSummary = [];

for (const p of pages) {
  const filePath = path.join(ROOT_DIR, p.file);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing file: ${p.file}`);
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const jsonLdMatch = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (!jsonLdMatch) {
    errors.push(`${p.file}: Missing application/ld+json script block`);
    continue;
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonLdMatch[1]);
  } catch (err) {
    errors.push(`${p.file}: JSON-LD parse error: ${err.message}`);
    continue;
  }

  if (parsed['@context'] !== 'https://schema.org') {
    errors.push(`${p.file}: Invalid @context (expected https://schema.org)`);
  }

  if (!Array.isArray(parsed['@graph'])) {
    errors.push(`${p.file}: Schema root must contain an @graph array`);
    continue;
  }

  const graph = parsed['@graph'];
  const entityTypes = graph.map(e => {
    return Array.isArray(e['@type']) ? e['@type'].join(' / ') : e['@type'];
  });

  // 1. Verify LocalBusiness is in the graph
  const business = graph.find(e => {
    const t = Array.isArray(e['@type']) ? e['@type'] : [e['@type']];
    return t.includes('LocalBusiness') || t.includes('CleaningService');
  });

  if (!business) {
    errors.push(`${p.file}: Missing LocalBusiness / CleaningService entity in @graph`);
  } else {
    if (business['@id'] !== 'https://nadarclean.com/#business') {
      errors.push(`${p.file}: Business @id mismatch (got ${business['@id']})`);
    }
    if (!business.name || !business.telephone || !business.email) {
      errors.push(`${p.file}: Business entity missing required contact fields`);
    }
    if (!business.address || business.address.addressLocality !== 'جدة' || business.address.addressCountry !== 'SA') {
      errors.push(`${p.file}: Business address mismatch`);
    }
    if (!business.openingHoursSpecification || business.openingHoursSpecification.length === 0) {
      errors.push(`${p.file}: Business missing openingHoursSpecification`);
    }
    if (!business.areaServed || !Array.isArray(business.areaServed) || business.areaServed.length < 5) {
      errors.push(`${p.file}: Business missing areaServed array with Jeddah neighborhoods`);
    }

    // STRICT CHECK: Zero hallucinated rating/review
    if (business.aggregateRating) {
      errors.push(`${p.file}: STRICT VIOLATION: aggregateRating found in LocalBusiness!`);
    }
    if (business.review) {
      errors.push(`${p.file}: STRICT VIOLATION: review found in LocalBusiness!`);
    }
  }

  // 2. Type-specific checks
  if (p.type === 'home') {
    const website = graph.find(e => e['@type'] === 'WebSite');
    if (!website) errors.push(`${p.file}: Missing WebSite entity`);
    if (website && website.publisher && website.publisher['@id'] !== 'https://nadarclean.com/#business') {
      errors.push(`${p.file}: WebSite publisher not linked to #business`);
    }
    const faq = graph.find(e => e['@type'] === 'FAQPage');
    if (!faq) errors.push(`${p.file}: Missing FAQPage entity for homepage`);
    if (faq && faq.mainEntity.length !== 6) {
      errors.push(`${p.file}: Homepage FAQPage has ${faq.mainEntity.length} questions (expected 6)`);
    }
  }

  if (p.type === 'about') {
    const about = graph.find(e => e['@type'] === 'AboutPage');
    if (!about) errors.push(`${p.file}: Missing AboutPage entity`);
    const breadcrumbs = graph.find(e => e['@type'] === 'BreadcrumbList');
    if (!breadcrumbs) errors.push(`${p.file}: Missing BreadcrumbList`);
  }

  if (p.type === 'contact') {
    const contact = graph.find(e => e['@type'] === 'ContactPage');
    if (!contact) errors.push(`${p.file}: Missing ContactPage entity`);
    const breadcrumbs = graph.find(e => e['@type'] === 'BreadcrumbList');
    if (!breadcrumbs) errors.push(`${p.file}: Missing BreadcrumbList`);
  }

  if (p.type === 'pricing') {
    const webpage = graph.find(e => e['@type'] === 'WebPage');
    if (!webpage) errors.push(`${p.file}: Missing WebPage entity`);
    const breadcrumbs = graph.find(e => e['@type'] === 'BreadcrumbList');
    if (!breadcrumbs) errors.push(`${p.file}: Missing BreadcrumbList`);
  }

  if (p.type === 'faq') {
    const faq = graph.find(e => e['@type'] === 'FAQPage');
    if (!faq) errors.push(`${p.file}: Missing FAQPage entity`);
    if (faq && faq.mainEntity.length !== 7) {
      errors.push(`${p.file}: FAQPage has ${faq.mainEntity.length} questions (expected 7)`);
    }
    const breadcrumbs = graph.find(e => e['@type'] === 'BreadcrumbList');
    if (!breadcrumbs) errors.push(`${p.file}: Missing BreadcrumbList`);
  }

  if (p.type === 'gallery') {
    const gallery = graph.find(e => e['@type'] === 'CollectionPage');
    if (!gallery) errors.push(`${p.file}: Missing CollectionPage entity`);
    const breadcrumbs = graph.find(e => e['@type'] === 'BreadcrumbList');
    if (!breadcrumbs) errors.push(`${p.file}: Missing BreadcrumbList`);
  }

  if (p.type === 'legal') {
    const webpage = graph.find(e => e['@type'] === 'WebPage');
    if (!webpage) errors.push(`${p.file}: Missing WebPage entity`);
    const breadcrumbs = graph.find(e => e['@type'] === 'BreadcrumbList');
    if (!breadcrumbs) errors.push(`${p.file}: Missing BreadcrumbList`);
  }

  if (p.type === 'service') {
    const service = graph.find(e => e['@type'] === 'Service');
    if (!service) errors.push(`${p.file}: Missing Service entity`);
    if (service && (!service.provider || service.provider['@id'] !== 'https://nadarclean.com/#business')) {
      errors.push(`${p.file}: Service provider not linked to #business`);
    }
    const breadcrumbs = graph.find(e => e['@type'] === 'BreadcrumbList');
    if (!breadcrumbs) errors.push(`${p.file}: Missing BreadcrumbList`);
    if (breadcrumbs && breadcrumbs.itemListElement.length !== 3) {
      errors.push(`${p.file}: Breadcrumbs must have 3 levels (الرئيسية > الخدمات > الخدمة)`);
    }
    const faq = graph.find(e => e['@type'] === 'FAQPage');
    if (!faq) errors.push(`${p.file}: Missing FAQPage on service page`);
  }

  if (p.type === 'blog-index') {
    const blog = graph.find(e => e['@type'] === 'Blog');
    if (!blog) errors.push(`${p.file}: Missing Blog entity`);
    const breadcrumbs = graph.find(e => e['@type'] === 'BreadcrumbList');
    if (!breadcrumbs) errors.push(`${p.file}: Missing BreadcrumbList`);
  }

  if (p.type === 'blog-post') {
    const article = graph.find(e => e['@type'] === 'BlogPosting');
    if (!article) errors.push(`${p.file}: Missing BlogPosting entity`);
    if (article) {
      if (!article.headline) errors.push(`${p.file}: BlogPosting missing headline`);
      if (!article.image) errors.push(`${p.file}: BlogPosting missing image`);
      if (!article.datePublished) errors.push(`${p.file}: BlogPosting missing datePublished`);
      if (!article.author) errors.push(`${p.file}: BlogPosting missing author`);
      if (!article.publisher || article.publisher['@id'] !== 'https://nadarclean.com/#business') {
        errors.push(`${p.file}: BlogPosting publisher not linked to #business`);
      }
    }
    const breadcrumbs = graph.find(e => e['@type'] === 'BreadcrumbList');
    if (!breadcrumbs) errors.push(`${p.file}: Missing BreadcrumbList`);
    if (breadcrumbs && breadcrumbs.itemListElement.length !== 3) {
      errors.push(`${p.file}: Article Breadcrumbs must have 3 levels (الرئيسية > المدونة > المقال)`);
    }
  }

  schemaSummary.push({
    file: p.file,
    url: p.url,
    types: entityTypes.join(', ')
  });
}

// 404 page check
const content404 = fs.readFileSync(path.join(ROOT_DIR, '404.html'), 'utf8');
if (content404.includes('application/ld+json')) {
  errors.push('404.html: Should not contain JSON-LD structured data');
}

console.log('========================================');
console.log('SCHEMA.ORG STRUCTURED DATA AUDIT REPORT');
console.log('========================================');
console.log(`Audited Pages: ${pages.length}`);
console.log(`Total Errors: ${errors.length}`);
console.log(`Total Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.log('\nErrors found:');
  errors.forEach(e => console.log(' ❌ ' + e));
  process.exit(1);
} else {
  console.log('\n✅ ALL 28 PAGES PASSED SCHEMA VALIDATION WITH ZERO ERRORS!');
}

console.log('\n--- SCHEMA ENTITIES PER PAGE ---');
schemaSummary.forEach(s => {
  console.log(`• ${s.file}: [${s.types}]`);
});
