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
// MARSHALL SECTION SWITCHER
// 00 = original (no change). 01-15 = visual treatments on
// .case-study section only. SF site untouched throughout.
// Each treatment uses CSS filter, pseudo overlays, blend modes.
// ══════════════════════════════════════════════════════════════
(function () {

  // Noise SVG for grain effects — inline data URI
  var NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

  // Halftone dot pattern
  var HALFTONE = "radial-gradient(circle, #000 1px, transparent 1px)";

  // Scanline pattern
  var SCANLINES = "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)";

  // Blueprint grid
  var BLUEPRINT_GRID = "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(74,144,200,0.12) 39px,rgba(74,144,200,0.12) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(74,144,200,0.12) 39px,rgba(74,144,200,0.12) 40px)";

  var TREATMENTS = {
    0: null, // Original — no change

    // 01 — GREYSCALE
    // Full B&W. Every image, panel, text. Gold only lives in SF.
    1: {
      name: '01 — Greyscale',
      sectionFilter: 'grayscale(1)',
      overlay: null
    },

    // 02 — GREYSCALE + GRAIN
    // B&W with heavy noise texture. Raw, physical, tour poster.
    2: {
      name: '02 — Greyscale + Grain',
      sectionFilter: 'grayscale(1) contrast(1.1)',
      overlay: { bg: NOISE, opacity: '0.18', blendMode: 'multiply', size: '200px 200px' }
    },

    // 03 — GRAIN ONLY
    // Keeps gold colours, adds dense noise over everything.
    // Like a printed poster — tactile, imperfect.
    3: {
      name: '03 — Grain / Printed Poster',
      sectionFilter: 'contrast(1.05)',
      overlay: { bg: NOISE, opacity: '0.22', blendMode: 'overlay', size: '150px 150px' }
    },

    // 04 — HALFTONE / NEWSPRINT
    // High contrast B&W + dot pattern. Marshall as a newspaper story.
    4: {
      name: '04 — Halftone / Newsprint',
      sectionFilter: 'grayscale(1) contrast(1.4) brightness(1.1)',
      overlay: { bg: HALFTONE, opacity: '0.12', blendMode: 'multiply', size: '4px 4px' }
    },

    // 05 — SCANLINES
    // Horizontal line pattern. Old broadcast monitor / TV feel.
    5: {
      name: '05 — Scanlines / Broadcast',
      sectionFilter: 'contrast(1.1) brightness(0.9)',
      overlay: { bg: SCANLINES, opacity: '1', blendMode: 'normal', size: 'auto' }
    },

    // 06 — BLEACH BYPASS
    // High contrast, desaturated, crushed blacks. Cinematic film grade.
    6: {
      name: '06 — Bleach Bypass / Film',
      sectionFilter: 'saturate(0.3) contrast(1.6) brightness(0.85)',
      overlay: null
    },

    // 07 — OVEREXPOSED
    // Blown out, washed, faded. Like a photo left in the sun.
    7: {
      name: '07 — Overexposed / Washed',
      sectionFilter: 'saturate(0.4) brightness(1.6) contrast(0.7)',
      overlay: { bg: 'linear-gradient(rgba(255,255,255,0.18),rgba(255,255,255,0.18))', opacity: '1', blendMode: 'normal', size: 'auto' }
    },

    // 08 — DARK VAULT
    // Near-black cold background. Spotlight isolation. Presents
    // Marshall as a precious object in a case.
    8: {
      name: '08 — Dark Vault',
      sectionFilter: 'none',
      sectionBg: '#060606',
      contentFilter: 'brightness(0.6) contrast(1.2)',
      overlay: { bg: 'radial-gradient(ellipse at 50% 30%, transparent 30%, rgba(0,0,0,0.7) 100%)', opacity: '1', blendMode: 'multiply', size: 'auto' }
    },

    // 09 — WARM SPOTLIGHT
    // Dark background, warm vignette centre. Theatre lighting.
    9: {
      name: '09 — Warm Spotlight',
      sectionFilter: 'none',
      sectionBg: '#0a0600',
      contentFilter: 'brightness(0.75) sepia(0.2)',
      overlay: { bg: 'radial-gradient(ellipse at 50% 40%, rgba(200,140,60,0.08) 0%, rgba(0,0,0,0.75) 70%)', opacity: '1', blendMode: 'normal', size: 'auto' }
    },

    // 10 — MATTE BLACK
    // Flat dead black bg. Images barely visible. Text dominates.
    // Marshall stripped back to words alone.
    10: {
      name: '10 — Matte Black',
      sectionFilter: 'none',
      sectionBg: '#0a0a0a',
      contentFilter: 'brightness(0.35) contrast(1.1)',
      overlay: null
    },

    // 11 — SEPIA / HERITAGE
    // Full amber-brown wash. 1965 Marshall catalogue.
    11: {
      name: '11 — Sepia / Heritage',
      sectionFilter: 'sepia(0.9) contrast(1.1) brightness(0.9)',
      overlay: null
    },

    // 12 — CYANOTYPE
    // Blue photographic print. Cold archival. Like a contact sheet.
    12: {
      name: '12 — Cyanotype / Archival',
      sectionFilter: 'grayscale(1) brightness(0.9)',
      overlay: { bg: 'linear-gradient(rgba(20,60,120,0.55),rgba(20,60,120,0.55))', opacity: '1', blendMode: 'multiply', size: 'auto' }
    },

    // 13 — DUOTONE GOLD / BLACK
    // Images in two tones only — deep black + gold. Very graphic.
    13: {
      name: '13 — Duotone Gold/Black',
      sectionFilter: 'grayscale(1) contrast(1.2)',
      overlay: { bg: 'linear-gradient(rgba(180,130,50,0.5),rgba(180,130,50,0.5))', opacity: '1', blendMode: 'multiply', size: 'auto' }
    },

    // 14 — RED / BLACK DUOTONE
    // Dark red tint. Loud, electric, rock and roll.
    14: {
      name: '14 — Red/Black / Rock',
      sectionFilter: 'grayscale(1) contrast(1.3) brightness(0.8)',
      overlay: { bg: 'linear-gradient(rgba(160,20,20,0.6),rgba(160,20,20,0.6))', opacity: '1', blendMode: 'multiply', size: 'auto' }
    },

    // 15 — NEGATIVE / INVERT
    // Full CSS invert. Like looking at a film negative.
    // Maximum visual disruption — completely unlike SF.
    15: {
      name: '15 — Negative / Invert',
      sectionFilter: 'invert(1) hue-rotate(180deg)',
      overlay: null
    }
  };

  var NAMES = {
    0: '00 — Original',
    1: '01 — Greyscale', 2: '02 — Greyscale + Grain', 3: '03 — Grain / Poster',
    4: '04 — Halftone / Newsprint', 5: '05 — Scanlines / Broadcast',
    6: '06 — Bleach Bypass / Film', 7: '07 — Overexposed / Washed',
    8: '08 — Dark Vault', 9: '09 — Warm Spotlight', 10: '10 — Matte Black',
    11: '11 — Sepia / Heritage', 12: '12 — Cyanotype / Archival',
    13: '13 — Duotone Gold/Black', 14: '14 — Red/Black / Rock',
    15: '15 — Negative / Invert'
  };

  // ── OVERLAY ELEMENT ──
  // Single pseudo-overlay div injected inside .case-study
  var overlayEl = null;

  function getOrCreateOverlay() {
    if (!overlayEl) {
      overlayEl = document.createElement('div');
      overlayEl.id = 'marshall-overlay';
      overlayEl.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:10;';
      var cs = document.querySelector('.case-study');
      if (cs) {
        if (getComputedStyle(cs).position === 'static') cs.style.position = 'relative';
        cs.appendChild(overlayEl);
      }
    }
    return overlayEl;
  }

  // ── STYLE BLOCK ──
  var styleEl = null;

  function applyTreatment(id) {
    var t = TREATMENTS[id];

    // Remove previous style block
    var old = document.getElementById('marshall-style');
    if (old) old.parentNode.removeChild(old);

    // Hide overlay
    var ov = document.getElementById('marshall-overlay');
    if (ov) ov.style.opacity = '0';

    // Reset case-study
    var cs = document.querySelector('.case-study');
    if (!cs) return;
    cs.style.filter = '';
    cs.style.background = '';

    if (!t) {
      // Original — fully reset
      updateBar(id);
      return;
    }

    // Build CSS
    var css = '';

    // Section-level filter
    if (t.sectionFilter && t.sectionFilter !== 'none') {
      css += '.case-study { filter:' + t.sectionFilter + ' !important; }\n';
    }

    // Section background override
    if (t.sectionBg) {
      css += '.case-study { background:' + t.sectionBg + ' !important; }\n';
    }

    // Content filter (for vault/spotlight — dims images without grey overlay)
    if (t.contentFilter) {
      css += '.case-study .mc-hero img { filter:' + t.contentFilter + ' !important; }\n';
      css += '.case-study img[style*="aspect-ratio:1/1"] { filter:' + t.contentFilter + ' !important; }\n';
      css += '.case-study img[style*="aspect-ratio:16/6"] { filter:' + t.contentFilter + ' !important; }\n';
    }

    // Inject style
    styleEl = document.createElement('style');
    styleEl.id = 'marshall-style';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // Overlay
    if (t.overlay) {
      var ov2 = getOrCreateOverlay();
      ov2.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:10;' +
        'background:' + t.overlay.bg + ';' +
        'background-size:' + (t.overlay.size || 'auto') + ';' +
        'opacity:' + t.overlay.opacity + ';' +
        'mix-blend-mode:' + t.overlay.blendMode + ';';
    }

    updateBar(id);
    try { localStorage.setItem('marshall-treatment', id); } catch(e) {}
  }

  function updateBar(id) {
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      var bid = parseInt(btn.getAttribute('data-id'));
      btn.className = btn.className.replace(/\bisel-active\b/g, '').trim();
      if (bid === id) btn.className += ' isel-active';
    }
    var nameEl = document.getElementById('isel-name');
    if (nameEl) nameEl.textContent = NAMES[id] || '';
  }

  // ── INIT ──
  function init() {
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          var id = parseInt(btn.getAttribute('data-id'));
          if (!isNaN(id)) applyTreatment(id);
        });
      })(btns[i]);
    }

    // Restore saved
    try {
      var saved = localStorage.getItem('marshall-treatment');
      if (saved !== null) {
        var id = parseInt(saved);
        if (!isNaN(id) && TREATMENTS.hasOwnProperty(id)) { applyTreatment(id); return; }
      }
    } catch(e) {}

    applyTreatment(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
// ══ END MARSHALL SWITCHER ══
