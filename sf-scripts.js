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


(function () {

  var originalHTML = null;

  var D = {
    heroImg: 'images-1.jpeg',
    eyebrow: 'Case Study \u2014 Marshall DNA Translation',
    title: 'Rock &amp; Roll<br/>Never Dies.',
    body: "By 2010, Marshall\u2019s core market was shrinking. The brand still had strong equity, but the legacy guitar amplifier category was no longer enough.",
    translation: 'Marshall moved beyond amplifiers into headphones, speakers, and home audio. This was not merch or logo licensing. It was real product-level DNA translation into a larger category.',
    dna: [
      { k: 'Tactile', v: 'Pebbled tolex amp texture' },
      { k: 'Physical', v: 'Weighted brass knobs and metal controls' },
      { k: 'Mechanical', v: 'Toggle-click switch' },
      { k: 'Acoustic', v: 'The sound was tuned to feel recognisably Marshall' },
      { k: 'Intangible', v: 'The speakers kept the original stage presence' },
      { k: 'CMF', v: 'Colour, material, and finish were applied consistently' }
    ],
    result: 'Marshall expanded into a much larger category without losing what made the brand distinctive. Stronger relevance in China. A $1.1B acquisition in early 2025.',
    metrics: [
      { val: '1962', lbl: 'Founded' },
      { val: '60+', lbl: 'Years of Heritage' },
      { val: '$4B+', lbl: 'Expanded Market' },
      { val: '$1.1B', lbl: 'Acquired in 2025' }
    ],
    imgs: {
      amp:       'amp_marshall_original.jpeg',
      headphone: '614BCLPutVL-1__SL1000_.jpg',
      acton:     'MarshallActonIIIBluetoothSpeakers_6_jpg.webp',
      bluetooth: 'marshall-bluetooth-speakers-buying-guide-blog-header_jpg.avif'
    }
  };

  var BN = "'Bebas Neue',sans-serif";
  var DS = "'DM Sans',sans-serif";
  var BODY_SIZE = 'clamp(0.9rem,1.2vw,1.05rem)';

  var FORMATS = {
    3: { name: '03 \u2014 Dossier', build: function() {
      var css = [
        /* flat cream background */
        '.csw { background-color:#e8e2d9; position:relative; }',
        '.csw::before { content:none; }',
        '.cs-dbody { position:relative; z-index:1; display:grid; grid-template-columns:1fr 380px; align-items:stretch; }',
        '.cs-dleft { padding:32px 40px; display:flex; flex-direction:column; justify-content:center; }',
        '.cs-dright { overflow:hidden; }',
        '.cs-dsec { padding-bottom:20px; margin-bottom:20px; border-bottom:1px solid rgba(138,110,58,0.15); }',
        '.cs-dsec:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }',
        '.cs-drow-gap { display:grid; grid-template-columns:1fr 1fr; gap:3px; height:100%; }',
        '.cs-dslabel { font-family:'+DS+'; font-size:.48rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(10,10,10,.38); font-weight:300; display:block; margin-bottom:10px; }',
        '.cs-dey { font-family:'+DS+'; font-size:.48rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(10,10,10,.38); font-weight:300; display:block; margin-bottom:6px; }',
        '.cs-dh  { font-family:'+BN+'; font-size:clamp(2.2rem,3.5vw,4rem); letter-spacing:.08em; text-transform:uppercase; color:rgba(10,10,10,.78); line-height:.92; margin-bottom:12px; }',
        '.cs-dp  { font-family:'+DS+'; font-size:'+BODY_SIZE+'; line-height:1.85; color:rgba(10,10,10,.55); font-weight:300; }',
        '.cs-dmets { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }',
        '.cs-dmet  { padding-right:16px; margin-right:16px; border-right:1px solid rgba(10,10,10,.1); }',
        '.cs-dmet:last-child { border-right:none; padding-right:0; margin-right:0; }',
        '.cs-dmetv { font-family:'+BN+'; font-size:1.4rem; letter-spacing:.06em; color:rgba(10,10,10,.72); display:block; line-height:1; }',
        '.cs-dmetl { font-family:'+DS+'; font-size:.4rem; letter-spacing:.14em; text-transform:uppercase; color:rgba(10,10,10,.32); display:block; margin-top:2px; font-weight:300; }',
        '.cs-ddna { display:grid; grid-template-columns:1fr 1fr; gap:8px 24px; }',
        '.cs-ddna-k { font-family:'+DS+'; font-size:.44rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(10,10,10,.38); font-weight:300; display:block; margin-bottom:2px; }',
        '.cs-ddna-v { font-family:'+DS+'; font-size:'+BODY_SIZE+'; color:rgba(10,10,10,.55); font-weight:300; line-height:1.5; }',
        '.cs-dside { display:flex; flex-direction:column; }',
        '.cs-dside-hero { width:100%; object-fit:cover; display:block; filter:brightness(.84) saturate(.88); flex-shrink:0; }',
        '.cs-dside-mid { display:grid; grid-template-columns:1fr 1fr; gap:3px; margin-top:3px; flex-shrink:0; }',
        '.cs-dside-mid img { width:100%; aspect-ratio:1/1; object-fit:cover; display:block; filter:brightness(.8) saturate(.82); }',
        '.cs-dside-result { width:100%; flex:1; min-height:120px; object-fit:cover; display:block; filter:brightness(.82) saturate(.85); margin-top:3px; }',
        '@media(max-width:768px){',
        '  .cs-dbody { grid-template-columns:1fr; }',
        '  .cs-dleft { padding:28px 24px; }',
        '  .cs-dright { display:none; }',
        '  .cs-dright.cs-mobile-show { display:block; }',
        '  .cs-dright.cs-mobile-show img { width:100%; aspect-ratio:16/9; object-fit:cover; display:block; }',
        '  .cs-dmets { grid-template-columns:repeat(2,1fr); gap:12px 0; }',
        '  .cs-ddna { grid-template-columns:1fr; }',
        '}'
      ].join('\n');

      /* top section boundary divider — outside grid */
      var dividerTop = '<div style="width:100%;height:1px;background:rgba(138,110,58,0.18);"></div>';
      var dividerBottom = '<div style="width:100%;height:1px;background:rgba(138,110,58,0.18);"></div>';

      var html = '<section class="case-study csw">'
        + dividerTop

        /* grid starts here */
        + '<div class="cs-dbody">'

        /* ROW 1: Situation + Numbers | Amp image */
        + '<div class="cs-dleft">'
        +   '<div class="cs-dsec">'
        +     '<span class="cs-dey">'+D.eyebrow+'</span>'
        +     '<div class="cs-dh">'+D.title+'</div>'
        +     '<p class="cs-dp">'+D.body+'</p>'
        +   '</div>'
        +   '<div class="cs-dsec" style="margin-top:4px;">'
        +     '<span class="cs-dslabel">Key Numbers</span>'
        +     '<div class="cs-dmets">'
        + D.metrics.map(function(m){ return '<div class="cs-dmet"><span class="cs-dmetv">'+m.val+'</span><span class="cs-dmetl">'+m.lbl+'</span></div>'; }).join('')
        +     '</div>'
        +   '</div>'
        + '</div>'
        + '<div class="cs-dright" style="height:auto;">'
        +   '<img src="'+D.imgs.amp+'" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.84) saturate(.88);" alt=""/>'
        + '</div>'

        /* row divider — left column line only, right side gap */
        + '<div style="padding:0 40px;border-top:1px solid rgba(138,110,58,0.15);"></div>'
        + '<div style="height:3px;background:#e8e2d9;"></div>'

        /* ROW 2: Brand DNA | 2-up images */
        + '<div class="cs-dleft">'
        +   '<div class="cs-dsec">'
        +     '<span class="cs-dslabel">Brand DNA</span>'
        +     '<div class="cs-ddna">'
        + D.dna.map(function(d){ return '<div><span class="cs-ddna-k">'+d.k+'</span><span class="cs-ddna-v">'+d.v+'</span></div>'; }).join('')
        +     '</div>'
        +   '</div>'
        + '</div>'
        + '<div class="cs-dright">'
        +   '<div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;height:100%;">'
        +     '<img src="'+D.imgs.headphone+'" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.8) saturate(.82);" alt=""/>'
        +     '<img src="'+D.imgs.acton+'" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.8) saturate(.82);" alt=""/>'
        +   '</div>'
        + '</div>'

        /* row divider */
        + '<div style="padding:0 40px;border-top:1px solid rgba(138,110,58,0.15);"></div>'
        + '<div style="height:3px;background:#e8e2d9;"></div>'

        /* ROW 3: Translation + Result | Bluetooth image (shown on mobile too) */
        + '<div class="cs-dleft">'
        +   '<div class="cs-dsec">'
        +     '<span class="cs-dslabel">Translation</span>'
        +     '<p class="cs-dp">'+D.translation+'</p>'
        +   '</div>'
        +   '<div style="margin-top:4px;">'
        +     '<span class="cs-dslabel">The Result</span>'
        +     '<p class="cs-dp">'+D.result+'</p>'
        +   '</div>'
        + '</div>'
        + '<div class="cs-dright cs-mobile-show">'
        +   '<img src="'+D.imgs.bluetooth+'" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.82) saturate(.85);" alt=""/>'
        + '</div>'

        + '</div>' /* end cs-dbody */
        + dividerBottom
        + '</section>';

      return { css: css, html: html };
    }}
  };

  function apply() {
    var cs = document.querySelector('.case-study');
    if (!cs) return;
    if (originalHTML === null) originalHTML = cs.outerHTML;
    var old = document.getElementById('cs-style');
    if (old) old.parentNode.removeChild(old);
    var built = FORMATS[3].build();
    var t = document.createElement('div');
    t.innerHTML = built.html;
    cs.parentNode.replaceChild(t.firstChild, cs);
    var s = document.createElement('style');
    s.id = 'cs-style';
    s.textContent = built.css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else { apply(); }

})();
// ══ END CASE STUDY FORMAT SWITCHER ══
