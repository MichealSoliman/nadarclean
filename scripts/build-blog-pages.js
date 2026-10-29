const fs = require('fs');
const path = require('path');
const { wrapPage, blogList, servicesList, SITE_URL, FULL_BRAND } = require('./template');

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
 * 1. Blog Index Page (/blog/)
 */
function buildBlogIndexPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "مدونة نضار للتنظيف بجدة",
    "description": "دليل تثقيفي متكامل يحتوي على نصائح وإرشادات عملية للحفاظ على نظافة المنازل، الفلل، والمفروشات بجدة.",
    "url": `${SITE_URL}/blog/`
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "المدونة",
        "item": `${SITE_URL}/blog/`
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
        <span class="text-emerald-800 font-bold" aria-current="page">المدونة والمقالات</span>
      </nav>
    </div>
  </div>

  <!-- Page Header -->
  <section class="py-16 md:py-20 bg-gradient-to-b from-mint/40 to-ivory-100">
    <div class="container-custom text-center max-w-3xl space-y-4">
      <span class="badge-tag">إرشادات ونصائح الخبراء</span>
      <h1 class="text-3xl md:text-5xl font-extrabold text-emerald-800 leading-tight">
        مدونة نضار للتنظيف والعناية بالمنزل
      </h1>
      <p class="text-base md:text-lg text-muted-500 leading-relaxed">
        مقالات وإرشادات عملية موجهة للجمهور في مدينة جدة والمملكة، للمساعدة في تنظيم مهام التنظيف المنزلي، التعامل مع الرطوبة والبقع، واختيار الأساليب الآمنة للحفاظ على الأثاث والأسطح.
      </p>
    </div>
  </section>

  <!-- Blog Articles Grid -->
  <section class="py-20 bg-white">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${blogList.map(post => `
          <article class="card-premium overflow-hidden flex flex-col justify-between group">
            <div>
              <div class="aspect-[16/10] overflow-hidden bg-ivory-200 relative">
                <img src="${post.image}" alt="${post.title}" width="600" height="375" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <span class="absolute top-3 right-3 bg-emerald-800 text-white text-xs px-2.5 py-1 rounded-md font-bold">
                  ${post.category}
                </span>
              </div>
              <div class="p-6 space-y-3 text-right">
                <div class="flex items-center gap-3 text-xs text-muted-500">
                  <span>${post.date}</span>
                  <span>•</span>
                  <span>${post.readTime}</span>
                </div>
                <h2 class="text-xl font-bold text-emerald-800 group-hover:text-teal-700 transition leading-snug">
                  <a href="/blog/${post.slug}/">${post.title}</a>
                </h2>
                <p class="text-sm text-muted-500 leading-relaxed">
                  ${post.desc}
                </p>
              </div>
            </div>

            <div class="p-6 pt-0 text-right">
              <a href="/blog/${post.slug}/" class="text-sm font-bold text-teal-700 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
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
    title: 'المدونة — نضار للتنظيف بجدة | مقالات وإرشادات العناية بالمنزل',
    description: 'مقالات وإرشادات خبراء شركة نضار للتنظيف بجدة: طرق تنظيف الكنب، إزالة بقع السيراميك، تنظيف ما بعد التشطيب، ودليل أسعار النظافة المنزلية.',
    canonicalPath: '/blog/',
    schemaJson: [schemaJson, breadcrumbsSchema],
    content
  });

  writeHtml('blog/index.html', html);
}

/**
 * 2. 5 Detailed Pillar Articles
 */
const articlesData = {
  'home-cleaning-guide-jeddah': {
    slug: 'home-cleaning-guide-jeddah',
    title: 'دليل تنظيف المنزل بجدة: أفضل الطرق للحفاظ على نظافة البيت',
    metaDesc: 'دليل شامل لتنظيم تنظيف المنزل في جدة: التعامل مع الرطوبة والغبار الساحلي، جدول التنظيف اليومي والأسبوعي، واختيار الأدوات الصحيحة للحفاظ على أثاثك.',
    category: 'نصائح منزلية',
    datePublished: '2026-10-15',
    readTime: '6 دقائق قراءة',
    image: '/assets/images/blog/home-cleaning-guide.webp',
    contentHtml: `
      <p class="lead text-lg text-emerald-800 font-medium leading-relaxed">
        يتميز السكن في مدينة جدة بأجوائه الساحلية الجميلة، لكنه في الوقت ذاته يفرض تحديات خاصة في نظافة المنازل؛ فالرطوبة المرتفعة مع حركة الرياح المحملة بذرات الغبار الناعم تجعل الأتربة تلتصق بالأسطح والمفروشات سريعاً إن لم تتبع الأسرة خطة تنظيف عملية ومنتظمة.
      </p>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">1. خطة عملية لتنظيم أولويات تنظيف المنزل</h2>
      <p>
        السر في الحفاظ على البيت نظيفاً دون استنزاف طاقتك اليومية هو <strong>التقسيم الزمني للمهام</strong> وعدم محاولة إنجاز كل شيء دفعة واحدة. نقترح في نضار تقسيم العمل إلى ثلاث فئات:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li><strong>المهام اليومية السريعة (15-20 دقيقة):</strong> تهوية غرف النوم صباحاً، ترتيب الأسرة، مسح أسطح المطبخ بعد إعداد الوجبات، وتفريغ سلات المهملات أولاً بأول.</li>
        <li><strong>المهام الأسبوعية:</strong> كنس ومسح الأرضيات بمحاليل معطرة، غسيل وتطهير الحمامات بالكامل، تغيير أغطية الأسرة والشراشف، ونفض الغبار عن الستائر والنوافذ.</li>
        <li><strong>المهام الشهرية أو الموسمية:</strong> تنظيف خلف الأجهزة الكهربائية، فك وغسيل فلاتر المكيفات، وتنظيف عميق لمجاري الألمنيوم وفواصل السيراميك.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">2. التعامل مع خصوصية مناخ جدة (الغبار والرطوبة)</h2>
      <p>
        لتقليل تراكم الغبار الساحلي داخل منزلك بجدة، احرص على:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li><strong>تركيب مانع غبار (فرش عزل)</strong> أسفل الأبواب الخارجية والنوافذ، مما يقلل تسرب ذرات الأتربة بنسبة تصل إلى 70%.</li>
        <li><strong>تجنب فتح النوافذ في أوقات الذروة</strong> خاصة في الظهيرة أو عند نشاط الرياح، والاعتماد على التهوية في الصباح الباكر لمدة 15 دقيقة فقط لتجديد الهواء.</li>
        <li><strong>استخدام مكانس كهربائية مزودة بفلتر HEPA</strong> لحبس الغبار المجهري بدلاً من المكانس التقليدية التي تعيد نثر الأتربة في الهواء.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">3. أدوات التنظيف الأساسية التي لا غنى عنها</h2>
      <p>
        بدلاً من تكديس عشرات المنظفات غير المجدية، ننصح باقتناء مجموعة محددة ذات كفاءة عالية:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li>فوط مايكروفايبر ذات ألوان مختلفة (واحدة للمطبخ، وأخرى للحمامات، وثالثة لتلميع الزجاج والخشب).</li>
        <li>ممسحة أرضيات قابلة للعصر برأس مسطح يسهل وصوله تحت الأسرة والأرائك.</li>
        <li>منظف متعدد الاستعمالات بدرجة حموضة محايدة (pH Neutral) آمن على الرخام والبورسلين.</li>
        <li>ممسحة زجاج يدوية ومكشطة سيليكون لتجفيف جدران وزجاج الشاور بعد الاستحمام لمنع الترسبات الجيرية.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">4. أخطاء شائعة يجب تجنبها عند تنظيف البيت</h2>
      <p>
        هناك أخطاء تقع فيها الكثير من ربات البيوت دون قصد، منها:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li><strong>البدء بمسح الأرضيات قبل تنفض الغبار:</strong> هذا يسبب سقوط الغبار من الأسقف والطاولات على الأرضية النظيفة، مما يضطرك لمسحها مجدداً. القاعدة الذهبية دائماً: <em>من الأعلى إلى الأسفل</em>.</li>
        <li><strong>خلط الكلور بالخل أو الفلاش:</strong> هذا تصرف بالغ الخطورة ينتج عنه غاز الكلور السام الذي يسبب أضراراً تنفسية حادة. لا تخلط المنظفات الكيميائية أبداً.</li>
        <li><strong>إغراق الكنب بالماء والصابون يدوياً:</strong> يؤدي ذلك لتعفن الإسفنج الداخلي وانبعاث روائح رطوبة كريهة. تنظيف الكنب يحتاج لماكينات شفط فورية.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">5. متى يحتاج منزلك إلى شركة تنظيف متخصصة؟</h2>
      <p>
        رغم أهمية العناية اليومية، هناك مراحل تستوجب تدخلاً من فريق احترافي مجهز بمعدات صناعية؛ كحالات الانتقال لمنزل جديد، أو بعد أعمال الصيانة والدهانات، أو عند الحاجة إلى جلي الرخام وغسيل أطقم الكنب والمجالس الكبيرة.
      </p>
      <p>
        يمكنك الاطلاع على تفاصيل خدمة <a href="/house-cleaning/" class="text-teal-700 underline font-bold">تنظيف المنازل بجدة</a>، أو معرفة <a href="/pricing/" class="text-teal-700 underline font-bold">معايير الأسعار</a>، أو التواصل مباشرة مع <a href="/contact/" class="text-teal-700 underline font-bold">فريق نضار</a> لحجز موعدك.
      </p>
    `
  },

  'how-to-clean-sofas': {
    slug: 'how-to-clean-sofas',
    title: 'طريقة تنظيف الكنب وإزالة البقع والروائح دون إتلاف الأقمشة',
    metaDesc: 'دليل عملي لطريقة تنظيف الكنب وإزالة بقع القهوة والزيوت دون إتلاف القماش. تعرف على رموز العناية بالأقمشة ومتى تتجنب الماء أو البخار.',
    category: 'المفروشات والكنب',
    datePublished: '2026-10-18',
    readTime: '5 دقائق قراءة',
    image: '/assets/images/blog/sofa-cleaning.webp',
    contentHtml: `
      <p class="lead text-lg text-emerald-800 font-medium leading-relaxed">
        الكنب هو القطعة المركزية الأكثر دفئاً واستخداماً في الصالة، لكنه في الوقت نفسه الأكثر عرضة لانسكاب السوائل، بقع الطعام، وتراكم الغبار. التعامل الخاطئ مع بقع الكنب قد يحول بقعة سطحية صغيرة إلى تلف دائم في النسيج أو تغير في درجات الألوان.
      </p>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">1. قراءة ملصق العناية وفهم رموز القماش (Fabric Codes)</h2>
      <p>
        قبل وضع أي قطرة ماء أو منظف على الكنب، ابحث عن الملصق المخفي أسفل الوسائد أو في الجانب الخلفي؛ ستجد أحد الرموز العالمية التالية:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li><strong>رمز (W):</strong> يعني إمكانية التنظيف بالمنظفات المائية ورغوة الشامبو المائي.</li>
        <li><strong>رمز (S):</strong> يعني التنظيف الجاف فقط بمذيبات خالية من الماء؛ استخدام الماء هنا يترك بقع هالات دائرية دائمة.</li>
        <li><strong>رمز (WS):</strong> قماش مرن يقبل المنظفات المائية أو المذيبات الجافة بحذر.</li>
        <li><strong>رمز (X):</strong> يُنظف بالشفط الكهربائي الجاف فقط؛ يمنع استخدام أي سوائل نهائياً.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">2. الاختبار المسبق في منطقة غير ظاهرة</h2>
      <p>
        قاعدة ذهبية لا تتنازل عنها: ضع قطرة من محلول التنظيف المخفف على قطعة قماش بيضاء، واضغط بها على زاوية سفلية غير مرئية من الكنب لمدة دقيقة. إذا انتقل أي لون إلى القماشة البيضاء، فتوقف فوراً لأن القماش غير ثابت الصبغة.
      </p>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">3. خطوات إزالة أشهر البقع المنزلية الشائعة</h2>
      <div class="space-y-4">
        <div class="bg-ivory-100 p-5 rounded-xl border border-charcoal/5">
          <h3 class="font-bold text-emerald-800 text-base mb-1">بقع القهوة والشاي:</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            امسح السائل المنسكب فوراً بمنديل ورقي دون فرك. اخلط ملعقة صغيرة من سائل الأطباق اللطيف مع كوب ماء فاتر وبضع قطرات من الخل الأبيض، وطبقه بالتربيت بلطف من الخارج إلى الداخل لمنع اتساع البقعة.
          </p>
        </div>

        <div class="bg-ivory-100 p-5 rounded-xl border border-charcoal/5">
          <h3 class="font-bold text-emerald-800 text-base mb-1">بقع الزيوت والدهون:</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            رش كمية من نشا الذرة أو بودرة الأطفال على البقعة واتركها لمدة 20 دقيقة لامتصاص الزيت قبل شفطها بالمكنسة، ثم امسح أثرها برغوة صابونية خفيفة وجففها فوراً.
          </p>
        </div>

        <div class="bg-ivory-100 p-5 rounded-xl border border-charcoal/5">
          <h3 class="font-bold text-emerald-800 text-base mb-1">الروائح العالقة ورطوبة الجو:</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            انثر طبقة خفيفة من بيكربونات الصوديوم (صودا الخبز) على سطح الكنب بالكامل مساءً، واتركها تمتص الروائح حتى الصباح، ثم اشفطها بالمكنسة الكهربائية جيداً.
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">4. متى يجب عليك تجنب الماء الساخن أو البخار؟</h2>
      <p>
        يحذر الخبراء من استخدام البخار الحار أو الماء المغلي في حالتين رئيسيتين:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li><strong>بقع البروتين (كالدم والحليب):</strong> حيث تؤدي الحرارة لتثبيت البروتين في الألياف بشكل دائم يستحيل إزالته لاحقاً.</li>
        <li><strong>الأقمشة الصوفية والحريرية الحساسة:</strong> حيث تتسبب الحرارة في انكماش الخيوط وتشوه شكل الوسائد.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">5. متى تستعين بفريق تنظيف كنب محترف؟</h2>
      <p>
        إذا كانت البقع قديمة ومتغلغلة، أو كان طقم الكنب مصنوعاً من أقمشة حساسة كالمخمل الفاخر أو الجلد الطبيعي، فإن استخدام ماكينات الحقن والاستخلاص الاحترافية يضمن استخراج الرواسب من عمق النسيج دون تبليله بالكامل.
      </p>
      <p>
        تفضل بالاطلاع على تفاصيل خدمة <a href="/sofa-cleaning/" class="text-teal-700 underline font-bold">تنظيف كنب بجدة</a> لدى نضار أو <a href="/contact/" class="text-teal-700 underline font-bold">تواصل معنا</a> لحجز موعد فحص وغسيل مفروشاتك.
      </p>
    `
  },

  'house-cleaning-prices-jeddah': {
    slug: 'house-cleaning-prices-jeddah',
    title: 'كم سعر تنظيف المنزل بجدة؟ العوامل التي تحدد تكلفة الخدمة',
    metaDesc: 'دليل موضوعي يوضح عوامل تسعير تنظيف المنازل والفلل والشقق بجدة. الفرق بين التنظيف المعتاد والعميق وكيفية الحصول على عرض سعر دقيق وعادل.',
    category: 'دليل الأسعار',
    datePublished: '2026-10-20',
    readTime: '7 دقائق قراءة',
    image: '/assets/images/blog/house-cleaning-prices.webp',
    contentHtml: `
      <p class="lead text-lg text-emerald-800 font-medium leading-relaxed">
        «كم سعر تنظيف الشقة؟» أو «بكم تنظفون الفيلا؟» هما أكثر الأسئلة التي يستقبلها فريق خدمة العملاء يومياً في جدة. الحقيقة التي يتعامل بها كل مزود خدمة محترف هي أنه لا يوجد رقم عشوائي ثابت ينطبق على كل البيوت؛ فكل عقار له مساحته، حالته، ونوعية الأسطح والمفروشات التي يحتوي عليها.
      </p>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">1. العوامل الرئيسية المحددة لتكلفة تنظيف المنازل في جدة</h2>
      <p>
        عند احتساب تسعيرة التنظيف، يدرس المشرف الميداني 5 معايير تقنية:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li><strong>المساحة وعدد الغرف:</strong> شقة من 3 غرف وصالة تحتاج طاقماً من شخصين إلى ثلاثة لساعات محددة، بينما فيلا من دورين ومسبح وملحق تتطلب طاقماً أكبر ومعدات متعددة.</li>
        <li><strong>حالة العقار (مأهول أم جديد بعد تشطيب):</strong> إزالة بقايا الإسمنت وغبار الجبس والدهان تتطلب ماكينات جلي وشفرات ومواد كيميائية تختلف عن التنظيف المنزلي الدوري.</li>
        <li><strong>طبيعة الأرضيات:</strong> الرخام الطبيعي الذي يحتاج تلميعاً بالكريستال له تكلفة مختلفة عن البورسلين أو السيراميك العادي.</li>
        <li><strong>مستوى التراكمات الدهنية والكلسية:</strong> المطبخ الذي يحتوي دهوناً متراكمة لشهور يتطلب وقتاً أطول ومذيبات شحوم صناعية آمنة.</li>
        <li><strong>المفروشات والملحقات:</strong> إضافة غسيل الكنب والسجاد أو تنظيف خزانات المياه يندرج ضمن تسعيرة الباقات المدمجة.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">2. الفرق في التكلفة بين الشقق والفلل</h2>
      <p>
        في الشقق السكنية بجدة، يكون نطاق العمل ملموماً ومحدداً، ويسهل التحكم في وقت الإنجاز خلال 3 إلى 5 ساعات عمل. أما الفلل فتتضمن مساحات مفتوحة، سلالم رخامية طويلة، واجهات زجاجية مزدوجة الارتفاع، وأحواشاً خارجية، مما يجعل نطاق العمل والجهد المبذول أكبر.
      </p>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">3. التنظيف الدوري المعتاد مقابل التنظيف العميق</h2>
      <div class="overflow-x-auto my-6">
        <table class="w-full text-sm text-right border border-charcoal/10 rounded-xl overflow-hidden">
          <thead class="bg-emerald-800 text-white text-xs">
            <tr>
              <th class="p-3">وجه المقارنة</th>
              <th class="p-3">التنظيف الدوري المعتاد</th>
              <th class="p-3">التنظيف العميق (Deep Cleaning)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-charcoal/5">
            <tr class="bg-white">
              <td class="p-3 font-bold text-emerald-800">نطاق العمل</td>
              <td class="p-3 text-muted-500">مسح الأسطح الظاهرة، كنس الأرضيات وتطهير الحمامات.</td>
              <td class="p-3 text-muted-500">تحريك الأثاث، تنظيف خلف الأجهزة، فرك الفواصل، وتعقيم فتحات التكييف.</td>
            </tr>
            <tr class="bg-ivory-100">
              <td class="p-3 font-bold text-emerald-800">الوقت المستغرق</td>
              <td class="p-3 text-muted-500">أقصر (2 إلى 4 ساعات).</td>
              <td class="p-3 text-muted-500">أطول (5 إلى 8 ساعات).</td>
            </tr>
            <tr class="bg-white">
              <td class="p-3 font-bold text-emerald-800">المستوى السعري</td>
              <td class="p-3 text-muted-500">اقتصادي ومناسب للتكرار الأسبوعي أو الشهري.</td>
              <td class="p-3 text-muted-500">أعلى قليلاً نظراً لدقة وتفاصيل الإجراءات والمواد.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">4. كيف تطلب عرض سعر دقيق دون مفاجآت لاحقة؟</h2>
      <p>
        لضمان الحصول على تسعيرة نهائية غير قابلة للزيادة أثناء التنفيذ:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li>صوّر مقطع فيديو قصيراً يوضح الغرف، الصالة، ونوعية الأرضيات وأرسله عبر الواتساب.</li>
        <li>اذكر ما إذا كان العقار به ماء وكهرباء يعملان بصورة طبيعية.</li>
        <li>حدد ما إذا كنت ترغب في تنظيف النوافذ أو الواجهات أو ملحقات إضافية كالأحواش والمجالس.</li>
      </ul>

      <p class="pt-4">
        تعرف على تفاصيل سياستنا في <a href="/pricing/" class="text-teal-700 underline font-bold">صفحة معايير الأسعار</a>، أو تواصل فوراً مع <a href="/contact/" class="text-teal-700 underline font-bold">خدمة عملاء نضار بجدة</a> للحصول على عرض سعر فوري ومجاني.
      </p>
    `
  },

  'tile-grout-cleaning': {
    slug: 'tile-grout-cleaning',
    title: 'طريقة تنظيف السيراميك والفواصل وإزالة الدهون والترسبات',
    metaDesc: 'خطوات تنظيف فواصل السيراميك والبورسلين وإزالة التكلسات الجيرية والدهون الصعبة. نصائح لحماية الرخام الطبيعي واحتياطات السلامة الكيميائية.',
    category: 'الأرضيات والأسطح',
    datePublished: '2026-10-22',
    readTime: '5 دقائق قراءة',
    image: '/assets/images/blog/tile-grout-cleaning.webp',
    contentHtml: `
      <p class="lead text-lg text-emerald-800 font-medium leading-relaxed">
        قد يكون بلاط الأرضيات جديداً وفخماً، لكن اسوداد فواصل الترويبة الأسمنتية وتراكم الدهون والتكلسات الجيرية عليها يُفقد الأرضية بريقها ويمنح المكان مظهراً قديماً ومهملاً. إليك الطريقة الصحيحة علمياً وعملياً لتنظيف الفواصل دون إتلاف لمعان البلاط.
      </p>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">1. التمييز بين أنواع البلاط قبل اختيار المنظف</h2>
      <p>
        أكبر خطأ يقع فيه الكثيرون هو استخدام منظف واحد لكافة أنواع الأرضيات:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li><strong>السيراميك والبورسلين المزجج:</strong> مواد صلبة وغير مسامية، تتحمل المنظفات الخفيفة ودرجات الفرك الميكانيكي.</li>
        <li><strong>الرخام الطبيعي والجرانيت والترافرتين:</strong> خامات كلسية حساسة جداً؛ أي احتكاك مع أحماض (مثل الفلاش أو حمض الهيدروكلوريك أو الخل المركز) يسبب تآكل لمعان الرخام ويترك بقعاً بيضاء باهتة لا تُعالج إلا بإعادة الجلي الكامل بالألماس.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">2. وصفة منزلية آمنة لتنظيف فواصل السيراميك</h2>
      <p>
        لتنظيف فواصل البلاط في الممرات والصالات بأمان:
      </p>
      <ol class="list-decimal pr-6 space-y-2">
        <li>اصنع عجينة متماسكة من <strong>بيكربونات الصوديوم وبضع قطرات من الماء</strong> وسائل تنظيف الصحون.</li>
        <li>وزع العجينة على خطوط الترويبة واتركها لمدة 15 دقيقة لتتغلغل في المسام الإسمنتية.</li>
        <li>استخدم فرشاة أسنان قديمة أو فرشاة فواصل ذات شعيرات نايلون متوسطة وافرك الخطوط بحركات طولية.</li>
        <li>امسح الأرضية بماء فاتر مضاف إليه قطرات من الزيت العطري لتجفيفها وإبراز نظافتها.</li>
      </ol>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">3. التعامل مع دهون المطبخ الصعبة وترسبات الحمام</h2>
      <p>
        تختلف طبيعة أوساخ المطبخ عن الحمام:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li><strong>في المطبخ (دهون عضوية):</strong> تحتاج إلى منظف ذي طبيعة قلوية (Alkaline Degreaser) يذيب الروابط الدهنية والشحوم العالقة بفواصل البلاط خلف الفرن.</li>
        <li><strong>في الحمام (أملاح وتكلسات معدنية):</strong> تنتج عن تبخر مياه جدة، وتتطلب مزيلات تكلسات متخصصة غير كاوية تزيل القشور البيضاء دون الإضرار بلمعان السيراميك.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">4. احتياطات السلامة الكيميائية الصارمة</h2>
      <p>
        نشدد دائماً على ضرورة ارتداء قفازات مطاطية أثناء التنظيف، وضمان تهوية المكان بفتح النوافذ وتشغيل الشفاطات، والامتناع التام عن خلط ماء الجافيل أو الكلور مع أي أحماض أو فلاش لتفادي انبعاث غازات خانقة.
      </p>

      <p class="pt-4">
        إذا كانت مساحة الأرضيات كبيرة أو كانت الترويبة بحاجة لماكينات جلي وتنظيف بالبخار، يسعدنا خدمتك عبر باقة <a href="/deep-cleaning/" class="text-teal-700 underline font-bold">التنظيف العميق</a> أو <a href="/kitchen-cleaning/" class="text-teal-700 underline font-bold">تنظيف المطابخ</a> من نضار.
      </p>
    `
  },

  'post-construction-cleaning-jeddah': {
    slug: 'post-construction-cleaning-jeddah',
    title: 'تنظيف المنزل بعد التشطيب بجدة: خطوات إزالة الغبار وبقايا البناء',
    metaDesc: 'خطوات تنظيف الفلل والشقق بعد التشطيب بجدة: إزالة غبار الجبس، التخلص من قطرات الدهان والإسمنت من الأرضيات والزجاج بأمان قبل الانتقال والسكن.',
    category: 'ما بعد التشطيب',
    datePublished: '2026-10-25',
    readTime: '6 دقائق قراءة',
    image: '/assets/images/blog/post-construction-cleaning.webp',
    contentHtml: `
      <p class="lead text-lg text-emerald-800 font-medium leading-relaxed">
        الوصول إلى نهاية مرحلة تشطيب الفيلا أو الشقة في جدة هو إنجاز مفرح، ولكن مواجهة العقار وهو مغطى بغبار الجبس الأبيض، ورذاذ الدهانات على النوافذ، وبقايا الترويبة والإسمنت على البورسلين قد تكون تجربة شاقة ومربكة إن لم تتبع منهجية منظمة خطوة بخطوة.
      </p>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">1. الترتيب الصحيح لمراحل تنظيف ما بعد التشطيب</h2>
      <p>
        أهم قاعدة في تنظيف ما بعد البناء هي: <strong>التنظيف الجاف دائماً يسبق التنظيف الرطب</strong>. البدء بصب الماء على غبار الجبس يحوله فوراً إلى معجون لزج يصعب إزالته ويسد مواسير الصرف الصحي.
      </p>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">2. خطوات إزالة الغبار الإنشائي الدقيق بأمان</h2>
      <ul class="list-disc pr-6 space-y-2">
        <li><strong>شفط الأسقف والجدران أولاً:</strong> استخدام ماكينات شفط مزودة بخراطيم طويلة ومكانس ذات شعيرات ناعمة لسحب الأتربة العالقة على دهان الجدران وحواف الكرانيش الجبسية.</li>
        <li><strong>تنظيف مجاري النوافذ والألمنيوم:</strong> شفط الرمل وبقايا الجبس من مجاري النوافذ قبل مسحها لتجنب خدش إطارات الألمنيوم.</li>
        <li><strong>تغطية فتحات التكييف:</strong> التأكد من إيقاف المكيفات أثناء مراحل التنظيف الجاف حتى لا تسحب المراوح غبار البناء إلى داخل الدكتات وفلاتر الهواء.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">3. إزالة بقايا الدهانات والإسمنت دون خدش الأسطح</h2>
      <div class="space-y-4">
        <div class="bg-ivory-100 p-5 rounded-xl border border-charcoal/5">
          <h3 class="font-bold text-emerald-800 text-base mb-1">الزجاج والنوافذ:</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            يُرش الزجاج بمحلول مائي رغوي ثم تُستخدم شفرة كشط مسطحة جديدة بزاوية 45 درجة بحذر شديد مع الحفاظ على ترطيب الزجاج باستمرار لمنع أي خدوش.
          </p>
        </div>

        <div class="bg-ivory-100 p-5 rounded-xl border border-charcoal/5">
          <h3 class="font-bold text-emerald-800 text-base mb-1">الأرضيات والبورسلين:</h3>
          <p class="text-sm text-muted-500 leading-relaxed">
            تُعالج بقع الدهانات المائية بقطعة قماش مبللة بماء دافئ، بينما تحتاج الدهانات الزيتية لمذيبات كحولية أو مخففات دهان مخصصة لا تؤثر على طبقة اللمعان.
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">4. التمييز بين التنظيف بعد التشطيب وإزالة الردم</h2>
      <p>
        يجب التمييز بوضوح بين أمرين:
      </p>
      <ul class="list-disc pr-6 space-y-2">
        <li><strong>إزالة المخلفات الإنشائية الكبرى:</strong> وهي مسؤولية مقاول البناء أو شركة الردم لإزالة الأكياس الثقيلة، القطع الخشبية، وكسر الرخام خارج المبنى.</li>
        <li><strong>التنظيف التخصصي الدقيق:</strong> وهو ما تقدمه نضار لتحويل المكان بعد خلوه من المخلفات الكبيرة إلى مسكن لامع، معقم، ومعطر وجاهز لفرش الأثاث والسكن مباشرة.</li>
      </ul>

      <h2 class="text-2xl font-bold text-emerald-800 mt-8 mb-4">5. الاستعداد قبل انتقال العائلة للمنزل</h2>
      <p>
        بعد الانتهاء من التنظيف وتلميع الأرضيات، يُنصح بتشغيل التكييف وتهوية المنزل لمدة 24 ساعة للتخلص من أي روائح دهانات جديدة قبل نقل غرف النوم والمفروشات.
      </p>
      <p>
        للحصول على خدمة تسليم متكاملة لمشروعك الجديد بجدة، اطلع على تفاصيل خدمة <a href="/post-construction-cleaning/" class="text-teal-700 underline font-bold">تنظيف ما بعد التشطيب</a> من نضار أو اطلب زيارة معاينة عبر <a href="/contact/" class="text-teal-700 underline font-bold">صفحة الاتصال</a>.
      </p>
    `
  }
};

function buildSingleBlogArticle(data) {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.metaDesc,
    "image": `${SITE_URL}${data.image}`,
    "datePublished": data.datePublished,
    "dateModified": data.datePublished,
    "author": {
      "@type": "Organization",
      "name": FULL_BRAND,
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": FULL_BRAND,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/assets/images/brand/logo.webp`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${data.slug}/`
    }
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "المدونة",
        "item": `${SITE_URL}/blog/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": data.title,
        "item": `${SITE_URL}/blog/${data.slug}/`
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
        <a href="/blog/" class="hover:text-teal-700 transition">المدونة</a>
        <span>/</span>
        <span class="text-emerald-800 font-bold line-clamp-1" aria-current="page">${data.title}</span>
      </nav>
    </div>
  </div>

  <!-- Article Header -->
  <header class="py-14 md:py-18 bg-gradient-to-b from-mint/40 to-ivory-100">
    <div class="container-custom max-w-4xl text-right space-y-4">
      <div class="flex items-center gap-3 text-xs text-muted-500">
        <span class="bg-mint text-teal-700 font-bold px-3 py-1 rounded-full border border-teal-700/20">${data.category}</span>
        <span>•</span>
        <span>${data.datePublished}</span>
        <span>•</span>
        <span>${data.readTime}</span>
      </div>

      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800 leading-tight">
        ${data.title}
      </h1>

      <p class="text-base md:text-lg text-muted-500 leading-relaxed">
        ${data.metaDesc}
      </p>
    </div>
  </header>

  <!-- Featured Image -->
  <div class="container-custom max-w-4xl -mt-6">
    <div class="rounded-3xl overflow-hidden shadow-card border-4 border-white aspect-[16/9]">
      <img src="${data.image}" alt="${data.title}" width="900" height="506" class="w-full h-full object-cover">
    </div>
  </div>

  <!-- Article Body Content -->
  <article class="py-16 bg-white">
    <div class="container-custom max-w-3xl text-right">
      <div class="prose prose-lg max-w-none text-charcoal space-y-6 leading-relaxed">
        ${data.contentHtml}
      </div>

      <!-- Author / Bio Box -->
      <div class="mt-12 p-6 rounded-2xl bg-ivory-100 border border-charcoal/10 flex items-center gap-4 text-right">
        <div class="w-14 h-14 rounded-full bg-mint flex items-center justify-center text-teal-700 flex-shrink-0 font-bold text-xl">
          ن
        </div>
        <div>
          <div class="font-extrabold text-emerald-800 text-base">فريق خبراء نضار للتنظيف بجدة</div>
          <div class="text-xs text-muted-500 mt-1">
            نشارككم خبراتنا الميدانية في العناية بالمنازل والمفروشات لضمان بيئة صحية نقية لأسرتكم في جدة.
          </div>
        </div>
      </div>

      <!-- Share / Action Bar -->
      <div class="mt-8 pt-6 border-t border-charcoal/10 flex flex-wrap items-center justify-between gap-4">
        <a href="/blog/" class="btn-outline text-xs">
          <span>&rarr; العودة لكافة المقالات</span>
        </a>
        <a href="/contact/" class="btn-primary text-xs">
          <span>طلب خدمة تنظيف احترافية</span>
        </a>
      </div>
    </div>
  </article>

  <!-- Recommended Articles -->
  <section class="py-16 bg-ivory-100 border-t border-charcoal/5">
    <div class="container-custom">
      <div class="text-right mb-8">
        <h2 class="text-2xl font-bold text-emerald-800">مقالات أخرى قد تهمك</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${blogList.filter(p => p.slug !== data.slug).slice(0, 3).map(post => `
          <div class="card-premium overflow-hidden text-right group">
            <div class="aspect-[16/10] overflow-hidden bg-ivory-200">
              <img src="${post.image}" alt="${post.title}" width="500" height="312" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-5 space-y-2">
              <span class="text-xs font-bold text-teal-700">${post.category}</span>
              <h3 class="font-bold text-emerald-800 text-sm group-hover:text-teal-700 transition line-clamp-2">
                <a href="/blog/${post.slug}/">${post.title}</a>
              </h3>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;

  const html = wrapPage({
    title: `${data.title} — مدونة نضار بجدة`,
    description: data.metaDesc,
    canonicalPath: `/blog/${data.slug}/`,
    schemaJson: [schemaJson, breadcrumbsSchema],
    content,
    heroPreload: data.image
  });

  writeHtml(`blog/${data.slug}/index.html`, html);
}

function run() {
  console.log('Building Blog Index and 5 Pillar Articles...');
  buildBlogIndexPage();
  for (const slug of Object.keys(articlesData)) {
    buildSingleBlogArticle(articlesData[slug]);
  }
  console.log('All Blog pages generated successfully!');
}

run();
