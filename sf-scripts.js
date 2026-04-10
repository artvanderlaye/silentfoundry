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

  var FORMATS = {
    0: { name: '00 \u2014 Original', build: null },

    3: { name: '03 \u2014 Dossier / Investment Memo', build: function() {
      var css = [
        /* outer — matches site padding */
        '.csw { background:#f4f2ee; padding:64px 48px; }',

        /* two-col body — left content + right sidebar, stretch to same height */
        '.cs-dbody { display:grid; grid-template-columns:1fr 380px; align-items:stretch; }',

        /* left — gold right border = visual continuity line */
        '.cs-dmain { padding-right:48px; border-right:2px solid rgba(138,110,58,.22); display:flex; flex-direction:column; }',

        /* sections */
        '.cs-dsec { padding-bottom:28px; margin-bottom:28px; border-bottom:1px solid rgba(10,10,10,.07); }',
        '.cs-dsec:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }',

        /* section labels — dark ink, no gold */
        '.cs-dslabel { font-family:'+DS+'; font-size:.48rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(10,10,10,.38); font-weight:300; display:block; margin-bottom:10px; }',

        /* overview */
        '.cs-dey { font-family:'+DS+'; font-size:.48rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(10,10,10,.38); font-weight:300; display:block; margin-bottom:6px; }',
        '.cs-dh  { font-family:'+BN+'; font-size:clamp(2.2rem,3.5vw,4rem); letter-spacing:.08em; text-transform:uppercase; color:rgba(10,10,10,.78); line-height:.92; margin-bottom:12px; }',
        '.cs-dp  { font-family:'+DS+'; font-size:.92rem; line-height:1.85; color:rgba(10,10,10,.48); font-weight:300; }',

        /* key numbers — horizontal, compact, dark ink */
        '.cs-dmets { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }',
        '.cs-dmet  { padding-right:16px; margin-right:16px; border-right:1px solid rgba(10,10,10,.1); }',
        '.cs-dmet:last-child { border-right:none; padding-right:0; margin-right:0; }',
        '.cs-dmetv { font-family:'+BN+'; font-size:1.4rem; letter-spacing:.06em; color:rgba(10,10,10,.72); display:block; line-height:1; }',
        '.cs-dmetl { font-family:'+DS+'; font-size:.4rem; letter-spacing:.14em; text-transform:uppercase; color:rgba(10,10,10,.32); display:block; margin-top:2px; font-weight:300; }',

        /* brand dna — dark ink */
        '.cs-ddna { display:grid; grid-template-columns:1fr 1fr; gap:8px 24px; }',
        '.cs-ddna-k { font-family:'+DS+'; font-size:.44rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(10,10,10,.38); font-weight:300; display:block; margin-bottom:2px; }',
        '.cs-ddna-v { font-family:'+DS+'; font-size:.88rem; color:rgba(10,10,10,.52); font-weight:300; line-height:1.5; }',

        /* right sidebar — fills full column height */
        '.cs-dside { display:flex; flex-direction:column; padding-left:0; }',

        /* each image row aligns with a content section via flex */
        /* hero — aligns with overview (eyebrow + title) */
        '.cs-dside-hero { width:100%; object-fit:cover; display:block; filter:brightness(.84) saturate(.88); flex-shrink:0; }',

        /* mid — aligns with translation section */
        '.cs-dside-mid { display:grid; grid-template-columns:1fr 1fr; gap:3px; margin-top:3px; flex-shrink:0; }',
        '.cs-dside-mid img { width:100%; aspect-ratio:1/1; object-fit:cover; display:block; filter:brightness(.8) saturate(.82); }',

        /* result — fills remaining height, aligns with The Result */
        '.cs-dside-result { width:100%; flex:1; min-height:120px; object-fit:cover; display:block; filter:brightness(.82) saturate(.85); margin-top:3px; }'
      ].join('\n');

      var html = '<section class="case-study csw">'
        + '<div class="cs-dbody">'

        /* left */
        +   '<div class="cs-dmain">'

        /* overview — eyebrow aligns with top of hero image */
        +     '<div class="cs-dsec">'
        +       '<span class="cs-dey">'+D.eyebrow+'</span>'
        +       '<div class="cs-dh">'+D.title+'</div>'
        +       '<p class="cs-dp">'+D.body+'</p>'
        +     '</div>'

        /* key numbers */
        +     '<div class="cs-dsec">'
        +       '<span class="cs-dslabel">Key Numbers</span>'
        +       '<div class="cs-dmets">'
        + D.metrics.map(function(m){ return '<div class="cs-dmet"><span class="cs-dmetv">'+m.val+'</span><span class="cs-dmetl">'+m.lbl+'</span></div>'; }).join('')
        +       '</div>'
        +     '</div>'

        /* translation — aligns with 2 product images */
        +     '<div class="cs-dsec">'
        +       '<span class="cs-dslabel">Translation</span>'
        +       '<p class="cs-dp">'+D.translation+'</p>'
        +     '</div>'

        /* brand dna */
        +     '<div class="cs-dsec">'
        +       '<span class="cs-dslabel">Brand DNA</span>'
        +       '<div class="cs-ddna">'
        + D.dna.map(function(d){ return '<div><span class="cs-ddna-k">'+d.k+'</span><span class="cs-ddna-v">'+d.v+'</span></div>'; }).join('')
        +       '</div>'
        +     '</div>'

        /* the result — aligns with bluetooth image */
        +     '<div class="cs-dsec">'
        +       '<span class="cs-dslabel">The Result</span>'
        +       '<p class="cs-dp">'+D.result+'</p>'
        +     '</div>'

        +   '</div>'

        /* right sidebar: origin → translation → result */
        +   '<div class="cs-dside">'
        +     '<img class="cs-dside-hero" src="'+D.imgs.amp+'" style="aspect-ratio:3/2" alt=""/>'
        +     '<div class="cs-dside-mid">'
        +       '<img src="'+D.imgs.headphone+'" alt=""/>'
        +       '<img src="'+D.imgs.acton+'" alt=""/>'
        +     '</div>'
        +     '<img class="cs-dside-result" src="'+D.imgs.bluetooth+'" alt=""/>'
        +   '</div>'

        + '</div>'
        + '</section>';

      return { css: css, html: html };
    }}
  };

  function apply(id) {
    var f = FORMATS[id];
    if (!f) return;
    var cs = document.querySelector('.case-study');
    if (!cs) return;
    if (originalHTML === null) originalHTML = cs.outerHTML;
    var old = document.getElementById('cs-style');
    if (old) old.parentNode.removeChild(old);
    if (id === 0) {
      var t = document.createElement('div');
      t.innerHTML = originalHTML;
      cs.parentNode.replaceChild(t.firstChild, cs);
    } else {
      var built = f.build();
      var t2 = document.createElement('div');
      t2.innerHTML = built.html;
      cs.parentNode.replaceChild(t2.firstChild, cs);
      var s = document.createElement('style');
      s.id = 'cs-style';
      s.textContent = built.css;
      document.head.appendChild(s);
    }
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].className = btns[i].className.replace(/\bisel-active\b/g,'').trim();
      if (parseInt(btns[i].getAttribute('data-id')) === id) btns[i].className += ' isel-active';
    }
    var n = document.getElementById('isel-name');
    if (n && FORMATS[id]) n.textContent = FORMATS[id].name;
    try { localStorage.setItem('cs-format', id); } catch(e) {}
  }

  function init() {
    var cs = document.querySelector('.case-study');
    if (cs) originalHTML = cs.outerHTML;
    var btns = document.querySelectorAll('.isel-btn');
    for (var i = 0; i < btns.length; i++) {
      (function(btn){
        btn.addEventListener('click', function(){ apply(parseInt(btn.getAttribute('data-id'))); });
      })(btns[i]);
    }
    try {
      var saved = localStorage.getItem('cs-format');
      if (saved !== null && FORMATS[parseInt(saved)]) { apply(parseInt(saved)); return; }
    } catch(e) {}
    apply(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

})();
// ══ END CASE STUDY FORMAT SWITCHER ══
