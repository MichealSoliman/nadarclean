const fs = require('fs');
const path = require('path');
const { wrapPage, servicesList, blogList, SITE_URL, FULL_BRAND, PHONE_DISPLAY, PHONE_INT, WHATSAPP_URL, EMAIL, LOCATION, getServiceIconSvg } = require('./template');

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeHtml(relPath, html) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, html, 'utf8');
  console.log(`Generated: ${relPath}`);
}

/**
 * 1. Homepage (/)
 */
function buildHomePage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": FULL_BRAND,
    "alternateName": "نضار للتنظيف",
    "url": SITE_URL,
    "logo": `${SITE_URL}/assets/images/brand/logo.webp`,
    "image": `${SITE_URL}/assets/images/hero/logo.webp`,
    "description": "شركة نضار للتنظيف بجدة تقدم خدمات متكاملة لتنظيف المنازل والفلل والمفروشات والمكاتب، بأعلى معايير النظافة والاحترافية والاهتمام بالتفاصيل.",
    "telephone": PHONE_INT,
    "email": EMAIL,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jeddah",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.5433",
      "longitude": "39.1728"
    },
    "areaServed": {
      "@type": "City",
      "name": "Jeddah"
    },
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday"],
        "opens": "13:00",
        "closes": "21:00"
      }
    ]
  };

  const content = `
  <!-- Hero Section -->
  <section class="relative bg-gradient-to-b from-mint/50 to-ivory-100 pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden">
    <div class="container-custom relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left / Content in RTL -->
        <div class="lg:col-span-7 space-y-6 text-right">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint text-emerald-800 text-xs font-bold border border-teal-700/20">
            <span class="w-2 h-2 rounded-full bg-teal-700"></span>
            نقاء تراه وتشعر به في كل زاوية
          </div>
          
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-800 leading-[1.25] tracking-tight">
            شركة تنظيف بجدة — خدمات راقية للمنازل والفلل والمفروشات
          </h1>
          
          <p class="text-base sm:text-lg text-muted-500 leading-relaxed max-w-2xl">
            في «نضار للتنظيف»، نعيد صياغة مفهوم النظافة المنزلية والتجارية. نقدم حلولاً منهجية متكاملة لتنظيف الفلل، الشقق، الكنب، السجاد، والمكاتب في كافة أحياء جدة، بمواد آمنة وفرق عمل مدرّبة تعتني بممتلكاتك كأنها ملكها.
          </p>

          <!-- Action buttons -->
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <a href="/contact/" class="btn-primary text-base px-7 py-4 shadow-lg shadow-emerald-800/10">
              <span>طلب عرض سعر ومعاينة</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
            <a href="#services-overview" class="btn-secondary text-base px-6 py-4">
              <span>استكشف الخدمات (${servicesList.length} خدمة)</span>
            </a>
          </div>

          <!-- Trust Badges -->
          <div class="pt-6 border-t border-charcoal/10 grid grid-cols-3 gap-4 text-xs text-charcoal">
            <div class="flex items-center gap-2">
              <div class="p-1.5 rounded-lg bg-mint text-teal-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span class="font-bold">مواد آمنة ومصرحة</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="p-1.5 rounded-lg bg-mint text-teal-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <span class="font-bold">دقة في المواعيد</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="p-1.5 rounded-lg bg-mint text-teal-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <span class="font-bold">ضمان رضا العميل</span>
            </div>
          </div>
        </div>

        <!-- Right / Visual Image -->
        <div class="lg:col-span-5 relative">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <div class="relative rounded-3xl overflow-hidden shadow-float border-4 border-white aspect-[4/3] sm:aspect-[5/4]">
              <img src="/assets/images/hero/logo.webp" alt="صالة معيشة فاخرة ونظيفة ذات إضاءة طبيعية وأثاث مرتب بجدة" width="800" height="640" class="w-full h-full object-cover">
            </div>

            <!-- Floating Badge Card -->
            <div class="absolute -bottom-6 -right-6 sm:bottom-4 sm:-right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-card border border-charcoal/5 max-w-xs text-right">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-lg">
                  ✓
                </div>
                <div>
                  <div class="font-extrabold text-sm text-emerald-800">نقاء نضار المعتمد</div>
                  <div class="text-xs text-muted-500">معايير دقيقة لفحص كل زاوية قبل التسليم</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Services Grid Section -->
  <section id="services-overview" class="py-20 bg-white border-y border-charcoal/5">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span class="badge-tag">خدماتنا المتخصصة بجدة</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-emerald-800">
          حلول تنظيف متكاملة تغطي كافة متطلباتك
        </h2>
        <p class="text-muted-500 text-base md:text-lg">
          اختر الخدمة المناسبة لعقارك أو مفروشاتك، مع ضمان استخدام الأجهزة المتطورة والمواد التي تحافظ على سلامة الأسطح والأقمشة.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${servicesList.map(s => `
          <div class="card-premium p-6 flex flex-col justify-between group">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors duration-300">
                  ${getServiceIconSvg(s.icon)}
                </div>
                <span class="text-xs font-semibold text-muted-500 bg-ivory-100 px-2.5 py-1 rounded-md">جدة</span>
              </div>
              
              <h3 class="text-xl font-bold text-emerald-800 group-hover:text-teal-700 transition">
                <a href="/${s.slug}/">${s.title}</a>
              </h3>

              <p class="text-sm text-muted-500 leading-relaxed">
                ${s.desc}. تشمل تنظيف الزوايا الدقيقة، التطهير بأحدث الأجهزة وتجهيز العقار بأعلى معايير الإتقان.
              </p>
            </div>

            <div class="pt-6 mt-6 border-t border-charcoal/5 flex items-center justify-between">
              <a href="/${s.slug}/" class="text-sm font-bold text-teal-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>تفاصيل الخدمة والتسعير</span>
                <span aria-hidden="true">&larr;</span>
              </a>
              <a href="/contact/" class="text-xs text-muted-500 hover:text-emerald-800 transition">حجز سريع</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- How It Works Step-by-Step -->
  <section class="py-20 bg-ivory-100">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span class="badge-tag">منهجية العمل المعتمدة</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-emerald-800">
          كيف نعمل مع عملائنا خطوة بخطوة؟
        </h2>
        <p class="text-muted-500 text-base">
          وضوح تام من لحظة الاتصال الأولى وحتى تسليم الموقع نظيفاً وجاهزاً للاستخدام.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <!-- Step 1 -->
        <div class="bg-white p-6 rounded-2xl border border-charcoal/5 shadow-soft relative text-right space-y-3">
          <div class="text-3xl font-extrabold text-teal-700/30">01</div>
          <h3 class="text-lg font-bold text-emerald-800">التواصل وتحديد الاحتياج</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            تتواصل معنا عبر الهاتف أو الواتساب، ونستمع لتفاصيل العقار (المساحة، الغرف، نوع الخدمة المطلوبة) بدقة.
          </p>
        </div>

        <!-- Step 2 -->
        <div class="bg-white p-6 rounded-2xl border border-charcoal/5 shadow-soft relative text-right space-y-3">
          <div class="text-3xl font-extrabold text-teal-700/30">02</div>
          <h3 class="text-lg font-bold text-emerald-800">تأكيد الموعد وخطة العمل</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            نحدد معك الموعد المناسب لجدولك، ونجهز الطاقم والمعدات المتخصصة المناسبة لطبيعة موقعك بجدة.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="bg-white p-6 rounded-2xl border border-charcoal/5 shadow-soft relative text-right space-y-3">
          <div class="text-3xl font-extrabold text-teal-700/30">03</div>
          <h3 class="text-lg font-bold text-emerald-800">التنفيذ الميداني الاحترافي</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            يصل الفريق في الوقت المحدد، ويبدأ التنفيذ وفق خطة منظمة تبدأ من الأعلى للأسفل، مع حماية تامة للأثاث.
          </p>
        </div>

        <!-- Step 4 -->
        <div class="bg-white p-6 rounded-2xl border border-charcoal/5 shadow-soft relative text-right space-y-3">
          <div class="text-3xl font-extrabold text-teal-700/30">04</div>
          <h3 class="text-lg font-bold text-emerald-800">المعاينة النهائية والتسليم</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            نقوم بجولة تفقدية معك للتأكد من مطابقة النتيجة لكافة تطلعاتك ومعايير الجودة المعتمدة لدى نضار.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- Editorial Quality Standards Section -->
  <section class="py-20 bg-white">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div class="lg:col-span-6 relative">
          <div class="rounded-3xl overflow-hidden shadow-card border-4 border-ivory-100">
            <img src="/assets/images/hero/about.webp" alt="أدوات ومعدات تنظيف احترافية متكاملة لدى شركة نضار" width="700" height="500" loading="lazy" class="w-full h-full object-cover">
          </div>
        </div>

        <div class="lg:col-span-6 space-y-6 text-right">
          <span class="badge-tag">معايير نضار الصارمة</span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-emerald-800 leading-tight">
            ما الذي يميز خدمات النظافة الحقيقية عن التجارب العشوائية؟
          </h2>
          <p class="text-muted-500 text-base leading-relaxed">
            التنظيف الاحترافي ليس مجرد ماء وصابون؛ بل هو معرفة متخصصة بنوعية المواد الكيميائية المناسبة لكل سطح (الرخام، البورسلين، الأقمشة الحساسة، الزجاج)، واستخدام تقنيات تحافظ على سلامة منزلك دون أضرار جانبية أو روائح نفاذة.
          </p>

          <div class="space-y-4 pt-2">
            <div class="flex items-start gap-3">
              <div class="p-2 rounded-lg bg-mint text-teal-700 flex-shrink-0 mt-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <h4 class="font-bold text-charcoal text-base">احترام خصوصية المنازل والممتلكات</h4>
                <p class="text-sm text-muted-500 leading-relaxed">طواقم عمل منضبطة تلتزم بأعلى معايير الأمانة واللباقة أثناء العمل داخل المنازل والفلل.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="p-2 rounded-lg bg-mint text-teal-700 flex-shrink-0 mt-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
              </div>
              <div>
                <h4 class="font-bold text-charcoal text-base">منظفات معتمدة وغير مؤذية للصحة</h4>
                <p class="text-sm text-muted-500 leading-relaxed">نستخدم منظفات مخصصة خالية من الغازات الخانقة ومناسبة للعائلات والأطفال والحيوانات الأليفة.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="p-2 rounded-lg bg-mint text-teal-700 flex-shrink-0 mt-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <h4 class="font-bold text-charcoal text-base">تسعير واضح ومحدد سلفاً</h4>
                <p class="text-sm text-muted-500 leading-relaxed">لا مفاجآت في التكلفة؛ يتم توضيح نطاق العمل والعوامل المحددة للسعر بشفافية قبل البدء.</p>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <a href="/about/" class="btn-outline">
              <span>تعرف أكثر على هوية وفلسفة نضار</span>
              <span aria-hidden="true">&larr;</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Service Coverage in Jeddah -->
  <section class="py-20 bg-ivory-100 border-t border-charcoal/5">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <span class="badge-tag">نطاق التغطية الجغرافية</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-emerald-800">
          نخدم كافة أحياء مدينة جدة وضواحيها
        </h2>
        <p class="text-muted-500 text-base">
          تصل سيارات وفرق نضار المجهزة إلى موقعك في مختلف مناطق جدة وفق المواعيد المتفق عليها.
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        ${[
      { area: 'أبحر الشمالية والجنوبية', note: 'فلل وشاليهات ومنازل' },
      { area: 'حي الروضة والسلامة', note: 'شقق ومكاتب ومجمعات' },
      { area: 'حي المحمدية والمرجان', note: 'فلل وقصور ومساكن راقية' },
      { area: 'حي الشاطئ والحمراء', note: 'شقق سكنية ومقرات شركات' },
      { area: 'حي النعيم والزهراء', note: 'تنظيف منازل ومفروشات' },
      { area: 'حي الصفا والمروة', note: 'شقق سكنية وعمائر جديدة' },
      { area: 'حي السامر والتيسير', note: 'تنظيف بعد التشطيب وسكني' },
      { area: 'حي البساتين والفيصلية', note: 'خدمات شاملة ومكاتب' },
    ].map(item => `
          <div class="bg-white p-5 rounded-xl border border-charcoal/5 shadow-soft hover:border-teal-700/30 transition text-right">
            <div class="flex items-center gap-2 mb-1.5 text-teal-700">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <h3 class="font-bold text-sm text-emerald-800">${item.area}</h3>
            </div>
            <p class="text-xs text-muted-500 pr-6">${item.note}</p>
          </div>
        `).join('')}
      </div>

      <div class="mt-8 text-center text-xs text-muted-500">
        هل حيّك غير مدرج بالقائمة؟ لا تقلق، فريق نضار يغطي كافة الأحياء السكنية والتجارية بمدينة جدة.
      </div>
    </div>
  </section>

  <!-- Homepage Brief FAQ -->
  <section class="py-20 bg-white">
    <div class="container-custom max-w-4xl">
      <div class="text-center space-y-4 mb-14">
        <span class="badge-tag">إجابات سريعة</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-emerald-800">
          أسئلة متكررة يطرحها عملاؤنا بجدة
        </h2>
        <p class="text-muted-500 text-base">
          إليك أبرز الاستفسارات المتعلقة بالحجز وآلية العمل والأسعار.
        </p>
      </div>

      <div class="space-y-4 accordion-group">
        
        <div class="card-premium overflow-hidden border border-charcoal/5">
          <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base md:text-lg text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
            <span>كيف يمكنني حجز موعد تنظيف لدى شركة نضار؟</span>
            <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="accordion-content">
            <div class="p-5 pt-0 text-sm md:text-base text-muted-500 leading-relaxed border-t border-charcoal/5">
              يمكنك الحجز بسهولة عبر الاتصال المباشر برقم الهاتف، أو إرسال رسالة واتساب توضح نوع العقار وحجمه والموعد المفضل. يقوم فريق خدمة العملاء بتأكيد التفاصيل وتزويدك بعرض السعر المناسب فوراً.
            </div>
          </div>
        </div>

        <div class="card-premium overflow-hidden border border-charcoal/5">
          <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base md:text-lg text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
            <span>هل تتوفر مواد ومعدات التنظيف من قبلكم أم يجب علي تجهيزها؟</span>
            <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="accordion-content">
            <div class="p-5 pt-0 text-sm md:text-base text-muted-500 leading-relaxed border-t border-charcoal/5">
              نحن نحضر معنا كافة المعدات الاحترافية (مكانس شفط صناعية، أجهزة بخار، ماكينات جلي وتلميع الأرضيات) والمنظفات المتخصصة المصرحة. لا يُطلب من العميل سوى توفير مصدر للماء والكهرباء في الموقع.
            </div>
          </div>
        </div>

        <div class="card-premium overflow-hidden border border-charcoal/5">
          <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base md:text-lg text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
            <span>ما هي العوامل التي تحدد تكلفة خدمة التنظيف؟</span>
            <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="accordion-content">
            <div class="p-5 pt-0 text-sm md:text-base text-muted-500 leading-relaxed border-t border-charcoal/5">
              تعتمد التكلفة على مساحة العقار الإجمالية، وعدد الغرف ودورات المياه، ونوع التنظيف (تنظيف دوري معتاد، تنظيف عميق، أو تنظيف بعد التشطيب)، ووجود خدمات إضافية مثل غسيل الكنب والمفروشات. يمكنك قراءة التفاصيل الكاملة في <a href="/pricing/" class="text-teal-700 underline font-semibold">صفحة معايير الأسعار</a>.
            </div>
          </div>
        </div>

        <div class="card-premium overflow-hidden border border-charcoal/5">
          <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base md:text-lg text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
            <span>كم تستغرق عملية التنظيف عادة؟</span>
            <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="accordion-content">
            <div class="p-5 pt-0 text-sm md:text-base text-muted-500 leading-relaxed border-t border-charcoal/5">
              تتراوح المدة للشقق المتوسطة بين 3 إلى 5 ساعات، بينما تتطلب الفلل الكبيرة أو أعمال ما بعد التشطيب يوماً كاملاً أو أكثر بحسب حجم الفريق وحجم العمل. نحرص دائماً على الالتزام بالوقت المتفق عليه مسبقاً.
            </div>
          </div>
        </div>

      </div>

      <div class="text-center pt-8">
        <a href="/faq/" class="text-sm font-bold text-teal-700 hover:text-emerald-800 transition">
          عرض جميع الأسئلة الشائعة وإرشادات الحجز &larr;
        </a>
      </div>
    </div>
  </section>

  <!-- Latest Blog Posts Section -->
  <section class="py-20 bg-ivory-100 border-t border-charcoal/5">
    <div class="container-custom">
      <div class="flex flex-wrap items-end justify-between gap-4 mb-14">
        <div class="space-y-3 text-right">
          <span class="badge-tag">مدونة نضار التثقيفية</span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-emerald-800">
            أحدث المقالات والإرشادات للعناية بمنزلك
          </h2>
          <p class="text-muted-500 text-base">
            إرشادات عملية موثوقة من خبراء النظافة لمساعدتك في الحفاظ على رونق بيتك وأثاثك بجدة.
          </p>
        </div>
        <a href="/blog/" class="btn-secondary text-sm">
          <span>تصفح المدونة كاملة</span>
          <span aria-hidden="true">&larr;</span>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${blogList.slice(0, 3).map(post => `
          <article class="card-premium overflow-hidden flex flex-col justify-between group">
            <div>
              <div class="aspect-[16/10] overflow-hidden bg-ivory-200">
                <img src="${post.image}" alt="${post.title}" width="600" height="375" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              </div>
              <div class="p-6 space-y-3">
                <div class="flex items-center gap-3 text-xs text-muted-500">
                  <span class="text-teal-700 font-bold bg-mint px-2 py-0.5 rounded">${post.category}</span>
                  <span>•</span>
                  <span>${post.readTime}</span>
                </div>
                <h3 class="text-lg font-bold text-emerald-800 group-hover:text-teal-700 transition leading-snug">
                  <a href="/blog/${post.slug}/">${post.title}</a>
                </h3>
                <p class="text-sm text-muted-500 line-clamp-2 leading-relaxed">
                  ${post.desc}
                </p>
              </div>
            </div>

            <div class="p-6 pt-0">
              <a href="/blog/${post.slug}/" class="text-sm font-bold text-teal-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>قراءة المقال كاملاً</span>
                <span aria-hidden="true">&larr;</span>
              </a>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  </section>
  `;

  const html = wrapPage({
    title: 'شركة تنظيف بجدة — نضار لخدمات تنظيف المنازل والفلل والمفروشات',
    description: 'شركة نضار للتنظيف بجدة: خدمات تنظيف شاملة للمنازل، الفلل، الشقق، الكنب، السجاد، والمكاتب. طواقم مدربة، أجهزة حديثة ومواد آمنة. احجز موعدك الآن.',
    canonicalPath: '/',
    schemaJson,
    content,
    heroPreload: '/assets/images/hero/logo.webp'
  });

  writeHtml('index.html', html);
}

/**
 * 2. About Page (/about/)
 */
function buildAboutPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "من نحن — شركة نضار للتنظيف بجدة",
    "description": "تعرف على هوية نضار للتنظيف بجدة، فلسفة تقديم الخدمة، معايير الجودة المتبعة، ومنهجية العناية بممتلكات العملاء.",
    "url": `${SITE_URL}/about/`
  };

  const content = `
  <!-- Breadcrumbs -->
  <div class="bg-white border-b border-charcoal/5 py-3">
    <div class="container-custom">
      <nav aria-label="مسار التنقل" class="text-xs text-muted-500 flex items-center gap-2">
        <a href="/" class="hover:text-teal-700 transition">الرئيسية</a>
        <span>/</span>
        <span class="text-emerald-800 font-bold" aria-current="page">من نحن</span>
      </nav>
    </div>
  </div>

  <!-- Page Header -->
  <section class="py-16 md:py-20 bg-gradient-to-b from-mint/40 to-ivory-100">
    <div class="container-custom text-center max-w-3xl space-y-4">
      <span class="badge-tag">هوية نضار وفلسفتنا</span>
      <h1 class="text-3xl md:text-5xl font-extrabold text-emerald-800 leading-tight">
        النقاء الذي يمكن رؤيته والشعور به
      </h1>
      <p class="text-base md:text-lg text-muted-500 leading-relaxed">
        تأسست «نضار للتنظيف» في جدة لتضع معياراً جديداً في خدمات النظافة المتخصصة؛ معياراً يجمع بين الاحترافية الصادقة، العناية الفائقة بالتفاصيل، والاحترام العميق لخصوصية وممتلكات كل عميل.
      </p>
    </div>
  </section>

  <!-- Story & Philosophy -->
  <section class="py-20 bg-white">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div class="lg:col-span-6 space-y-6 text-right">
          <span class="badge-tag">فلسفة تقديم الخدمة</span>
          <h2 class="text-2xl md:text-3xl font-extrabold text-emerald-800 leading-snug">
            لماذا اخترنا اسم «نَضَار»؟
          </h2>
          <p class="text-muted-500 text-base leading-relaxed">
            في لغتنا العربية الجميلة، يُعبّر «النَّضَار» عن النضارة، البريق، والذهب الخالص النقي. ومن هذا المعنى استلهمنا رسالتنا: أن نُعيد لكل مساحة ننظفها بريقها الأصيل ونقاءها المنعش الذي يبعث على الراحة النفسية والسكينة.
          </p>
          <p class="text-muted-500 text-base leading-relaxed">
            نحن لا نؤمن بالحلول السطحية السريعة التي تكتفي بالمسح الظاهري؛ بل نتبع منهجية تنظيف فيزيائية وكيميائية مدروسة تزيل الأوساخ والدهون والعوالق الدقيقة من جذورها، دون إلحاق أي ضرر بالأسطح أو الألوان أو الأقمشة.
          </p>
          <div class="pt-2">
            <a href="/contact/" class="btn-primary">تواصل معنا واستفسر عن خدماتنا</a>
          </div>
        </div>

        <div class="lg:col-span-6">
          <div class="rounded-3xl overflow-hidden shadow-card border-4 border-ivory-100 aspect-[4/3]">
            <img src="/assets/images/hero/about.webp" alt="فريق ومعدات نضار للتنظيف بجدة" width="700" height="525" class="w-full h-full object-cover">
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Pillars of Work -->
  <section class="py-20 bg-ivory-100">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span class="badge-tag">ركائز العمل في نضار</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-emerald-800">
          المبادئ الأربعة التي لا نساوم عليها
        </h2>
        <p class="text-muted-500 text-base">
          تحدد هذه الركائز كل خطوة يقوم بها فريق العمل في الميدان.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div class="bg-white p-7 rounded-2xl border border-charcoal/5 shadow-soft text-right space-y-3">
          <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-emerald-800">الأمانة والخصوصية</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            دخول المنازل مسؤولية أخلاقية كبرى. نلتزم بأعلى درجات الانضباط والحفاظ على سرية وخصوصية البيوت والمكاتب.
          </p>
        </div>

        <div class="bg-white p-7 rounded-2xl border border-charcoal/5 shadow-soft text-right space-y-3">
          <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-emerald-800">العناية بالممتلكات</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            نتعامل مع قطع الأثاث، الرخام، الزجاج والتحف بحذر مدروس، مع اختبار المنظفات مسبقاً لمنع أي تلف أو تغيير بالألوان.
          </p>
        </div>

        <div class="bg-white p-7 rounded-2xl border border-charcoal/5 shadow-soft text-right space-y-3">
          <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-emerald-800">معدات حديثة</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            نستثمر في ماكينات الشفط العميق، أجهزة البخار المضغوط وماكينات تلميع البورسلين والرخام لتحقيق أفضل نتيجة ممكنة.
          </p>
        </div>

        <div class="bg-white p-7 rounded-2xl border border-charcoal/5 shadow-soft text-right space-y-3">
          <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-emerald-800">احترام الوقت</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            وقت العميل ثمين. نصل في الموعد المحدد وننجز العمل وفق الجدول الزمني المتفق عليه دون إهدار أو مماطلة.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- Care of Property Statement -->
  <section class="py-20 bg-white">
    <div class="container-custom max-w-4xl text-right space-y-6">
      <span class="badge-tag">بروتوكول السلامة وجودة الأداء</span>
      <h2 class="text-2xl md:text-3xl font-extrabold text-emerald-800">
        كيف نضمن سلامة منزلك أثناء تقديم الخدمة؟
      </h2>
      <div class="prose max-w-none text-muted-500 space-y-4 text-base leading-relaxed">
        <p>
          نتبع في نضار بروتوكولاً محدداً لحماية الأثاث والمرافق:
        </p>
        <ul class="list-disc pr-6 space-y-2">
          <li><strong>فحص أولي للموقع:</strong> معاينة الأسطح الحساسة وفحص أي تلفيات سابقة لتوثيقها ومناقشة طريقة تنظيفها الآمنة مع العميل.</li>
          <li><strong>فصل المواد الكيميائية:</strong> عدم خلط أي مواد كيميائية تجنباً للغازات الضارة، واستخدام المحاليل المخصصة فقط لكل مادة.</li>
          <li><strong>أغطية واقية:</strong> حماية المقابس الكهربائية، ورفع أطراف الستائر عن الأرضيات الرطبة أثناء الجلي والمسح.</li>
          <li><strong>التهوية الطبيعية:</strong> فتح النوافذ وتشغيل مراوح الشفط لضمان تجفيف سريع ومنع احتباس الرطوبة في الجو الساحلي لجدة.</li>
        </ul>
      </div>

      <div class="pt-6 border-t border-charcoal/10 flex flex-wrap items-center gap-4">
        <a href="/contact/" class="btn-primary">احجز موعدك مع نضار</a>
        <a href="/pricing/" class="btn-outline">اطلع على عوامل التسعير</a>
      </div>
    </div>
  </section>
  `;

  const html = wrapPage({
    title: 'من نحن — شركة نضار للتنظيف بجدة | رؤيتنا ومعايير الجودة',
    description: 'تعرف على هوية نضار للتنظيف بجدة، فلسفة النقاء والعناية بأدق التفاصيل، بروتوكولات الأمانة وحماية ممتلكات العملاء أثناء تقديم الخدمة.',
    canonicalPath: '/about/',
    schemaJson,
    content
  });

  writeHtml('about/index.html', html);
}

/**
 * 3. Contact Page (/contact/)
 */
function buildContactPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "اتصل بنا — شركة نضار للتنظيف بجدة",
    "description": "تواصل مع فريق نضار للتنظيف بجدة لطلب عروض الأسعار وحجز المواعيد لكافة خدمات تنظيف المنازل والمفروشات.",
    "url": `${SITE_URL}/contact/`
  };

  const content = `
  <!-- Breadcrumbs -->
  <div class="bg-white border-b border-charcoal/5 py-3">
    <div class="container-custom">
      <nav aria-label="مسار التنقل" class="text-xs text-muted-500 flex items-center gap-2">
        <a href="/" class="hover:text-teal-700 transition">الرئيسية</a>
        <span>/</span>
        <span class="text-emerald-800 font-bold" aria-current="page">اتصل بنا</span>
      </nav>
    </div>
  </div>

  <!-- Page Header -->
  <section class="py-16 bg-gradient-to-b from-mint/40 to-ivory-100">
    <div class="container-custom text-center max-w-3xl space-y-4">
      <span class="badge-tag">خدمة عملاء مباشرة</span>
      <h1 class="text-3xl md:text-5xl font-extrabold text-emerald-800 leading-tight">
        تواصل معنا واحجز موعدك بجدة
      </h1>
      <p class="text-base md:text-lg text-muted-500 leading-relaxed">
        يسعدنا الرد على استفساراتكم وتقديم عروض الأسعار المناسبة لاحتياجات منازلكم ومكاتبكم في كافة أحياء جدة.
      </p>
    </div>
  </section>

  <!-- Contact Grid & Form -->
  <section class="py-20 bg-white">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- Contact Information Cards -->
        <div class="lg:col-span-5 space-y-6 text-right">
          <div class="space-y-3">
            <h2 class="text-2xl font-extrabold text-emerald-800">قنوات التواصل المباشرة</h2>
            <p class="text-sm text-muted-500 leading-relaxed">
              يمكنك التواصل مباشرة مع فريق العمل عبر الاتصال الهاتفي أو الواتساب للحصول على استجابة فورية.
            </p>
          </div>

          <!-- Phone Card -->
          <div class="card-premium p-6 flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700 flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </div>
            <div>
              <div class="text-xs text-muted-500 font-semibold mb-1">الاتصال المباشر</div>
              <a href="tel:${PHONE_INT}" class="text-lg font-extrabold text-emerald-800 hover:text-teal-700 transition" dir="ltr">
                ${PHONE_DISPLAY}
              </a>
              <div class="text-xs text-muted-500 mt-1">متاح طوال ساعات العمل للرد على الاستفسارات</div>
            </div>
          </div>

          <!-- WhatsApp Card -->
          <div class="card-premium p-6 flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] flex-shrink-0">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            </div>
            <div>
              <div class="text-xs text-muted-500 font-semibold mb-1">المراسلة عبر واتساب</div>
              <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="text-lg font-extrabold text-emerald-800 hover:text-teal-700 transition">
                إرسال رسالة فورية &larr;
              </a>
              <div class="text-xs text-muted-500 mt-1">تجهيز سريع للتفاصيل وإرسال صور الموقع لمعاينته</div>
            </div>
          </div>

          <!-- Working Hours Card -->
          <div class="card-premium p-6 flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700 flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <div class="text-xs text-muted-500 font-semibold mb-1">أوقات العمل المعتمدة</div>
              <div class="text-sm font-bold text-charcoal">السبت - الخميس: 8:00 ص - 10:00 م</div>
              <div class="text-sm font-bold text-charcoal mt-0.5">الجمعة: 1:00 م - 9:00 م</div>
            </div>
          </div>

          <!-- Location & Coverage -->
          <div class="card-premium p-6 flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700 flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <div>
              <div class="text-xs text-muted-500 font-semibold mb-1">نطاق التغطية والموقع</div>
              <div class="text-sm font-bold text-charcoal">${LOCATION}</div>
              <div class="text-xs text-muted-500 mt-1">خدمة ميدانية مباشرة لكافة أحياء شمال، وسط، وجنوب جدة</div>
            </div>
          </div>

        </div>

        <!-- Booking & Inquiry Form -->
        <div class="lg:col-span-7">
          <div class="card-premium p-8 md:p-10 border border-charcoal/10 text-right">
            <div class="space-y-2 mb-8">
              <span class="badge-tag">طلب تسعير ومعاينة</span>
              <h2 class="text-2xl font-extrabold text-emerald-800">أدخل تفاصيل طلبك</h2>
              <p class="text-sm text-muted-500">
                املأ البيانات أدناه، وسيتم تجهيز طلبك بدقة وتوجيهه لممثلي خدمة العملاء.
              </p>
            </div>

            <form class="nadar-action-form space-y-5" novalidate>
              
              <!-- Client Name -->
              <div>
                <label for="client_name" class="block text-sm font-bold text-charcoal mb-2">
                  الاسم الكريم <span class="text-red-500">*</span>
                </label>
                <input type="text" id="client_name" name="client_name" required placeholder="مثال: عبدالله الحربي" class="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-sm bg-white transition">
              </div>

              <!-- Phone & District -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="client_phone" class="block text-sm font-bold text-charcoal mb-2">
                    رقم الجوال السعودي <span class="text-red-500">*</span>
                  </label>
                  <input type="tel" id="client_phone" name="client_phone" required placeholder="05XXXXXXXX" dir="ltr" class="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-sm bg-white transition text-right">
                </div>
                <div>
                  <label for="district" class="block text-sm font-bold text-charcoal mb-2">
                    الحي بجدة <span class="text-red-500">*</span>
                  </label>
                  <input type="text" id="district" name="district" required placeholder="مثال: أبحر الشمالية، الروضة" class="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-sm bg-white transition">
                </div>
              </div>

              <!-- Service Type -->
              <div>
                <label for="service_type" class="block text-sm font-bold text-charcoal mb-2">
                  نوع الخدمة المطلوبة <span class="text-red-500">*</span>
                </label>
                <select id="service_type" name="service_type" class="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-sm bg-white transition">
                  ${servicesList.map(s => `<option value="${s.title}">${s.title}</option>`).join('')}
                  <option value="باقة تنظيف مخصصة">باقة تنظيف مخصصة / أكثر من خدمة</option>
                </select>
              </div>

              <!-- Notes / Details -->
              <div>
                <label for="notes" class="block text-sm font-bold text-charcoal mb-2">
                  تفاصيل إضافية عن العقار (اختياري)
                </label>
                <textarea id="notes" name="notes" rows="4" placeholder="مثال: فيلا دورين مساحة 350م، أو كنب صالة 7 مقاعد بحاجة لتنظيف عميق..." class="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-sm bg-white transition"></textarea>
              </div>

              <!-- Status Box for Validation & Submission Feedback -->
              <div class="form-status-message hidden"></div>

              <!-- Submit Button -->
              <button type="submit" class="btn-primary w-full text-base py-4 font-bold shadow-md">
                <span>تأكيد وإرسال تفاصيل الحجز</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>

              <p class="text-xs text-muted-500 text-center">
                نحترم خصوصيتك التامة؛ لا نشارك بياناتك مع أي طرف ثالث على الإطلاق.
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
  `;

  const html = wrapPage({
    title: 'اتصل بنا — شركة نضار للتنظيف بجدة | حجز واستفسار مباشر',
    description: 'تواصل مع شركة نضار للتنظيف بجدة. هاتف: 0500000000، واتساب مباشر، نموذج حجز تسعير، وساعات العمل المعتمدة لكافة أحياء جدة.',
    canonicalPath: '/contact/',
    schemaJson,
    content
  });

  writeHtml('contact/index.html', html);
}

/**
 * 4. Pricing Page (/pricing/)
 */
function buildPricingPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "معايير الأسعار — نضار للتنظيف بجدة",
    "description": "تعرف على العوامل الموضوعية التي تحدد تكلفة خدمات تنظيف الشقق، الفلل، المفروشات وما بعد التشطيب في جدة.",
    "url": `${SITE_URL}/pricing/`
  };

  const content = `
  <!-- Breadcrumbs -->
  <div class="bg-white border-b border-charcoal/5 py-3">
    <div class="container-custom">
      <nav aria-label="مسار التنقل" class="text-xs text-muted-500 flex items-center gap-2">
        <a href="/" class="hover:text-teal-700 transition">الرئيسية</a>
        <span>/</span>
        <span class="text-emerald-800 font-bold" aria-current="page">الأسعار</span>
      </nav>
    </div>
  </div>

  <!-- Page Header -->
  <section class="py-16 md:py-20 bg-gradient-to-b from-mint/40 to-ivory-100">
    <div class="container-custom text-center max-w-3xl space-y-4">
      <span class="badge-tag">شفافية تسعير كاملة</span>
      <h1 class="text-3xl md:text-5xl font-extrabold text-emerald-800 leading-tight">
        معايير تسعير خدمات التنظيف بجدة
      </h1>
      <p class="text-base md:text-lg text-muted-500 leading-relaxed">
        في نضار، نتبع سياسة تسعير واضحة وعادلة تقوم على المعاينة الدقيقة وطبيعة الموقع الفعلية، دون أرقام عشوائية أو تكاليف خفية غير متفق عليها.
      </p>
    </div>
  </section>

  <!-- Pricing Factors Breakdown -->
  <section class="py-20 bg-white">
    <div class="container-custom">
      <div class="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span class="badge-tag">عوامل تحديد التكلفة</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-emerald-800">
          ما هي العناصر التي تحكم قيمة خدمة التنظيف؟
        </h2>
        <p class="text-muted-500 text-base">
          تختلف كل مساحة عن الأخرى، لذلك يتم احتساب التكلفة وفق 6 معايير رئيسية تضمن لك الحصول على أفضل قيمة مقابل ما تدفعه:
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div class="card-premium p-7 space-y-3 text-right">
          <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
          </div>
          <h3 class="text-xl font-bold text-emerald-800">1. مساحة العقار وعدد الغرف</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            المساحة بالمتر المربع، وعدد الأدوار، وعدد الغرف والصالات ودورات المياه تؤثر مباشرة على حجم طاقم العمل والوقت المطلوب.
          </p>
        </div>

        <div class="card-premium p-7 space-y-3 text-right">
          <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
          </div>
          <h3 class="text-xl font-bold text-emerald-800">2. حالة العقار (مأهول أم بعد تشطيب)</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            تنظيف المنازل المفروشة المعتاد يختلف جذرياً عن إزالة غبار الجبس وبقايا الدهانات والإسمنت بعد التشطيب والتي تتطلب ماكينات ومواد خاصة.
          </p>
        </div>

        <div class="card-premium p-7 space-y-3 text-right">
          <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 class="text-xl font-bold text-emerald-800">3. نوعية الأرضيات والأسطح</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            الرخام الطبيعي والباركيه والبورسلين يتطلب كل منها معالجة وتلميعاً مخصصاً، واستخدام أقراص تنظيف لا تخدش اللمعان.
          </p>
        </div>

        <div class="card-premium p-7 space-y-3 text-right">
          <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>
          <h3 class="text-xl font-bold text-emerald-800">4. المفروشات والمجالس والكنب</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            عدد قطع الكنب والمجالس، نوع القماش (مخمل، كتان، جلد)، ومدى صعوبة البقع وحاجتها لتقنية الحقن والاستخلاص أو البخار.
          </p>
        </div>

        <div class="card-premium p-7 space-y-3 text-right">
          <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
          </div>
          <h3 class="text-xl font-bold text-emerald-800">5. مستوى الدهون والتكلسات</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            المطابخ ذات تراكمات الدهون العالية أو الحمامات ذات التكلسات الجيرية الشديدة تتطلب وقتاً أطول ومنظفات فوارة متخصصة.
          </p>
        </div>

        <div class="card-premium p-7 space-y-3 text-right">
          <div class="w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-teal-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h3 class="text-xl font-bold text-emerald-800">6. الخدمات الإضافية المطلوبة</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            إضافة تنظيف خزانات، تلميع زجاج الواجهات الخارجية، تنظيف المكيفات أو جلي الأحواش الخارجية تُحتسب ضمن باقات مخفضة عند الطلب المدمج.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- How to Get an Accurate Quote -->
  <section class="py-20 bg-ivory-100">
    <div class="container-custom max-w-4xl text-right space-y-6">
      <span class="badge-tag">طلب تسعير فوري</span>
      <h2 class="text-3xl font-extrabold text-emerald-800">
        كيف تحصل على عرض سعر دقيق وعادل لموقعك؟
      </h2>
      <p class="text-muted-500 text-base leading-relaxed">
        للحصول على تسعيرة دقيقة دون أي تغييرات لاحقة، نوصي بتزويدنا بالمعلومات التالية عند التواصل:
      </p>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div class="bg-white p-4 rounded-xl border border-charcoal/5">
          <span class="font-bold text-emerald-800">1. موقع العقار:</span>
          <span class="text-sm text-muted-500 block mt-1">تحديد الحي في مدينة جدة وطبيعة العقار (فيلا، شقة، مكتب).</span>
        </div>
        <div class="bg-white p-4 rounded-xl border border-charcoal/5">
          <span class="font-bold text-emerald-800">2. المساحة والتقسيم:</span>
          <span class="text-sm text-muted-500 block mt-1">المساحة التقريبية وعدد الغرف ودورات المياه والمطابخ.</span>
        </div>
        <div class="bg-white p-4 rounded-xl border border-charcoal/5">
          <span class="font-bold text-emerald-800">3. نوع الخدمة:</span>
          <span class="text-sm text-muted-500 block mt-1">تنظيف دوري، تنظيف عميق، تنظيف بعد التشطيب أو تنظيف مفروشات فقط.</span>
        </div>
        <div class="bg-white p-4 rounded-xl border border-charcoal/5">
          <span class="font-bold text-emerald-800">4. صور أو فيديو للموقع:</span>
          <span class="text-sm text-muted-500 block mt-1">إرسال مقطع فيديو قصير عبر الواتساب يساعدنا في تقييم الاحتياج بدقة خلال دقائق.</span>
        </div>
      </div>

      <div class="pt-6 flex flex-wrap items-center gap-4">
        <a href="/contact/" class="btn-primary">طلب تسعير الآن</a>
        <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="btn-teal">إرسال تفاصيل الموقع عبر واتساب</a>
      </div>
    </div>
  </section>
  `;

  const html = wrapPage({
    title: 'معايير الأسعار — نضار للتنظيف بجدة | وضوح وشفافية التكلفة',
    description: 'تعرف على العوامل المحددة لأسعار تنظيف المنازل، الفلل، الشقق والمفروشات بجدة لدى شركة نضار. سياسة تسعير عادلة دون رسوم خفية.',
    canonicalPath: '/pricing/',
    schemaJson,
    content
  });

  writeHtml('pricing/index.html', html);
}

/**
 * 5. FAQ Page (/faq/)
 */
function buildFaqPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "كيف يمكنني حجز موعد تنظيف لدى شركة نضار بجدة؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "يمكنك الحجز بسهولة عبر الاتصال بالهاتف 0500000000 أو المراسلة عبر الواتساب لتحديد نوع الخدمة واليوم والوقت المناسب لك."
        }
      },
      {
        "@type": "Question",
        "name": "ما هي الأحياء التي تغطيها شركة نضار في جدة؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نغطي كافة أحياء مدينة جدة السكنية والتجارية، بما في ذلك أبحر الشمالية والجنوبية، الروضة، السلامة، المحمدية، المرجان، الشاطئ، الحمراء، السامر، الصفا، والنعيم."
        }
      },
      {
        "@type": "Question",
        "name": "هل المنظفات المستخدمة آمنة على الأطفال والحيوانات الأليفة؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم، نحرص على استخدام مواد تنظيف مصرحة ومطابقة للمواصفات القياسية، وخالية من الغازات الخانقة أو المواد المحظورة."
        }
      }
    ]
  };

  const content = `
  <!-- Breadcrumbs -->
  <div class="bg-white border-b border-charcoal/5 py-3">
    <div class="container-custom">
      <nav aria-label="مسار التنقل" class="text-xs text-muted-500 flex items-center gap-2">
        <a href="/" class="hover:text-teal-700 transition">الرئيسية</a>
        <span>/</span>
        <span class="text-emerald-800 font-bold" aria-current="page">الأسئلة الشائعة</span>
      </nav>
    </div>
  </div>

  <!-- Page Header -->
  <section class="py-16 md:py-20 bg-gradient-to-b from-mint/40 to-ivory-100">
    <div class="container-custom text-center max-w-3xl space-y-4">
      <span class="badge-tag">مركز المساعدة والإجابات</span>
      <h1 class="text-3xl md:text-5xl font-extrabold text-emerald-800 leading-tight">
        الأسئلة الشائعة حول خدمات نضار
      </h1>
      <p class="text-base md:text-lg text-muted-500 leading-relaxed">
        إليك إجابات شاملة ومفصلة عن أكثر الأسئلة التي يطرحها عملاؤنا بجدة بشأن الحجز، التجهيز، السلامة، والتسعير.
      </p>
    </div>
  </section>

  <!-- FAQ Accordion Categories -->
  <section class="py-20 bg-white">
    <div class="container-custom max-w-4xl space-y-12">
      
      <!-- Category 1: الحجز والمواعيد -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-emerald-800 border-r-4 border-teal-700 pr-3">
          1. إجراءات الحجز والمواعيد
        </h2>
        <div class="space-y-3 accordion-group">
          
          <div class="card-premium overflow-hidden border border-charcoal/5">
            <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
              <span>قبل كم يوم ينبغي علي حجز موعد الخدمة؟</span>
              <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="accordion-content">
              <div class="p-5 pt-0 text-sm text-muted-500 leading-relaxed border-t border-charcoal/5">
                يفضل الحجز قبل 24 إلى 48 ساعة لضمان توفير الموعد والوقت المفضل لك، خاصة خلال عطلات نهاية الأسبوع ومواسم الأعياد. وفي حال توفر شاغر بالجدول اليومي، يمكننا تقديم الخدمة في نفس اليوم.
              </div>
            </div>
          </div>

          <div class="card-premium overflow-hidden border border-charcoal/5">
            <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
              <span>هل يمكن تعديل موعد الحجز أو إلغاؤه؟</span>
              <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="accordion-content">
              <div class="p-5 pt-0 text-sm text-muted-500 leading-relaxed border-t border-charcoal/5">
                نعم بكل تأكيد، نرجو فقط إخطارنا قبل الموعد المتفق عليه بـ 12 ساعة على الأقل حتى نتمكن من إعادة ترتيب جدول الفريق دون أي رسوم إضافية.
              </div>
            </div>
          </div>

          <div class="card-premium overflow-hidden border border-charcoal/5">
            <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
              <span>هل يلزم تواجدي في المنزل طوال فترة التنظيف؟</span>
              <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="accordion-content">
              <div class="p-5 pt-0 text-sm text-muted-500 leading-relaxed border-t border-charcoal/5">
                يلزم وجود العميل أو من ينوب عنه عند بدء العمل لشرح المتطلبات واستلام الموقع، وكذلك عند الانتهاء لتفقد جودة العمل واستلام الموقع رسمياً. أما أثناء سير العمل فيمكنك التواجد أو ممارسة مهامك بشكل طبيعي.
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Category 2: الاستعداد والمعدات -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-emerald-800 border-r-4 border-teal-700 pr-3">
          2. الاستعداد وتجهيز الموقع
        </h2>
        <div class="space-y-3 accordion-group">
          
          <div class="card-premium overflow-hidden border border-charcoal/5">
            <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
              <span>ما الذي ينبغي علي تجهيزه قبل وصول فريق التنظيف؟</span>
              <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="accordion-content">
              <div class="p-5 pt-0 text-sm text-muted-500 leading-relaxed border-t border-charcoal/5">
                يُفضل حفظ المقتنيات الثمينة والأوراق الرسمية في أماكن مغلقة، وتوفير مصدر فعال للماء والكهرباء في الموقع، وإزاحة أي مقتنيات شخصية مبعثرة على الأسطح لتسهيل بدء العمل المباشر.
              </div>
            </div>
          </div>

          <div class="card-premium overflow-hidden border border-charcoal/5">
            <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
              <span>كم يستغرق جفاف الكنب والسجاد بعد الغسيل؟</span>
              <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="accordion-content">
              <div class="p-5 pt-0 text-sm text-muted-500 leading-relaxed border-t border-charcoal/5">
                بفضل ماكينات الشفط القوية التي تستخلص ما يقارب 85-90% من المياه، يستغرق الجفاف التام بين 3 إلى 6 ساعات في المتوسط، بالاعتماد على تهوية الغرفة وتشغيل التكييف أو المراوح.
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Category 3: الدفع والضمان -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-emerald-800 border-r-4 border-teal-700 pr-3">
          3. طرق الدفع وضمان الخدمة
        </h2>
        <div class="space-y-3 accordion-group">
          
          <div class="card-premium overflow-hidden border border-charcoal/5">
            <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
              <span>ما هي طرق الدفع المتاحة لديكم؟</span>
              <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="accordion-content">
              <div class="p-5 pt-0 text-sm text-muted-500 leading-relaxed border-t border-charcoal/5">
                نوفر خيارات دفع متعددة تشمل التحويل البنكي المباشر، والدفع النقدي عند التسليم، بالإضافة لمدى والبطاقات الائتمانية بحسب الاتفاق المسبق.
              </div>
            </div>
          </div>

          <div class="card-premium overflow-hidden border border-charcoal/5">
            <button type="button" aria-expanded="false" class="accordion-header w-full p-5 text-right font-bold text-base text-emerald-800 flex justify-between items-center gap-4 hover:bg-mint/40 transition">
              <span>ماذا لو كان لدي ملاحظة على زاوية معينة بعد انتهاء العمل؟</span>
              <svg class="accordion-icon w-5 h-5 text-teal-700 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="accordion-content">
              <div class="p-5 pt-0 text-sm text-muted-500 leading-relaxed border-t border-charcoal/5">
                لا يغادر طاقم نضار الموقع إلا بعد قيامك بالمعاينة والتأكد من إتمام كل المتطلبات. وإذا وجدت أي ملاحظة أثناء المعاينة، يقوم الفريق بمعالجتها فوراً ودون أي تردد حتى تصل إلى الرضا الكامل.
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="p-8 bg-ivory-100 rounded-2xl border border-charcoal/5 text-center space-y-4">
        <h3 class="text-xl font-bold text-emerald-800">هل لديك سؤال آخر لم تجد إجابته هنا؟</h3>
        <p class="text-sm text-muted-500">فريق خدمة عملاء نضار بجدة جاهز للرد على كافة أسئلتك على مدار اليوم.</p>
        <div class="flex justify-center gap-3 pt-2">
          <a href="/contact/" class="btn-primary text-sm">تواصل معنا الآن</a>
          <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="btn-teal text-sm">محادثة واتساب</a>
        </div>
      </div>

    </div>
  </section>
  `;

  const html = wrapPage({
    title: 'الأسئلة الشائعة — نضار للتنظيف بجدة | إجابات الحجز والخدمات',
    description: 'إجابات على الأسئلة الشائعة لشركة نضار للتنظيف بجدة: طرق الحجز، التجهيز المسبق، المنظفات والمعدات المستخدمة، وطرق الدفع والضمان.',
    canonicalPath: '/faq/',
    schemaJson,
    content
  });

  writeHtml('faq/index.html', html);
}

/**
 * 6. Gallery Page (/gallery/)
 */
function buildGalleryPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "معرض الصور — نضار للتنظيف بجدة",
    "description": "استعرض صوراً تمثل مجالات خدمات التنظيف المختلفة لدى نضار للتنظيف بجدة للمنازل والمفروشات والمكاتب.",
    "url": `${SITE_URL}/gallery/`
  };

  const content = `
  <!-- Breadcrumbs -->
  <div class="bg-white border-b border-charcoal/5 py-3">
    <div class="container-custom">
      <nav aria-label="مسار التنقل" class="text-xs text-muted-500 flex items-center gap-2">
        <a href="/" class="hover:text-teal-700 transition">الرئيسية</a>
        <span>/</span>
        <span class="text-emerald-800 font-bold" aria-current="page">معرض الصور</span>
      </nav>
    </div>
  </div>

  <!-- Page Header -->
  <section class="py-16 md:py-20 bg-gradient-to-b from-mint/40 to-ivory-100">
    <div class="container-custom text-center max-w-3xl space-y-4">
      <span class="badge-tag">الشفافية البصرية</span>
      <h1 class="text-3xl md:text-5xl font-extrabold text-emerald-800 leading-tight">
        معرض صور مجالات التنظيف
      </h1>
      <p class="text-base md:text-lg text-muted-500 leading-relaxed">
        نماذج توضيحية للمساحات والأسطح والمفروشات التي نخدمها في نضار بمدينة جدة.
      </p>
      
      <!-- Honest Disclaimer Notice -->
      <div class="p-4 bg-white/80 border border-teal-700/20 rounded-xl text-xs text-muted-500 max-w-xl mx-auto text-right">
        <strong>إشعار الشفافية والمصداقية:</strong> التزاماً بسياسة الأمانة المطلقة لنضار، الصور المعروضة أدناه هي صور فوتوغرافية مرخصة لتوضيح نطاقات الخدمة ومستويات النظافة المستهدفة. سيتم استبدالها بصور وثائقية حقيقية من مشاريع الشركة الميدانية بجدة فور اعتمادها.
      </div>
    </div>
  </section>

  <!-- Gallery Grid -->
  <section class="py-20 bg-white">
    <div class="container-custom">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${[
      { img: '/assets/images/services/house-cleaning.webp', title: 'تنظيف وتنسيق صالات المعيشة', tag: 'منازل' },
      { img: '/assets/images/services/villa-cleaning.webp', title: 'عناية بالفلل والمساحات المفتوحة', tag: 'فلل' },
      { img: '/assets/images/services/apartment-cleaning.webp', title: 'تنظيف وتجهيز الشقق السكنية', tag: 'شقق' },
      { img: '/assets/images/services/office-cleaning.webp', title: 'تنظيف مساحات العمل والمكاتب', tag: 'مكاتب' },
      { img: '/assets/images/services/sofa-cleaning.webp', title: 'استخلاص بقع أقمشة الكنب', tag: 'مفروشات' },
      { img: '/assets/images/services/carpet-cleaning.webp', title: 'غسيل وتطهير ألياف السجاد والموكيت', tag: 'سجاد' },
      { img: '/assets/images/services/majlis-cleaning.webp', title: 'تنظيف المجالس والفرش التراثي', tag: 'مجالس' },
      { img: '/assets/images/services/kitchen-cleaning.webp', title: 'إزالة دهون أسطح المطابخ والخزائن', tag: 'مطابخ' },
      { img: '/assets/images/services/bathroom-cleaning.webp', title: 'تطهير وإزالة تكلسات السيراميك', tag: 'حمامات' },
      { img: '/assets/images/services/post-construction-cleaning.webp', title: 'تنظيف الرخام والزجاج بعد التشطيب', tag: 'تشطيب' },
      { img: '/assets/images/services/steam-cleaning.webp', title: 'أجهزة التعقيم والتطهير بالبخار', tag: 'بخار' },
      { img: '/assets/images/services/deep-cleaning.webp', title: 'عناية تفصيلية دقيقة بالأركان', tag: 'تنظيف عميق' },
    ].map(item => `
          <div class="card-premium overflow-hidden group">
            <div class="aspect-[4/3] overflow-hidden bg-ivory-200 relative">
              <img src="${item.img}" alt="${item.title}" width="600" height="450" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <span class="absolute top-3 right-3 bg-emerald-800/80 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-bold">
                ${item.tag}
              </span>
            </div>
            <div class="p-5 text-right">
              <h3 class="font-bold text-emerald-800 text-base">${item.title}</h3>
              <p class="text-xs text-muted-500 mt-1">تطبيق معايير نضار المتطورة في العناية بالأسطح والأثاث بجدة.</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="text-center pt-16">
        <a href="/contact/" class="btn-primary text-base px-8 py-4">
          <span>اطلب خدمة مماثلة لعقارك</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
      </div>
    </div>
  </section>
  `;

  const html = wrapPage({
    title: 'معرض الصور — نضار للتنظيف بجدة | مجالات ونطاقات العمل',
    description: 'استعرض معرض صور خدمات نضار للتنظيف بجدة: تنظيف المنازل، الفلل، الكنب، السجاد، والمطابخ، مع التزام تام بالشفافية البصرية.',
    canonicalPath: '/gallery/',
    schemaJson,
    content
  });

  writeHtml('gallery/index.html', html);
}

/**
 * 7. Privacy Policy Page (/privacy-policy/)
 */
function buildPrivacyPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "سياسة الخصوصية — نضار للتنظيف بجدة",
    "url": `${SITE_URL}/privacy-policy/`
  };

  const content = `
  <!-- Breadcrumbs -->
  <div class="bg-white border-b border-charcoal/5 py-3">
    <div class="container-custom">
      <nav aria-label="مسار التنقل" class="text-xs text-muted-500 flex items-center gap-2">
        <a href="/" class="hover:text-teal-700 transition">الرئيسية</a>
        <span>/</span>
        <span class="text-emerald-800 font-bold" aria-current="page">سياسة الخصوصية</span>
      </nav>
    </div>
  </div>

  <section class="py-16 md:py-20 bg-white">
    <div class="container-custom max-w-4xl text-right space-y-8">
      <div class="space-y-3">
        <span class="badge-tag">الخصوصية والأمان</span>
        <h1 class="text-3xl md:text-4xl font-extrabold text-emerald-800">سياسة الخصوصية</h1>
        <p class="text-sm text-muted-500">آخر تحديث: أكتوبر 2026</p>
      </div>

      <div class="prose max-w-none text-muted-500 space-y-6 text-sm md:text-base leading-relaxed">
        <p>
          تلتزم شركة «نضار للتنظيف بجدة — NADAR CLEANING» بحماية خصوصية زوار ومستخدمي موقعنا الإلكتروني (nadarclean.com). توضح هذه السياسة طبيعة البيانات التي نجمعها، وكيفية استخدامها لحمايتك وضمان تقديم أفضل خدمة ممكنة.
        </p>

        <h2 class="text-xl font-bold text-emerald-800">1. البيانات التي نجمعها</h2>
        <p>
          نحن لا نجمع أي بيانات شخصية دون علمك وموافقتك الصريحة. تشمل البيانات التي قد تقدمها طوعاً عند طلب تسعير أو التواصل معنا:
        </p>
        <ul class="list-disc pr-6 space-y-1">
          <li>الاسم الكريم.</li>
          <li>رقم الجوال لتأكيد الحجز والتواصل المباشر.</li>
          <li>الحي بمدينة جدة ونوع العقار لتحديد نطاق الخدمة.</li>
          <li>أي تفاصيل أو ملاحظات خاصة ترغب بمشاركتها معنا.</li>
        </ul>

        <h2 class="text-xl font-bold text-emerald-800">2. الغرض من جمع البيانات</h2>
        <p>
          تُستخدم البيانات التي تقدمها للأغراض التالية فقط:
        </p>
        <ul class="list-disc pr-6 space-y-1">
          <li>التواصل معك للرد على الاستفسارات وتأكيد مواعيد المعاينة والتنظيف.</li>
          <li>إرسال عروض الأسعار الدقيقة وفق المعطيات المقدمة.</li>
          <li>تحسين مستوى الخدمة وتجربة المستخدم على الموقع.</li>
        </ul>

        <h2 class="text-xl font-bold text-emerald-800">3. حماية البيانات وعدم مشاركتها</h2>
        <p>
          نؤكد التزامنا الصارم بعدم بيع، تأجير، أو مشاركة بياناتك الشخصية مع أي أطراف ثالثة لأغراض تجارية أو إعلانية. بياناتك محفوظة بأعلى معايير الأمان المتبعة.
        </p>

        <h2 class="text-xl font-bold text-emerald-800">4. ملفات تعريف الارتباط (Cookies)</h2>
        <p>
          قد يستخدم الموقع ملفات تعريف ارتباط فنية أساسية لتحسين سرعة التصفح وتذكر تفضيلات العرض دون تتبع أي بيانات شخصية حساسة.
        </p>

        <h2 class="text-xl font-bold text-emerald-800">5. التواصل بشأن الخصوصية</h2>
        <p>
          إذا كان لديك أي استفسار أو طلب لتعديل أو حذف بياناتك المسجلة لدينا، يسعدنا تواصلك معنا مباشرة عبر البريد الإلكتروني: <a href="mailto:${EMAIL}" class="text-teal-700 underline font-bold">${EMAIL}</a> أو عبر الهاتف: <span dir="ltr" class="font-bold">${PHONE_DISPLAY}</span>.
        </p>
      </div>
    </div>
  </section>
  `;

  const html = wrapPage({
    title: 'سياسة الخصوصية — نضار للتنظيف بجدة | التزام تام بالأمان',
    description: 'سياسة الخصوصية لشركة نضار للتنظيف بجدة. توضيح البيانات التي يتم جمعها، كيفية حمايتها، وعدم مشاركتها مع أطراف ثالثة.',
    canonicalPath: '/privacy-policy/',
    schemaJson,
    content
  });

  writeHtml('privacy-policy/index.html', html);
}

/**
 * 8. Terms and Conditions Page (/terms-and-conditions/)
 */
function buildTermsPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "الشروط والأحكام — نضار للتنظيف بجدة",
    "url": `${SITE_URL}/terms-and-conditions/`
  };

  const content = `
  <!-- Breadcrumbs -->
  <div class="bg-white border-b border-charcoal/5 py-3">
    <div class="container-custom">
      <nav aria-label="مسار التنقل" class="text-xs text-muted-500 flex items-center gap-2">
        <a href="/" class="hover:text-teal-700 transition">الرئيسية</a>
        <span>/</span>
        <span class="text-emerald-800 font-bold" aria-current="page">الشروط والأحكام</span>
      </nav>
    </div>
  </div>

  <section class="py-16 md:py-20 bg-white">
    <div class="container-custom max-w-4xl text-right space-y-8">
      <div class="space-y-3">
        <span class="badge-tag">الوضوح القانوني والتنظيمي</span>
        <h1 class="text-3xl md:text-4xl font-extrabold text-emerald-800">الشروط والأحكام</h1>
        <p class="text-sm text-muted-500">آخر تحديث: أكتوبر 2026</p>
      </div>

      <div class="prose max-w-none text-muted-500 space-y-6 text-sm md:text-base leading-relaxed">
        <p>
          أهلاً بكم في موقع شركة «نضار للتنظيف بجدة — NADAR CLEANING». تحكم هذه الشروط والأحكام تقديم خدماتنا لعملائنا في مدينة جدة وتوضح الحقوق والالتزامات المتبادلة لضمان تجربة مهنية راقية.
        </p>

        <h2 class="text-xl font-bold text-emerald-800">1. الحجز وتأكيد المواعيد</h2>
        <ul class="list-disc pr-6 space-y-1">
          <li>يتم تأكيد الموعد النهائي بعد الاتفاق المشترك على نطاق العمل والتكلفة المقدرة وتاريخ ووقت الزيارة.</li>
          <li>يلتزم العميل بتوفير مصادر المياه والكهرباء اللازمة لتشغيل ماكينات ومعدات التنظيف في الموقع.</li>
        </ul>

        <h2 class="text-xl font-bold text-emerald-800">2. سياسة التعديل والإلغاء</h2>
        <ul class="list-disc pr-6 space-y-1">
          <li>يمكن للعميل تعديل موعد الخدمة أو إلغاؤه دون أي رسوم، شريطة إخطارنا قبل 12 ساعة على الأقل من الموعد المحدد.</li>
          <li>في حال تعذر دخول طاقم العمل للموقع في الموعد المحدد لسبب يعود للعميل دون إشعار مسبق، يحق للشركة إعادة جدولة الموعد وفق الشواغر المتاحة.</li>
        </ul>

        <h2 class="text-xl font-bold text-emerald-800">3. المعاينة والتسليم النهائي</h2>
        <ul class="list-disc pr-6 space-y-1">
          <li>يلتزم العميل أو ممثله بمعاينة الموقع بصحبة مشرف الفريق عند اكتمال العمل للتأكد من إنجاز كافة البنود المتفق عليها.</li>
          <li>أي ملاحظات إضافية تُعالج فوراً قبل مغادرة الطاقم. يعتبر توقيع استلام الخدمة أو سداد المبلغ تأكيداً لرضا العميل عن مستوى التنفيذ.</li>
        </ul>

        <h2 class="text-xl font-bold text-emerald-800">4. نطاق المسؤولية والممتلكات</h2>
        <ul class="list-disc pr-6 space-y-1">
          <li>يتحمل العميل مسؤولية حفظ وتأمين كافة الأموال والمجوهرات والمقتنيات الثمينة في خزائن مغلقة قبل بدء العمل.</li>
          <li>يلتزم طاقم نضار بالحرص الشديد واتباع الأساليب المعتمدة؛ وفي حال وجود أسطح أو أقمشة هشة أو متضررة مسبقاً، يتعين على العميل إبلاغ المشرف بذلك قبل بدء المعالجة.</li>
        </ul>

        <h2 class="text-xl font-bold text-emerald-800">5. الدفع والأسعار</h2>
        <p>
          يتم سداد المستحقات المتفق عليها فور اكتمال الخدمة والمعاينة المرضية عبر قنوات الدفع المعتمدة (نقداً أو تحويل بنكي أو مدى).
        </p>
      </div>
    </div>
  </section>
  `;

  const html = wrapPage({
    title: 'الشروط والأحكام — نضار للتنظيف بجدة | شروط الحجز والخدمة',
    description: 'الشروط والأحكام المنظمة لخدمات نضار للتنظيف بجدة. سياسات الحجز، الإلغاء، المعاينة والتسليم ونطاق المسؤولية.',
    canonicalPath: '/terms-and-conditions/',
    schemaJson,
    content
  });

  writeHtml('terms-and-conditions/index.html', html);
}

/**
 * 9. Custom 404 Page (404.html)
 */
function build404Page() {
  const content = `
  <section class="py-24 md:py-32 bg-ivory-100 text-center">
    <div class="container-custom max-w-2xl space-y-6">
      <div class="text-7xl md:text-9xl font-black text-teal-700/20 font-heading">404</div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-emerald-800">
        عذراً، الصفحة التي تبحث عنها غير موجودة!
      </h1>
      <p class="text-base text-muted-500 leading-relaxed">
        ربما تم نقل الصفحة أو كتابة الرابط بشكل غير دقيق. يمكنك الرجوع إلى الصفحة الرئيسية أو استعراض خدمات نضار للتنظيف بجدة عبر الروابط التالية:
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
        <a href="/" class="btn-primary">
          <span>العودة للصفحة الرئيسية</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        </a>
        <a href="/contact/" class="btn-secondary">
          <span>اتصل بنا للمساعدة</span>
        </a>
      </div>

      <div class="pt-8 border-t border-charcoal/10 text-xs text-muted-500">
        هل تبحث عن خدمة محددة؟ تصفح:
        <a href="/house-cleaning/" class="text-teal-700 underline mx-1">تنظيف منازل</a> •
        <a href="/villa-cleaning/" class="text-teal-700 underline mx-1">تنظيف فلل</a> •
        <a href="/sofa-cleaning/" class="text-teal-700 underline mx-1">تنظيف كنب</a> •
        <a href="/pricing/" class="text-teal-700 underline mx-1">معايير الأسعار</a>
      </div>
    </div>
  </section>
  `;

  const html = wrapPage({
    title: 'الصفحة غير موجودة (404) — نضار للتنظيف بجدة',
    description: 'عذراً، الصفحة المطلوبة غير متوفرة على موقع شركة نضار للتنظيف بجدة.',
    canonicalPath: '/404.html',
    content
  });

  writeHtml('404.html', html);
}

function run() {
  console.log('Building core pages...');
  buildHomePage();
  buildAboutPage();
  buildContactPage();
  buildPricingPage();
  buildFaqPage();
  buildGalleryPage();
  buildPrivacyPage();
  buildTermsPage();
  build404Page();
  console.log('Core pages generated successfully!');
}

run();
