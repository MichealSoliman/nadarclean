/**
 * Schema.org JSON-LD Generator for NADAR CLEANING (نضار للتنظيف بجدة)
 * https://nadarclean.com
 *
 * Rules:
 * - Single source of truth for all structured data.
 * - Central LocalBusiness with fixed @id: https://nadarclean.com/#business
 * - Zero hallucinated data (no fake reviews, no fake ratings, no fake street address).
 * - Exact match between JSON-LD and page content.
 */

const { SITE_URL, FULL_BRAND, PHONE_INT, EMAIL, servicesList } = require('./template');

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Real neighborhoods in Jeddah explicitly featured on the site
const JEDDAH_NEIGHBORHOODS = [
  'أبحر الشمالية',
  'أبحر الجنوبية',
  'حي الروضة',
  'حي السلامة',
  'حي المحمدية',
  'حي المرجان',
  'حي الشاطئ',
  'حي الحمراء',
  'حي النعيم',
  'حي الزهراء',
  'حي الصفا',
  'حي المروة',
  'حي السامر',
  'حي التيسير',
  'حي البساتين',
  'حي الفيصلية'
];

/**
 * Universal LocalBusiness entity (CleaningService subtype)
 * Appears across all site pages as the primary business entity
 */
function getLocalBusinessEntity() {
  return {
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": BUSINESS_ID,
    "name": "شركة نضار للتنظيف بجدة",
    "alternateName": ["نضار كلين", "NADAR CLEANING"],
    "url": SITE_URL,
    "logo": `${SITE_URL}/assets/images/brand/logo.webp`,
    "image": `${SITE_URL}/assets/images/brand/logo.webp`,
    "telephone": PHONE_INT,
    "email": EMAIL,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "جدة",
      "addressCountry": "SA",
      "streetAddress": "[TODO: عنوان المقر]"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "جدة"
      },
      ...JEDDAH_NEIGHBORHOODS.map(area => ({
        "@type": "AdministrativeArea",
        "name": area
      }))
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات التنظيف المتخصصة بجدة",
      "itemListElement": servicesList.map(s => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.title,
          "url": `${SITE_URL}/${s.slug}/`,
          "description": s.desc
        }
      }))
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "22:00"
      }
    ]
  };
}

/**
 * WebSite entity for Homepage
 */
function getWebSiteEntity() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    "url": `${SITE_URL}/`,
    "name": FULL_BRAND,
    "description": "شركة نضار للتنظيف بجدة: خدمات تنظيف شاملة للمنازل، الفلل، الشقق، الكنب، السجاد، والمكاتب.",
    "publisher": {
      "@id": BUSINESS_ID
    },
    "inLanguage": "ar"
  };
}

/**
 * BreadcrumbList entity
 * @param {Array<{name: string, path: string}>} items
 */
function getBreadcrumbsEntity(items) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      const url = item.path.startsWith('http') ? item.path : `${SITE_URL}${item.path}`;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": url
      };
    })
  };
}

/**
 * FAQPage entity matching visible questions and answers
 * @param {Array<{q: string, a: string}>} faqs
 */
function getFAQEntity(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

/**
 * Service entity for service pages
 */
function getServiceEntity({ slug, title, targetKeyword, description }) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/${slug}/#service`,
    "name": title,
    "serviceType": targetKeyword,
    "provider": {
      "@id": BUSINESS_ID
    },
    "areaServed": {
      "@type": "City",
      "name": "جدة"
    },
    "url": `${SITE_URL}/${slug}/`,
    "description": description
  };
}

/**
 * BlogPosting / Article entity for blog articles
 */
function getArticleEntity({ slug, title, description, image, datePublished, dateModified }) {
  const fullImg = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const articleUrl = `${SITE_URL}/blog/${slug}/`;
  return {
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    "headline": title,
    "description": description,
    "image": fullImg,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "author": {
      "@type": "Organization",
      "name": "فريق خبراء نضار للتنظيف بجدة",
      "url": `${SITE_URL}/about/`
    },
    "publisher": {
      "@id": BUSINESS_ID
    },
    "inLanguage": "ar"
  };
}

/**
 * Build unified Schema Graph
 * Combines LocalBusiness with page-specific entities
 * @param {Array<object>} pageEntities
 */
function buildPageGraph(pageEntities = []) {
  const cleanEntities = pageEntities.filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      getLocalBusinessEntity(),
      ...cleanEntities
    ]
  };
}

module.exports = {
  BUSINESS_ID,
  WEBSITE_ID,
  JEDDAH_NEIGHBORHOODS,
  getLocalBusinessEntity,
  getWebSiteEntity,
  getBreadcrumbsEntity,
  getFAQEntity,
  getServiceEntity,
  getArticleEntity,
  buildPageGraph
};
