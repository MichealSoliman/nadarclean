const fs = require('fs');
const path = require('path');
const SITE_CONFIG = require('./site-config');

const SITE_URL = SITE_CONFIG.siteUrl;
const BRAND_NAME = SITE_CONFIG.brandName;
const FULL_BRAND = SITE_CONFIG.fullBrand;
const PHONE_DISPLAY = SITE_CONFIG.phoneDisplay;
const PHONE_INT = SITE_CONFIG.phoneInt;
const WHATSAPP_URL = SITE_CONFIG.whatsappBaseUrl;
const EMAIL = SITE_CONFIG.email;
const LOCATION = SITE_CONFIG.location;
const ADDRESS_NOTE = SITE_CONFIG.addressNote;
const WORKING_HOURS_DISPLAY = SITE_CONFIG.workingHoursDisplay;
const HERO_IMAGE_PATH = SITE_CONFIG.heroImagePath;
const HERO_IMAGE_ALT = SITE_CONFIG.heroImageAlt;

// Common Service Categories for Logical Grouping
const serviceCategories = [
  {
    id: 'residential',
    title: 'تنظيف سكني',
    desc: 'منازل، فلل، شقق وتنظيف عميق',
    slugs: ['house-cleaning', 'villa-cleaning', 'apartment-cleaning', 'deep-cleaning']
  },
  {
    id: 'commercial',
    title: 'تجاري وعمائر',
    desc: 'مكاتب، عماير، مستشفيات وواجهات',
    slugs: ['office-cleaning', 'building-cleaning', 'hospital-cleaning', 'glass-facade-cleaning']
  },
  {
    id: 'furniture',
    title: 'مفروشات ومجالس',
    desc: 'كنب، سجاد، مجالس وستائر',
    slugs: ['sofa-cleaning', 'carpet-cleaning', 'majlis-cleaning', 'curtain-cleaning']
  },
  {
    id: 'specialized',
    title: 'تنظيف تخصصي',
    desc: 'مكيفات، جلي رخام، بخار وتشطيب',
    slugs: ['ac-cleaning', 'marble-polishing', 'steam-cleaning', 'post-construction-cleaning', 'kitchen-cleaning', 'bathroom-cleaning']
  }
];

// Common Service Items for Menus, Grids, and Internal Links
const servicesList = [
  {
    slug: 'house-cleaning',
    name: 'تنظيف منازل',
    title: 'شركة تنظيف منازل بجدة',
    category: 'residential',
    icon: 'home',
    desc: 'عناية شاملة بغرف المعيشة والنوم ومسح النوافذ والأرضيات لحماية مسكنك من غبار الساحل ورطوبة جدة.'
  },
  {
    slug: 'villa-cleaning',
    name: 'تنظيف فلل',
    title: 'تنظيف فلل بجدة',
    category: 'residential',
    icon: 'villa',
    desc: 'خطة تشغيلية متكاملة للفلل والقصور تشمل السلالم الرخامية، الواجهات الزجاجية الكبيرة، الملاحق والأحواش.'
  },
  {
    slug: 'apartment-cleaning',
    name: 'تنظيف شقق',
    title: 'شركة تنظيف شقق بجدة',
    category: 'residential',
    icon: 'apartment',
    desc: 'حلول سريعة ودقيقة للشقق المفروشة والجديدة لتجهيز المسكن قبل الانتقال أو بعد انتهاء عقود الإيجار.'
  },
  {
    slug: 'deep-cleaning',
    name: 'تنظيف عميق',
    title: 'تنظيف عميق بجدة',
    category: 'residential',
    icon: 'deep',
    desc: 'تنظيف تفصيلي مكثف يصل للمناطق الصعبة خلف الأجهزة الثقيلة، فرك الوزرات، وتعقيم مجاري التكييف.'
  },
  {
    slug: 'office-cleaning',
    name: 'تنظيف مكاتب',
    title: 'تنظيف مكاتب وشركات بجدة',
    category: 'commercial',
    icon: 'office',
    desc: 'جدولة مرنة خارج ساعات الدوام لتنظيف مقرات الشركات وقاعات الاجتماعات وتعقيم محطات العمل والشاشات.'
  },
  {
    slug: 'building-cleaning',
    name: 'تنظيف عماير',
    title: 'شركة تنظيف عماير بجدة',
    category: 'commercial',
    icon: 'building',
    desc: 'صيانة ونظافة دورية للعماير السكنية تشمل جلي سلالم الرخام، تنظيف المداخل، المصاعد، ومواقف السيارات.'
  },
  {
    slug: 'hospital-cleaning',
    name: 'تنظيف مستشفيات',
    title: 'شركة تنظيف مستشفيات بجدة',
    category: 'commercial',
    icon: 'hospital',
    desc: 'بروتوكولات تطهير طبية معتمدة للمراكز الصحية والعيادات بمواد تعقيم واسعة المدى وطواقم مدربة وقائياً.'
  },
  {
    slug: 'glass-facade-cleaning',
    name: 'واجهات زجاجية',
    title: 'تنظيف واجهات زجاجية بجدة',
    category: 'commercial',
    icon: 'glass',
    desc: 'غسيل واجهات الزجاج والكلادينج للمباني والشركات والفلل بأحدث معدات السلامة ومضخات الماء المنقى.'
  },
  {
    slug: 'sofa-cleaning',
    name: 'تنظيف كنب',
    title: 'تنظيف كنب ومفروشات بجدة',
    category: 'furniture',
    icon: 'sofa',
    desc: 'غسيل احترافي بالحقن والاستخلاص يفكك بقع القهوة والزيوت ويجدد رونق أقمشة المخمل والكتان والجلد.'
  },
  {
    slug: 'carpet-cleaning',
    name: 'تنظيف سجاد',
    title: 'تنظيف سجاد وموكيت بجدة',
    category: 'furniture',
    icon: 'carpet',
    desc: 'شفط عميق للأتربة وغسيل متوازن للسجاد والموكيت في موقعه بمحاليل تحافظ على أليافه وتضمن سرعة الجفاف.'
  },
  {
    slug: 'majlis-cleaning',
    name: 'تنظيف مجالس',
    title: 'شركة تنظيف مجالس بجدة',
    category: 'furniture',
    icon: 'majlis',
    desc: 'عناية خاصة بالمجالس العربية الأرضية والمساند مع إزالة البقع والروائح وتعطير بالبخور والزيوت الفاخرة.'
  },
  {
    slug: 'curtain-cleaning',
    name: 'غسيل ستائر',
    title: 'غسيل ستائر بجدة',
    category: 'furniture',
    icon: 'curtain',
    desc: 'تنظيف وتعقيم أقمشة الستائر بالبخار الجاف في مكانها دون فك، أو الفك والكي والتركيب الاحترافي.'
  },
  {
    slug: 'ac-cleaning',
    name: 'تنظيف مكيفات',
    title: 'تنظيف مكيفات بجدة',
    category: 'specialized',
    icon: 'ac',
    desc: 'غسيل احترافي بالجراب المائي وضغط المياه لوحدات الاسبليت والمخفية والشباك لإزالة الطين والروائح.'
  },
  {
    slug: 'marble-polishing',
    name: 'جلي رخام',
    title: 'جلي رخام بجدة',
    category: 'specialized',
    icon: 'marble',
    desc: 'جلي وتسوية فواصل الرخام والجرانيت بأقراص الألماس والتلميع بالكريستال الإيطالي لبريق دائم.'
  },
  {
    slug: 'steam-cleaning',
    name: 'تنظيف بالبخار',
    title: 'شركة تنظيف بالبخار بجدة',
    category: 'specialized',
    icon: 'steam',
    desc: 'تعقيم حراري جاف تحت ضغط عالٍ يقضي على الجراثيم وعث الغبار في المفروشات والستائر دون بلل زائد.'
  },
  {
    slug: 'post-construction-cleaning',
    name: 'تنظيف بعد التشطيب',
    title: 'شركة تنظيف بعد التشطيب بجدة',
    category: 'specialized',
    icon: 'construction',
    desc: 'إزالة متقنة لبقايا الدهانات والجبس والإسمنت عن البورسلين والرخام والنوافذ لتسليم عقارك جاهزاً للسكن.'
  },
  {
    slug: 'kitchen-cleaning',
    name: 'تنظيف مطابخ',
    title: 'تنظيف مطابخ بجدة',
    category: 'specialized',
    icon: 'kitchen',
    desc: 'إذابة الدهون المستعصية عن مداخن الشفط وأسطح الأفران وجدران السيراميك بمواد آمنة غذائياً وغير خادشة.'
  },
  {
    slug: 'bathroom-cleaning',
    name: 'تنظيف حمامات',
    title: 'تنظيف حمامات بجدة',
    category: 'specialized',
    icon: 'bathroom',
    desc: 'تفتيت التكلسات الجيرية وتلميع زجاج كبائن الشاور والخلاطات مع تعقيم طبي شامل للمرافق الصحية.'
  }
];

// 5 Blog Articles Definitions
const blogList = [
  {
    slug: 'home-cleaning-guide-jeddah',
    title: 'دليل تنظيف المنزل بجدة — أفضل الطرق لحماية بيتك من الرطوبة',
    desc: 'دليل شامل لتنظيم تنظيف المنزل بجدة: التعامل مع الرطوبة والغبار، جدول تنظيف أسبوعي واختيار المنظفات الصحيحة. اقرأ الدليل الكامل ونظف بيتك باحتراف.',
    category: 'نصائح منزلية',
    date: '2026-10-15',
    readTime: '6 دقائق قراءة',
    image: '/assets/images/blog/home-cleaning-guide.jpg'
  },
  {
    slug: 'how-to-clean-sofas',
    title: 'طريقة تنظيف الكنب وإزالة البقع والروائح دون إتلاف الأقمشة',
    desc: 'دليل عملي لطريقة تنظيف الكنب بجدة وإزالة بقع القهوة والزيوت دون إتلاف القماش. تعرف على رموز العناية بالأقمشة وطرق التعقيم. اقرأ التفاصيل الآن.',
    category: 'المفروشات والكنب',
    date: '2026-10-18',
    readTime: '5 دقائق قراءة',
    image: '/assets/images/blog/sofa-cleaning.jpg'
  },
  {
    slug: 'house-cleaning-prices-jeddah',
    title: 'كم سعر تنظيف المنزل بجدة؟ العوامل المحددة لتكلفة الخدمة',
    desc: 'دليل موضوعي يوضح عوامل تسعير تنظيف المنازل والفلل بجدة، الفارق بين التنظيف الدوري والعميق، وكيفية الحصول على عرض عادل. اكتشف الأسعار واحجز الآن.',
    category: 'دليل الأسعار',
    date: '2026-10-20',
    readTime: '7 دقائق قراءة',
    image: '/assets/images/blog/house-cleaning-prices.jpg'
  },
  {
    slug: 'tile-grout-cleaning',
    title: 'طريقة تنظيف السيراميك والفواصل وإزالة الدهون والتكلسات',
    desc: 'خطوات تنظيف فواصل السيراميك والبورسلين وإزالة التكلسات الجيرية والدهون الصعبة بأمان، مع إرشادات حماية الرخام. اقرأ المقال الكامل وجرّب الخطوات الآن.',
    category: 'الأرضيات والأسطح',
    date: '2026-10-22',
    readTime: '5 دقائق قراءة',
    image: '/assets/images/blog/tile-grout-cleaning.jpg'
  },
  {
    slug: 'post-construction-cleaning-jeddah',
    title: 'تنظيف المنزل بعد التشطيب بجدة — خطوات إزالة غبار البناء',
    desc: 'خطوات تنظيف الفلل والشقق بعد التشطيب بجدة: إزالة غبار الجبس، التخلص من بقايا الدهان والإسمنت وتجهيز العقار للسكن. اقرأ النصائح واطلب خدمتك الآن.',
    category: 'ما بعد التشطيب',
    date: '2026-10-25',
    readTime: '6 دقائق قراءة',
    image: '/assets/images/blog/post-construction-cleaning.jpg'
  }
];

function getServiceIconSvg(iconName) {
  switch (iconName) {
    case 'home':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`;
    case 'villa':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`;
    case 'apartment':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>`;
    case 'office':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`;
    case 'steam':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
    case 'sofa':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`;
    case 'carpet':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>`;
    case 'majlis':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`;
    case 'ac':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`;
    case 'marble':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    case 'glass':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>`;
    case 'curtain':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16M6 4v16M18 4v16M6 12c2 0 4 2 4 4M18 12c-2 0-4 2-4 4"/></svg>`;
    case 'tank':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`;
    case 'pest':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
    case 'kitchen':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>`;
    case 'bathroom':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`;
    case 'construction':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`;
    case 'deep':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`;
    case 'hospital':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M12 7v6m-3-3h6m-5 10v-4a1 1 0 011-1h2a1 1 0 011 1v4m-4 0h4"/></svg>`;
    case 'building':
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h1m4 0h1m-5 4v-4a1 1 0 011-1h2a1 1 0 011 1v4m-4 0h4"/></svg>`;
    default:
      return `<svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
  }
}

/**
 * Generate Header Component
 */
function renderHeader(currentPath) {
  const serviceMegaMenuCols = serviceCategories.map(cat => `
    <div class="bg-ivory-100/50 rounded-xl p-3 border border-charcoal/5 flex flex-col justify-between">
      <div>
        <div class="border-b border-teal-700/10 pb-2 mb-2">
          <h4 class="font-extrabold text-xs text-emerald-800 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
            <span>${cat.title}</span>
          </h4>
          <p class="text-[10px] text-muted-500 mt-0.5 leading-tight">${cat.desc}</p>
        </div>
        <div class="space-y-1">
          ${cat.slugs.map(slug => {
            const s = servicesList.find(item => item.slug === slug);
            if (!s) return '';
            const isActive = currentPath === `/${s.slug}/`;
            return `
              <a href="/${s.slug}/" class="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium text-charcoal hover:bg-white hover:text-teal-700 hover:shadow-xs transition ${isActive ? 'bg-white text-teal-700 font-bold shadow-xs' : ''}">
                <span class="truncate">${s.name}</span>
                <span class="text-teal-700/40 text-[10px]">&larr;</span>
              </a>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `).join('');

  return `
  <!-- Top announcement bar -->
  <div class="bg-emerald-800 text-white text-xs py-2 px-4 border-b border-teal-700/30">
    <div class="container-custom flex flex-wrap justify-between items-center gap-2">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 font-medium">
          <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          خدمات تنظيف احترافية في جميع أحياء جدة
        </span>
        <span class="hidden md:inline text-white/40">|</span>
        <span class="hidden md:inline text-white/80">السبت - الخميس: 8:00 ص - 10:00 م</span>
      </div>
      <div class="flex items-center gap-4 text-xs">
        <a href="tel:${PHONE_INT}" class="flex items-center gap-1.5 hover:text-mint transition" dir="ltr">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          <span>${PHONE_DISPLAY}</span>
        </a>
        <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-teal-400 hover:text-white transition">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          <span>واتساب مباشر</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Main Site Header -->
  <header id="site-header" class="sticky top-0 z-40 bg-white transition-all duration-300 border-b border-charcoal/5">
    <div class="container-custom">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo -->
        <a href="/" class="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-700 rounded-lg p-1" aria-label="نضار للتنظيف - الصفحة الرئيسية">
          <img src="/assets/images/brand/logo.webp" alt="شعار شركة نضار للتنظيف بجدة" width="180" height="42" class="h-10 sm:h-11 w-auto transition-transform group-hover:scale-[1.02]">
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-6" aria-label="القائمة الرئيسية">
          <a href="/" class="text-sm font-medium text-charcoal hover:text-teal-700 transition py-2 ${currentPath === '/' ? 'text-teal-700 font-bold' : ''}">الرئيسية</a>
          <a href="/about/" class="text-sm font-medium text-charcoal hover:text-teal-700 transition py-2 ${currentPath === '/about/' ? 'text-teal-700 font-bold' : ''}">من نحن</a>
          
          <!-- Services Dropdown (Mega Menu) -->
          <div class="relative group">
            <button id="services-dropdown-toggle" type="button" aria-expanded="false" aria-haspopup="true" class="flex items-center gap-1.5 text-sm font-medium text-charcoal hover:text-teal-700 transition py-2 focus:outline-none">
              <span>خدماتنا</span>
              <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>

            <!-- Dropdown panel (Mega Menu) -->
            <div id="services-dropdown-menu" class="services-mega-menu opacity-0 invisible -translate-y-2 transition-all duration-200" style="width: 820px; min-width: 760px; max-width: calc(100vw - 32px);">
              <div class="flex justify-between items-center pb-3 mb-3 border-b border-charcoal/5">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
                  <div class="font-extrabold text-emerald-800 text-sm">خدمات نضار المتكاملة بجدة</div>
                  <span class="bg-mint text-teal-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-teal-700/10">18 خدمة متخصصة</span>
                </div>
                <a href="/pricing/" class="text-xs font-bold text-teal-700 hover:text-emerald-800 hover:underline flex items-center gap-1 transition">
                  <span>معايير الأسعار</span>
                  <span aria-hidden="true">&larr;</span>
                </a>
              </div>
              <div class="grid grid-cols-4 gap-3" style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem;">
                ${serviceMegaMenuCols}
              </div>
              <div class="mt-3.5 pt-2.5 border-t border-charcoal/5 flex items-center justify-between text-xs bg-ivory-100/60 -mx-5 -mb-4 px-5 py-2.5 rounded-b-2xl">
                <div class="text-muted-500 text-[11px]">
                  <strong class="text-emerald-800">محتار في الخدمة المناسبة؟</strong> تواصل معنا وسنحدد لك الخطة الأنسب فوراً
                </div>
                <div class="flex items-center gap-3 text-[11px] font-bold">
                  <a href="tel:${PHONE_INT}" class="text-emerald-800 hover:text-teal-700 transition" dir="ltr">${PHONE_DISPLAY}</a>
                  <span class="text-charcoal/20">|</span>
                  <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="text-teal-700 hover:text-emerald-800 hover:underline flex items-center gap-1">
                    <span>محادثة واتساب سريعة</span>
                    <span aria-hidden="true">&larr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a href="/pricing/" class="text-sm font-medium text-charcoal hover:text-teal-700 transition py-2 ${currentPath === '/pricing/' ? 'text-teal-700 font-bold' : ''}">الأسعار</a>
          <a href="/gallery/" class="text-sm font-medium text-charcoal hover:text-teal-700 transition py-2 ${currentPath === '/gallery/' ? 'text-teal-700 font-bold' : ''}">معرض الصور</a>
          <a href="/faq/" class="text-sm font-medium text-charcoal hover:text-teal-700 transition py-2 ${currentPath === '/faq/' ? 'text-teal-700 font-bold' : ''}">الأسئلة الشائعة</a>
          <a href="/blog/" class="text-sm font-medium text-charcoal hover:text-teal-700 transition py-2 ${currentPath.startsWith('/blog/') ? 'text-teal-700 font-bold' : ''}">المدونة</a>
          <a href="/contact/" class="text-sm font-medium text-charcoal hover:text-teal-700 transition py-2 ${currentPath === '/contact/' ? 'text-teal-700 font-bold' : ''}">اتصل بنا</a>
        </nav>

        <!-- CTA Buttons -->
        <div class="hidden sm:flex items-center gap-3">
          <a href="/contact/" class="btn-primary text-sm py-2.5 px-5">
            <span>طلب معاينة وتسعير</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>

        <!-- Mobile menu toggle button -->
        <button id="mobile-menu-btn" type="button" aria-label="فتح القائمة الرئيسية" aria-expanded="false" class="lg:hidden p-2 rounded-xl text-charcoal hover:bg-mint focus:outline-none focus:ring-2 focus:ring-teal-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>

      </div>
    </div>
  </header>

  <!-- Mobile Drawer Menu Overlay -->
  <div id="mobile-menu-overlay" class="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"></div>

  <!-- Mobile Drawer Menu Panel -->
  <div id="mobile-menu" class="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white z-50 translate-x-full transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-float">
    <div class="p-4 border-b border-charcoal/5 flex items-center justify-between">
      <img src="/assets/images/brand/logo.webp" alt="نضار للتنظيف" width="140" height="32" class="h-8 w-auto">
      <button id="mobile-menu-close" type="button" aria-label="إغلاق القائمة" class="p-2 text-charcoal hover:bg-mint rounded-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-1">
      <a href="/" class="block px-3 py-2.5 rounded-xl font-medium text-charcoal hover:bg-mint ${currentPath === '/' ? 'bg-mint text-teal-700 font-bold' : ''}">الرئيسية</a>
      <a href="/about/" class="block px-3 py-2.5 rounded-xl font-medium text-charcoal hover:bg-mint ${currentPath === '/about/' ? 'bg-mint text-teal-700 font-bold' : ''}">من نحن</a>
      
      <!-- Mobile Services Accordion (Categorized) -->
      <div>
        <button type="button" data-target="mobile-services-list" aria-expanded="false" class="mobile-submenu-toggle w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-charcoal hover:bg-mint text-right">
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-teal-600"></span>
            <span>خدماتنا (18 خدمة متخصصة)</span>
          </span>
          <svg class="chevron-icon w-4 h-4 transition-transform text-muted-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="mobile-services-list" class="hidden pr-3 pl-1 py-2 space-y-2 border-r-2 border-teal-700/20 mr-3 mt-1">
          ${serviceCategories.map(cat => `
            <div class="bg-ivory-100/60 rounded-xl p-2.5 border border-charcoal/5 space-y-1">
              <div class="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5 pb-1 border-b border-charcoal/5">
                <span class="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                <span>${cat.title}</span>
              </div>
              <div class="space-y-0.5 pt-1">
                ${cat.slugs.map(slug => {
                  const s = servicesList.find(item => item.slug === slug);
                  if (!s) return '';
                  const isActive = currentPath === `/${s.slug}/`;
                  return `
                    <a href="/${s.slug}/" class="flex items-center justify-between py-1.5 px-2 rounded-lg text-xs text-charcoal hover:bg-white hover:text-teal-700 transition ${isActive ? 'text-teal-700 font-bold bg-white shadow-xs' : ''}">
                      <span>${s.name}</span>
                      <span class="text-teal-700/40 text-[10px]">&larr;</span>
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <a href="/pricing/" class="block px-3 py-2.5 rounded-xl font-medium text-charcoal hover:bg-mint ${currentPath === '/pricing/' ? 'bg-mint text-teal-700 font-bold' : ''}">الأسعار</a>
      <a href="/gallery/" class="block px-3 py-2.5 rounded-xl font-medium text-charcoal hover:bg-mint ${currentPath === '/gallery/' ? 'bg-mint text-teal-700 font-bold' : ''}">معرض الصور</a>
      <a href="/faq/" class="block px-3 py-2.5 rounded-xl font-medium text-charcoal hover:bg-mint ${currentPath === '/faq/' ? 'bg-mint text-teal-700 font-bold' : ''}">الأسئلة الشائعة</a>
      <a href="/blog/" class="block px-3 py-2.5 rounded-xl font-medium text-charcoal hover:bg-mint ${currentPath.startsWith('/blog/') ? 'bg-mint text-teal-700 font-bold' : ''}">المدونة</a>
      <a href="/contact/" class="block px-3 py-2.5 rounded-xl font-medium text-charcoal hover:bg-mint ${currentPath === '/contact/' ? 'bg-mint text-teal-700 font-bold' : ''}">اتصل بنا</a>
    </div>

    <div class="p-4 border-t border-charcoal/5 space-y-2">
      <a href="tel:${PHONE_INT}" class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-ivory-200 text-emerald-800 font-medium text-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>اتصال: ${PHONE_DISPLAY}</span>
      </a>
      <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="btn-teal w-full text-sm py-2.5">
        <span>محادثة واتساب سريعة</span>
      </a>
    </div>
  </div>
  `;
}

/**
 * Generate Footer Component
 */
function renderFooter(customWhatsAppUrl) {
  const footerWhatsAppUrl = customWhatsAppUrl || WHATSAPP_URL;
  return `
  <!-- Conversion Callout Section -->
  <section class="bg-gradient-to-br from-emerald-800 to-teal-800 text-white py-16 px-4">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <span class="badge-tag bg-white/10 text-mint border-white/20">حجز موعد وتنظيف احترافي بجدة</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white">هل تبحث عن نظافة تدوم واهتمام حقيقي بأدق التفاصيل؟</h2>
        <p class="text-mint text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          فريق نضار مجهز بأحدث المعدات ومواد التنظيف الآمنة لخدمة منزلك، فيلتك أو مكتبك في أي مكان داخل مدينة جدة.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a href="/contact/" class="btn-white text-emerald-800 font-bold px-8 py-4 text-base">
            <span>احجز موعدك الآن</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
          <a href="${footerWhatsAppUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-medium bg-emerald-900/60 hover:bg-emerald-900 text-white border border-teal-500/30 transition">
            <svg class="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            <span>استفسار واتساب: ${PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Main Footer -->
  <footer class="bg-charcoal text-ivory-100 pt-16 pb-8 border-t border-emerald-900/40">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
        
        <!-- Column 1: Brand & Identity -->
        <div class="lg:col-span-2 space-y-4">
          <img src="/assets/images/brand/logo.webp" alt="شعار شركة نضار للتنظيف" width="180" height="42" class="h-10 w-auto">
          <p class="text-sm text-ivory-200/80 leading-relaxed max-w-sm">
            شركة «نضار للتنظيف بجدة — NADAR CLEANING». النقاء الذي يمكن رؤيته والشعور به. نقدم خدمات التنظيف المتخصصة للمنازل والفلل والمفروشات والمكاتب، معتمدين على الدقة والأمانة والاهتمام الفائق بأدق التفاصيل.
          </p>
          <div class="pt-2">
            <div class="text-xs font-semibold text-mint uppercase tracking-wider mb-2">تغطية الخدمة المباشرة:</div>
            <p class="text-xs text-ivory-200/60 leading-normal">
              جميع أحياء جدة: أبحر الشمالية، الروضة، السلامة، المحمدية، المرجان، الشاطئ، الحمراء، السامر، الصفا، النعيم، الفيصلية، التيسير وكافة المناطق المحيطة.
            </p>
          </div>
        </div>

        <!-- Column 2: Quick Links -->
        <div class="space-y-3">
          <h3 class="text-base font-bold text-white border-r-2 border-teal-500 pr-2">روابط أساسية</h3>
          <ul class="space-y-2 text-sm text-ivory-200/80">
            <li><a href="/" class="hover:text-teal-400 transition">الرئيسية</a></li>
            <li><a href="/about/" class="hover:text-teal-400 transition">من نحن وفلسفتنا</a></li>
            <li><a href="/pricing/" class="hover:text-teal-400 transition">معايير الأسعار</a></li>
            <li><a href="/gallery/" class="hover:text-teal-400 transition">معرض الصور</a></li>
            <li><a href="/faq/" class="hover:text-teal-400 transition">الأسئلة الشائعة</a></li>
            <li><a href="/blog/" class="hover:text-teal-400 transition">المدونة والمقالات</a></li>
            <li><a href="/contact/" class="hover:text-teal-400 transition">اتصل بنا والحجز</a></li>
          </ul>
        </div>

        <!-- Column 3: Services (Part 1) -->
        <div class="space-y-3">
          <h3 class="text-base font-bold text-white border-r-2 border-teal-500 pr-2">خدمات المساحات والمباني</h3>
          <ul class="space-y-2 text-sm text-ivory-200/80">
            <li><a href="/house-cleaning/" class="hover:text-teal-400 transition">تنظيف منازل بجدة</a></li>
            <li><a href="/villa-cleaning/" class="hover:text-teal-400 transition">تنظيف فلل بجدة</a></li>
            <li><a href="/apartment-cleaning/" class="hover:text-teal-400 transition">تنظيف شقق بجدة</a></li>
            <li><a href="/building-cleaning/" class="hover:text-teal-400 transition">تنظيف عماير بجدة</a></li>
            <li><a href="/office-cleaning/" class="hover:text-teal-400 transition">تنظيف مكاتب بجدة</a></li>
            <li><a href="/hospital-cleaning/" class="hover:text-teal-400 transition">تنظيف مستشفيات بجدة</a></li>
            <li><a href="/glass-facade-cleaning/" class="hover:text-teal-400 transition">تنظيف واجهات زجاجية</a></li>
            <li><a href="/marble-polishing/" class="hover:text-teal-400 transition">جلي وتلميع رخام بجدة</a></li>
            <li><a href="/post-construction-cleaning/" class="hover:text-teal-400 transition">تنظيف بعد التشطيب</a></li>
          </ul>
        </div>

        <!-- Column 4: Services (Part 2) -->
        <div class="space-y-3">
          <h3 class="text-base font-bold text-white border-r-2 border-teal-500 pr-2">المفروشات والتكييف</h3>
          <ul class="space-y-2 text-sm text-ivory-200/80">
            <li><a href="/ac-cleaning/" class="hover:text-teal-400 transition">تنظيف مكيفات بجدة</a></li>
            <li><a href="/curtain-cleaning/" class="hover:text-teal-400 transition">غسيل ستائر بجدة</a></li>
            <li><a href="/steam-cleaning/" class="hover:text-teal-400 transition">تنظيف بالبخار</a></li>
            <li><a href="/deep-cleaning/" class="hover:text-teal-400 transition">تنظيف عميق تفصيلي</a></li>
            <li><a href="/sofa-cleaning/" class="hover:text-teal-400 transition">تنظيف كنب بجدة</a></li>
            <li><a href="/carpet-cleaning/" class="hover:text-teal-400 transition">تنظيف سجاد وموكيت</a></li>
            <li><a href="/majlis-cleaning/" class="hover:text-teal-400 transition">تنظيف مجالس بجدة</a></li>
            <li><a href="/kitchen-cleaning/" class="hover:text-teal-400 transition">تنظيف مطابخ بجدة</a></li>
            <li><a href="/bathroom-cleaning/" class="hover:text-teal-400 transition">تنظيف حمامات بجدة</a></li>
          </ul>
        </div>

      </div>

      <!-- Contact Bar -->
      <div class="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 text-sm text-ivory-200/80">
        <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>الموقع: ${LOCATION}</span>
          </div>
          <span class="hidden sm:inline text-white/20">|</span>
          <div class="text-xs text-ivory-200/70">
            <span>العنوان: ${ADDRESS_NOTE}</span>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <a href="tel:${PHONE_INT}" class="flex items-center gap-2 hover:text-teal-400 transition" dir="ltr">
            <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span>${PHONE_DISPLAY}</span>
          </a>
          <a href="mailto:${EMAIL}" class="flex items-center gap-2 hover:text-teal-400 transition">
            <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span>${EMAIL}</span>
          </a>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-ivory-200/50">
        <div>
          جميع الحقوق محفوظة &copy; ${new Date().getFullYear()} لشركة نضار للتنظيف بجدة — NADAR CLEANING.
        </div>
        <div class="flex items-center gap-4">
          <a href="/privacy-policy/" class="hover:text-ivory-100 transition">سياسة الخصوصية</a>
          <span>•</span>
          <a href="/terms-and-conditions/" class="hover:text-ivory-100 transition">الشروط والأحكام</a>
          <span>•</span>
          <a href="/sitemap.xml" class="hover:text-ivory-100 transition">خريطة الموقع (Sitemap)</a>
        </div>
      </div>

    </div>
  </footer>

  <!-- Floating Quick Contact & Back to Top -->
  <div class="fixed bottom-6 left-6 z-40 flex flex-col gap-3 items-center">
    <!-- Back to top -->
    <button id="back-to-top" type="button" aria-label="الرجوع لأعلى الصفحة" class="w-11 h-11 rounded-full bg-white text-emerald-800 shadow-float border border-charcoal/10 flex items-center justify-center opacity-0 invisible translate-y-4 transition-all duration-300 hover:bg-ivory-100 focus:outline-none">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
    </button>

    <!-- Phone Call Floating Action -->
    <a href="tel:${PHONE_INT}" aria-label="اتصل الآن بشركة نضار للتنظيف" class="w-14 h-14 p-3.5 rounded-full bg-emerald-800 hover:bg-teal-700 text-white shadow-float hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative group">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
      <span class="absolute right-full ml-2 mr-3 px-3 py-1.5 bg-charcoal text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-card">اتصل بنا: ${PHONE_DISPLAY}</span>
    </a>
    
    <!-- WhatsApp Floating Action -->
    <a href="${footerWhatsAppUrl}" target="_blank" rel="noopener noreferrer" aria-label="محادثة واتساب مباشرة مع نضار للتنظيف" class="w-14 h-14 p-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-float hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative group">
      <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
      <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
      <span class="absolute right-full ml-2 mr-3 px-3 py-1.5 bg-charcoal text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-card">تواصل واتساب مع نضار</span>
    </a>
  </div>

  <!-- Mobile Sticky Bottom Action Bar -->
  <div class="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-charcoal/10 p-2 sm:hidden flex items-center gap-2 shadow-2xl">
    <a href="tel:${PHONE_INT}" class="flex-1 py-3 px-4 rounded-xl bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
      <span>اتصل الآن</span>
    </a>
    <a href="${footerWhatsAppUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
      <span>محادثة واتساب</span>
    </a>
  </div>
  `;
}

/**
 * Base Page Layout Wrapper
 */
function wrapPage({ title, description, canonicalPath, schemaJson, content, heroPreload, customWhatsAppUrl, ogImage, is404 = false, noIndex = false }) {
  const fullCanonical = `${SITE_URL}${canonicalPath}`;
  const metaHeroImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`) : `${SITE_URL}${HERO_IMAGE_PATH}`;
  const ogType = canonicalPath.startsWith('/blog/') && canonicalPath !== '/blog/' ? 'article' : 'website';
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  ${noIndex ? '<meta name="robots" content="noindex, nofollow">\n  <link rel="canonical" href="' + fullCanonical + '">' : is404 ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${fullCanonical}">`}

  <!-- Open Graph / Social Media -->
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${fullCanonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${metaHeroImage}">
  <meta property="og:locale" content="ar_SA">
  <meta property="og:site_name" content="${FULL_BRAND}">

  <!-- Twitter Meta -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${metaHeroImage}">

  <!-- Icons & Webmanifest -->
  <link rel="icon" type="image/svg+xml" href="/assets/images/brand/favicon.svg">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#123F3A">

  <!-- Fonts Preconnect & Optimization -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">

  ${heroPreload ? `<link rel="preload" as="image" href="${heroPreload}">` : ''}

  <!-- Stylesheet -->
  <link rel="stylesheet" href="/assets/css/style.css">

  <!-- Structured Data JSON-LD -->
  ${schemaJson ? `<script type="application/ld+json">${JSON.stringify(schemaJson, null, 2)}</script>` : ''}
</head>
<body class="bg-ivory-100 text-charcoal font-sans antialiased min-h-screen flex flex-col">
  ${renderHeader(canonicalPath)}

  <main id="main-content" class="flex-grow">
    ${content}
  </main>

  ${renderFooter(customWhatsAppUrl)}

  <!-- Main JavaScript Bundle -->
  <script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

module.exports = {
  SITE_CONFIG,
  SITE_URL,
  BRAND_NAME,
  FULL_BRAND,
  PHONE_DISPLAY,
  PHONE_INT,
  WHATSAPP_URL,
  EMAIL,
  LOCATION,
  ADDRESS_NOTE,
  WORKING_HOURS_DISPLAY,
  HERO_IMAGE_PATH,
  HERO_IMAGE_ALT,
  servicesList,
  blogList,
  renderHeader,
  renderFooter,
  wrapPage,
  getServiceIconSvg
};
