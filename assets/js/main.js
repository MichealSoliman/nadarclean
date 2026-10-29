/**
 * نضار للتنظيف بجدة — NADAR CLEANING
 * Core Vanilla JavaScript Module
 * Fully accessible, performance-optimized, zero framework dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initServicesDropdown();
  initAccordions();
  initBackToTop();
  initQuoteAndContactForms();
  highlightActiveNavLink();
});

/**
 * 1. Sticky Header with Elevation Effect
 */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-soft');
      header.classList.remove('bg-white');
    } else {
      header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-soft');
      header.classList.add('bg-white');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Mobile Menu (Drawer Navigation)
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    if (overlay) overlay.classList.remove('opacity-0', 'pointer-events-none');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    if (overlay) overlay.classList.add('opacity-0', 'pointer-events-none');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuBtn.focus();
    }
  });

  // Mobile submenu accordion
  const mobileSubmenuBtns = document.querySelectorAll('.mobile-submenu-toggle');
  mobileSubmenuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetMenu = document.getElementById(targetId);
      const icon = btn.querySelector('.chevron-icon');
      if (!targetMenu) return;

      const isOpen = !targetMenu.classList.contains('hidden');
      if (isOpen) {
        targetMenu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        targetMenu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

/**
 * 3. Desktop Services Dropdown Menu
 */
function initServicesDropdown() {
  const dropdownToggle = document.getElementById('services-dropdown-toggle');
  const dropdownMenu = document.getElementById('services-dropdown-menu');

  if (!dropdownToggle || !dropdownMenu) return;

  let timeoutId = null;

  function showDropdown() {
    clearTimeout(timeoutId);
    dropdownMenu.classList.remove('opacity-0', 'invisible', '-translate-y-2');
    dropdownMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
    dropdownToggle.setAttribute('aria-expanded', 'true');
  }

  function hideDropdown() {
    timeoutId = setTimeout(() => {
      dropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
      dropdownMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }, 150);
  }

  dropdownToggle.parentElement.addEventListener('mouseenter', showDropdown);
  dropdownToggle.parentElement.addEventListener('mouseleave', hideDropdown);

  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      hideDropdown();
    } else {
      showDropdown();
    }
  });

  // Keyboard navigation for dropdown
  dropdownToggle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showDropdown();
      const firstLink = dropdownMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownToggle.parentElement.contains(e.target)) {
      dropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
      dropdownMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * 4. Accessible Accordions (FAQ & Service steps)
 */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header');

  accordions.forEach((header) => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const icon = header.querySelector('.accordion-icon');

      // Check if we want single-open behavior within same accordion group
      const parentGroup = header.closest('.accordion-group');
      if (parentGroup && !isExpanded) {
        parentGroup.querySelectorAll('.accordion-header').forEach((otherHeader) => {
          if (otherHeader !== header) {
            otherHeader.setAttribute('aria-expanded', 'false');
            const otherContent = otherHeader.nextElementSibling;
            if (otherContent) otherContent.classList.remove('is-open');
            const otherIcon = otherHeader.querySelector('.accordion-icon');
            if (otherIcon) otherIcon.classList.remove('rotate-180');
          }
        });
      }

      if (isExpanded) {
        header.setAttribute('aria-expanded', 'false');
        content.classList.remove('is-open');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        header.setAttribute('aria-expanded', 'true');
        content.classList.add('is-open');
        if (icon) icon.classList.add('rotate-180');
      }
    });

    header.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

/**
 * 5. Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
    } else {
      backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
      backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 6. Active Nav Link Highlighter
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const navLinks = document.querySelectorAll('header nav a, #mobile-menu a');

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href')?.replace(/\/$/, '') || '';
    if (linkPath === currentPath) {
      link.classList.add('text-teal-700', 'font-bold');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/**
 * 7. Interactive Booking and Contact Form Handling
 * Adheres strictly to honesty: handles validation and seamlessly prepares
 * WhatsApp booking links or provides instructions for actual backend integration.
 */
function initQuoteAndContactForms() {
  const forms = document.querySelectorAll('.nadar-action-form');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="client_name"]');
      const phoneInput = form.querySelector('[name="client_phone"]');
      const serviceInput = form.querySelector('[name="service_type"]');
      const districtInput = form.querySelector('[name="district"]');
      const notesInput = form.querySelector('[name="notes"]');
      const statusBox = form.querySelector('.form-status-message');

      // Validation
      let isValid = true;
      let errorMsg = '';

      if (nameInput && !nameInput.value.trim()) {
        isValid = false;
        errorMsg = 'يرجى إدخال اسم العميل الكريم.';
        nameInput.focus();
      } else if (phoneInput) {
        const phone = phoneInput.value.trim().replace(/\s+/g, '');
        const saudiPhoneRegex = /^(05|5)\d{8}$/;
        if (!saudiPhoneRegex.test(phone)) {
          isValid = false;
          errorMsg = 'يرجى إدخال رقم جوال سعودي صحيح (مثال: 0501234567).';
          phoneInput.focus();
        }
      }

      if (!isValid) {
        if (statusBox) {
          statusBox.innerHTML = `
            <div class="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>${errorMsg}</span>
            </div>
          `;
          statusBox.classList.remove('hidden');
        }
        return;
      }

      // Format WhatsApp booking payload
      const clientName = nameInput ? nameInput.value.trim() : '';
      const clientPhone = phoneInput ? phoneInput.value.trim() : '';
      const serviceName = serviceInput ? serviceInput.value : 'طلب تسعير عام';
      const district = districtInput ? districtInput.value.trim() : 'جدة';
      const notes = notesInput ? notesInput.value.trim() : '';

      const waText = encodeURIComponent(
        `السلام عليكم ورحمة الله،\nأود الاستفسار عن خدمة لدى نضار للتنظيف بجدة:\n` +
        `• الاسم: ${clientName}\n` +
        `• الجوال: ${clientPhone}\n` +
        `• الخدمة المطلوبة: ${serviceName}\n` +
        `• الحي بجدة: ${district}\n` +
        (notes ? `• تفاصيل إضافية: ${notes}\n` : '') +
        `نأمل تزويدنا بتفاصيل الحجز والأسعار المتاحة. شكراً لكم!`
      );

      // WhatsApp redirection link (using standard Jeddah contact line)
      const waUrl = `https://wa.me/966500000000?text=${waText}`;

      if (statusBox) {
        statusBox.innerHTML = `
          <div class="p-4 bg-mint border border-teal-700/20 text-emerald-800 rounded-xl text-sm">
            <div class="font-bold flex items-center gap-2 mb-2">
              <svg class="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              تم تجهيز تفاصيل طلبك بنجاح!
            </div>
            <p class="mb-3 text-muted-500">
              لإتمام حجزك فوراً مع فريق خدمة عملاء نضار بجدة، يمكنك الانتقال مباشرة إلى الواتساب أو الاتصال بنا:
            </p>
            <div class="flex flex-wrap gap-2">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition">
                <span>إرسال الطلب عبر واتساب</span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              </a>
              <a href="tel:+966500000000" class="inline-flex items-center gap-2 px-4 py-2 bg-ivory-200 text-emerald-800 rounded-lg font-medium hover:bg-ivory-100 transition">
                <span>اتصال مباشر: 0500000000</span>
              </a>
            </div>
            <p class="text-xs text-muted-500 mt-2">ملاحظة للمالك: لتفعيل استقبال رسائل البريد الإلكتروني المباشر من النموذج، يرجى ربط الخدمة بنقطة نهاية API (مثل Formspree أو البريد المباشر للنطاق).</p>
          </div>
        `;
        statusBox.classList.remove('hidden');
      }
    });
  });
}
