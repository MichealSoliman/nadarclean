const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
  // Hero
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    dest: 'assets/images/hero/logo.webp',
    description: 'صالة معيشة فاخرة ونظيفة ذات إضاءة طبيعية وأثاث مرتب بجدة'
  },
  {
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    dest: 'assets/images/hero/about.webp',
    description: 'أدوات ومعدات تنظيف احترافية متكاملة'
  },

  // Services
  {
    url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/house-cleaning.webp',
    description: 'تنظيف شامل للغرف والأسطح في المنازل'
  },
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/villa-cleaning.webp',
    description: 'فيلا حديثة وواسعة ذات تشطيبات راقية ونظافة متكاملة بجدة'
  },
  {
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/apartment-cleaning.webp',
    description: 'شقة سكنية عصرية مجهزة ومرتبة بالكامل'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/office-cleaning.webp',
    description: 'مكتب عمل عصري ونظيف ومساحات شركات مهيأة'
  },
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/steam-cleaning.webp',
    description: 'جهاز تنظيف احترافي بالبخار للتعقيم والتطهير'
  },
  {
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/sofa-cleaning.webp',
    description: 'كنب ومفروشات قماشية نظيفة وخالية من الأتربة والبقع'
  },
  {
    url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/carpet-cleaning.webp',
    description: 'تنظيف السجاد والموكيت بأحدث تقنيات إزالة العوالق'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/majlis-cleaning.webp',
    description: 'مجلس عربي فاخر ومفروشات تم تنظيفها بعناية'
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/kitchen-cleaning.webp',
    description: 'مطبخ نظيف وخالٍ من الدهون والترسبات'
  },
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/bathroom-cleaning.webp',
    description: 'حمام أنيق وأرضيات سيراميك لامعة ومعقمة'
  },
  {
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/post-construction-cleaning.webp',
    description: 'أرضيات زجاجية ورخامية لماعة بعد أعمال التشطيب'
  },
  {
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
    dest: 'assets/images/services/deep-cleaning.webp',
    description: 'تنظيف عميق وتفصيلي لكافة الزوايا والأسطح'
  },

  // Blog
  {
    url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
    dest: 'assets/images/blog/home-cleaning-guide.webp',
    description: 'دليل تنظيم وتنظيف المنزل خطوة بخطوة'
  },
  {
    url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    dest: 'assets/images/blog/sofa-cleaning.webp',
    description: 'طريقة الحفاظ على أقمشة الكنب وإزالة البقع'
  },
  {
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    dest: 'assets/images/blog/house-cleaning-prices.webp',
    description: 'معايير تسعير خدمات التنظيف المنزلي في جدة'
  },
  {
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    dest: 'assets/images/blog/tile-grout-cleaning.webp',
    description: 'تنظيف السيراميك وفواصل الترويبة وإزالة الدهون'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    dest: 'assets/images/blog/post-construction-cleaning.webp',
    description: 'إزالة الغبار وبقايا الدهانات ومواد البناء بعد التشطيب'
  }
];

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(__dirname, '..', dest);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(fullPath);
    const request = https.get(url, (response) => {
      // Handle redirects if any
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', (err) => {
          fs.unlink(fullPath, () => { });
          reject(err);
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    });

    request.on('error', (err) => {
      fs.unlink(fullPath, () => { });
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${images.length} verified commercial-use photos from Unsplash...`);
  for (const img of images) {
    try {
      console.log(`Downloading: ${img.dest}`);
      await downloadImage(img.url, img.dest);
    } catch (err) {
      console.error(`Failed to download ${img.dest}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

run();
