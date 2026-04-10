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
// IDENTITY SELECTOR — 16 slots, top bar only, single instance
// ══════════════════════════════════════════════════════════════

(function() {
  var IDENTITY_NAMES = {
    'isel-00': 'Original — Gold / Cream / Black',
    'isel-01': 'Monochrome — Pure Black / White',
    'isel-02': 'Steel — Cold Blue Metallic',
    'isel-03': 'Platinum — Near-White Precision',
    'isel-04': 'Void — White on Black, Zero Accent',
    'isel-05': 'Oxidised — Burnt Copper / Industrial',
    'isel-06': 'Atelier — Terracotta / Craft Serif',
    'isel-07': 'Lacquer — Deep Amber / Rich Dark',
    'isel-08': 'Abyss — Navy Ground / Gold Signal',
    'isel-09': 'Verdant — Slate Green / Ink',
    'isel-10': 'Blanche — Inverted / Pure White',
    'isel-m1': 'Marshall — Dark / Moody',
    'isel-m2': 'Marshall — Sepia / Heritage',
    'isel-m3': 'Marshall — Full Bleed Black',
    'isel-m4': 'Marshall — Blueprint / Technical',
    'isel-m5': 'Marshall — High Contrast / Inverted'
  };

  // All body classes managed by this system
  var ALL_CLASSES = Object.keys(IDENTITY_NAMES);

  function applyIdentity(id) {
    // Remove all identity classes from body
    ALL_CLASSES.forEach(function(cls) {
      document.body.classList.remove(cls);
    });

    // Apply new identity (00 = no class = original)
    if (id !== 'isel-00') {
      document.body.classList.add(id);
    }

    // Update active button state
    var buttons = document.querySelectorAll('.isel-btn');
    buttons.forEach(function(btn) {
      btn.classList.remove('isel-active');
      if (btn.getAttribute('data-id') === id) {
        btn.classList.add('isel-active');
      }
    });

    // Update name display
    var nameEl = document.getElementById('isel-name');
    if (nameEl) {
      nameEl.textContent = IDENTITY_NAMES[id] || '';
    }

    // Persist selection
    try { localStorage.setItem('sf-identity', id); } catch(e) {}
  }

  function initIdentitySelector() {
    var bar = document.getElementById('isel-bar');
    if (!bar) return;

    // Wire up all buttons
    var buttons = document.querySelectorAll('.isel-btn');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-id');
        if (id) applyIdentity(id);
      });
    });

    // Restore saved identity
    try {
      var saved = localStorage.getItem('sf-identity');
      if (saved && IDENTITY_NAMES[saved]) {
        applyIdentity(saved);
        return;
      }
    } catch(e) {}

    // Default: identity 00 (original)
    applyIdentity('isel-00');
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIdentitySelector);
  } else {
    initIdentitySelector();
  }

})();
// ══ END IDENTITY SELECTOR ══
