/**
 * إعدادات وثوابت موقع شركة نضار للتنظيف بجدة — NADAR CLEANING
 * https://nadarclean.com
 *
 * المصدر الموحد الوحيد (Single Source of Truth) لجميع بيانات التواصل، الهوية، وساعات العمل
 * أي تعديل على هذه البيانات ينعكس تلقائياً على كامل صفحات وقوالب الموقع.
 */

const SITE_CONFIG = {
  siteUrl: 'https://nadarclean.com',
  brandName: 'نضار',
  fullBrand: 'نضار للتنظيف بجدة — NADAR CLEANING',

  // بيانات الاتصال الرسمية المعتمدة
  phoneDisplay: '0533553620',
  phoneInt: '+966533553620',
  telUrl: 'tel:+966533553620',
  whatsappBaseUrl: 'https://wa.me/966533553620',
  email: 'info@nadarclean.com',

  // النطاق الجغرافي والعنوان المعتمد
  city: 'جدة',
  location: 'جدة، المملكة العربية السعودية',
  addressNote: 'جدة، المملكة العربية السعودية (خدمة ميدانية متنقلة تغطي كافة الأحياء)',

  // أوقات العمل المعتمدة الموحدة
  workingHoursDisplay: 'السبت - الخميس: 8:00 ص - 10:00 م',
  workingDaysText: 'السبت–الخميس 8 ص إلى 10 م',
  openingHoursSchema: [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "08:00",
      "closes": "22:00"
    }
  ],

  // صورة الهيرو الرئيسية للموقع
  heroImagePath: '/assets/images/hero/logo.webp',
  heroImageAlt: 'شعار شركة نضار للتنظيف بجدة — NADAR CLEANING',

  /**
   * توليد رابط محادثة واتساب مباشر مع رسالة مسبقة التجهيز مرمزة
   * @param {string} [message] نص الرسالة المسبقة
   * @returns {string} رابط واتساب كامل
   */
  getWhatsAppUrl(message = '') {
    if (!message || !message.trim()) {
      return this.whatsappBaseUrl;
    }
    return `${this.whatsappBaseUrl}?text=${encodeURIComponent(message.trim())}`;
  }
};

module.exports = SITE_CONFIG;
