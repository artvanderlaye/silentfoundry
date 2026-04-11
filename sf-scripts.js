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

