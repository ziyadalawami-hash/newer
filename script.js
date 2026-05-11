'use strict';

// =========================================================
// LANGUAGE
// =========================================================
let currentLang = 'en';

function getLanguageFromURL() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  return lang === 'ar' ? 'ar' : 'en';
}

function setURLLanguage(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
}

function applyLanguage(lang) {
  currentLang = lang;
  setURLLanguage(lang);

  const isRTL = lang === 'ar';
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

  // Update all [data-en] / [data-ar] elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });

  // Update input placeholders
  document.querySelectorAll('[data-placeholder-' + lang + ']').forEach(el => {
    const ph = el.getAttribute('data-placeholder-' + lang);
    if (ph) el.setAttribute('placeholder', ph);
  });

  // Show/hide bilingual project content
  document.querySelectorAll('.content-en').forEach(el => {
    el.style.display = lang === 'en' ? '' : 'none';
  });
  document.querySelectorAll('.content-ar').forEach(el => {
    el.style.display = lang === 'ar' ? '' : 'none';
  });

  // Update active lang button state
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('lang-active', btn.getAttribute('data-lang') === lang);
  });
}

// =========================================================
// SMOOTH SCROLL
// =========================================================
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetPosition, duration) {
  duration = duration || 800;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    window.scrollTo(0, startPosition + distance * ease);
    if (elapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 40;
  const rect = el.getBoundingClientRect();
  const offsetPosition = rect.top + window.pageYOffset - navHeight;
  smoothScrollTo(offsetPosition, 800);
}

// =========================================================
// NAVBAR SCROLL EFFECT
// =========================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// =========================================================
// NAV LINKS
// =========================================================
function initNavLinks() {
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-scroll');
      scrollToSection(targetId);
    });
  });

  // Back to top
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScrollTo(0, 800);
    });
  }

  // Explore button
  const exploreBtn = document.getElementById('explore-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function() {
      scrollToSection('projects');
    });
  }
}

// =========================================================
// LANGUAGE TOGGLE
// =========================================================
function initLanguage() {
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      if (lang) applyLanguage(lang);
    });
  });
}

// =========================================================
// PROJECT CARDS
// =========================================================
function closeAllCards() {
  document.querySelectorAll('.project-card.card-open').forEach(c => {
    const ov = c.querySelector('.card-overlay');
    if (ov) {
      ov.classList.remove('card-overlay-open');
      ov.classList.add('card-overlay-closed');
    }
    c.classList.remove('card-open');
  });
}

function initProjectCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    const front = card.querySelector('.card-front');
    const overlay = card.querySelector('.card-overlay');
    const closeBtn = card.querySelector('.overlay-close');

    function openCard() {
      closeAllCards();
      overlay.classList.remove('card-overlay-closed');
      overlay.classList.add('card-overlay-open');
      card.classList.add('card-open');
    }

    function closeCard() {
      overlay.classList.remove('card-overlay-open');
      overlay.classList.add('card-overlay-closed');
      card.classList.remove('card-open');
    }

    if (front) {
      front.addEventListener('click', function() {
        if (!card.classList.contains('card-open')) {
          openCard();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeCard();
      });
    }

    if (overlay) {
      overlay.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      });
    }
  });
}

// =========================================================
// CONTACT FORM
// =========================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  const submitSpan = submitBtn ? submitBtn.querySelector('span') : null;

  if (!form) return;

  // Clear buttons
  form.querySelectorAll('.clear-btn').forEach(btn => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (!input) return;

    input.addEventListener('input', function() {
      btn.style.display = this.value ? 'block' : 'none';
    });

    btn.addEventListener('click', function() {
      input.value = '';
      this.style.display = 'none';
      input.focus();
    });
  });

  function showStatus(type, msgEn, msgAr) {
    if (!statusEl) return;
    const msg = currentLang === 'ar' ? msgAr : msgEn;
    statusEl.innerHTML = '<div class="status-' + type + '">' + msg + '</div>';
    setTimeout(() => {
      if (statusEl) statusEl.innerHTML = '';
    }, 5000);
  }

  function setSubmitting(on) {
    if (!submitBtn) return;
    submitBtn.disabled = on;
    if (submitSpan) {
      submitSpan.textContent = on
        ? (currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...')
        : (currentLang === 'ar' ? 'إرسال الرسالة' : 'Send Message');
    }
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('inp-name').value.trim();
    const email = document.getElementById('inp-email').value.trim();
    const message = document.getElementById('inp-message').value.trim();

    if (!name || !email || !message) return;

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
      formData.append('_captcha', 'false');

      const response = await fetch('https://formsubmit.co/ziyad.ahmedalawami@gmail.com', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        showStatus('success', 'Message sent successfully!', 'تم إرسال الرسالة بنجاح!');
        document.getElementById('inp-name').value = '';
        document.getElementById('inp-email').value = '';
        document.getElementById('inp-message').value = '';
        // Hide all clear buttons
        form.querySelectorAll('.clear-btn').forEach(btn => {
          btn.style.display = 'none';
        });
      } else {
        showStatus('error', 'Failed to send message. Please try again.', 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      showStatus('error', 'Failed to send message. Please try again.', 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  });
}

// =========================================================
// CLIPBOARD COPY
// =========================================================
function initClipboard() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    const tooltip = btn.querySelector('.copy-tooltip');
    const text = btn.getAttribute('data-copy');

    btn.addEventListener('click', function() {
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        if (tooltip) {
          tooltip.classList.add('visible');
          setTimeout(() => tooltip.classList.remove('visible'), 2000);
        }
      }).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        if (tooltip) {
          tooltip.classList.add('visible');
          setTimeout(() => tooltip.classList.remove('visible'), 2000);
        }
      });
    });
  });
}

// =========================================================
// SET YEAR
// =========================================================
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// =========================================================
// FOCUS-CLICK RING
// =========================================================
function initFocusClick() {
  let lastInteractionWasClick = false;

  document.addEventListener('mousedown', function(e) {
    const el = e.target.closest('button, a');
    if (el) {
      document.querySelectorAll('.focus-click').forEach(item => {
        item.classList.remove('focus-click');
      });
      el.classList.add('focus-click');
      lastInteractionWasClick = true;
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      lastInteractionWasClick = false;
      document.querySelectorAll('.focus-click').forEach(el => {
        el.classList.remove('focus-click');
      });
    }
  });

  document.addEventListener('focusout', function(e) {
    const el = e.target.closest('button, a');
    if (el && lastInteractionWasClick) {
      setTimeout(() => {
        el.classList.remove('focus-click');
      }, 0);
    }
  }, true);
}

// =========================================================
// INIT
// =========================================================
document.addEventListener('DOMContentLoaded', function() {
  const lang = getLanguageFromURL();
  applyLanguage(lang);

  initNavbar();
  initNavLinks();
  initLanguage();
  initProjectCards();
  initContactForm();
  initClipboard();
  initYear();
  initFocusClick();
});
