// ── SCROLL REVEAL ──
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

revealElements.forEach(el => {
  el.style.opacity = '1';
  el.style.transform = 'none';
});

if ('IntersectionObserver' in window) {
  revealElements.forEach(el => {
    el.style.opacity = '';
    el.style.transform = '';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// ── MOBILE MENU ──
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── NAV SCROLL FADE ──
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
}, { passive: true });

// ── HERO HEADLINE FIT ──
// Stretches top line to match bottom line width exactly
function fitHeadline() {
  const top = document.querySelector('.hero-headline-top');
  const bot = document.querySelector('.hero-headline-bottom');
  if (!top || !bot) return;

  // Temporarily set inline-block to get true text width (not container width)
  top.style.transform = 'none';
  top.style.display = 'inline-block';
  bot.style.display = 'inline-block';

  const topW = top.getBoundingClientRect().width;
  const botW = bot.getBoundingClientRect().width;

  // Restore block display then apply scale
  top.style.display = 'block';
  bot.style.display = 'block';

  if (topW === 0 || botW === 0) return;

  top.style.transform = `scaleX(${botW / topW})`;
  top.style.transformOrigin = 'left top';
}

document.fonts.ready.then(fitHeadline);
window.addEventListener('resize', fitHeadline);


// ══════════════════════════════════════════════════════════════
// MARSHALL IMAGE FILTER SWITCHER
// Images only — hero image + 4 bottom product images.
// Text sections completely untouched throughout.
// ══════════════════════════════════════════════════════════════
(function () {

  // 10 filter treatments — saturation/brightness/contrast shifts
  // 00 = original unchanged
  var FILTERS = {
    0:  { name: '00 — Original',              f: null },
    1:  { name: '01 — Desaturated',           f: 'saturate(0.35) brightness(0.92)' },
    2:  { name: '02 — Half Muted',            f: 'saturate(0.5) contrast(1.1) brightness(0.88)' },
    3:  { name: '03 — Full B&W',              f: 'grayscale(1)' },
    4:  { name: '04 — B&W High Contrast',     f: 'grayscale(1) contrast(1.45) brightness(0.9)' },
    5:  { name: '05 — Muted Warm',            f: 'saturate(0.45) brightness(0.95) sepia(0.15)' },
    6:  { name: '06 — Cool Grey',             f: 'grayscale(0.75) brightness(0.88) hue-rotate(185deg)' },
    7:  { name: '07 — Faded',                 f: 'saturate(0.3) brightness(1.15) contrast(0.75)' },
    8:  { name: '08 — Deep Muted',            f: 'saturate(0.25) brightness(0.78) contrast(1.2)' },
    9:  { name: '09 — Bleach',                f: 'saturate(0.15) contrast(1.5) brightness(0.88)' },
    10: { name: '10 — Sepia Light',           f: 'sepia(0.55) brightness(0.92) contrast(1.05)' }
  };

  var styleEl = null;

  function apply(id) {
    // Remove previous
    var old = document.getElementById('m-filter');
    if (old) old.parentNode.removeChild(old);

    var t = FILTERS[id];
    if (!t) return;

    if (t.f) {
      styleEl = document.createElement('style');
      styleEl.id = 'm-filter';
      // Target hero image and all 4 bottom product images in .case-study
      styleEl.textContent =
        '.case-study .mc-hero img { filter:' + t.f + ' !important; }\n' +
        '.case-study img[style*="aspect-ratio:1/1"] { filter:' + t.f + ' !important; }\n' +
        '.case-study img[style*="aspect-ratio:16/6"] { filter:' + t.f + ' !important; }';
      document.head.appendChild(styleEl);
    }

    // Update bar
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].className = btns[i].className.replace(/\bisel-active\b/g, '').trim();
      if (parseInt(btns[i].getAttribute('data-id')) === id) {
        btns[i].className += ' isel-active';
      }
    }
    var nameEl = document.getElementById('isel-name');
    if (nameEl) nameEl.textContent = t.name;

    try { localStorage.setItem('m-filter', id); } catch(e) {}
  }

  function init() {
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          apply(parseInt(btn.getAttribute('data-id')));
        });
      })(btns[i]);
    }
    // Restore saved or default to 0
    try {
      var saved = localStorage.getItem('m-filter');
      if (saved !== null && FILTERS[parseInt(saved)]) { apply(parseInt(saved)); return; }
    } catch(e) {}
    apply(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
// ══ END MARSHALL IMAGE FILTER SWITCHER ══
