/* ============================================================
   MARSHALL — option 4, production candidate.

   1  The body is contained to the 48px page margin below 1601, the
      way the video and VENTURE MODELS already are. .cs-row-left's
      own 48px horizontal padding is zeroed at the same time, so the
      width comes off the IMAGE and the drawing keeps its size.

   2  The image column: 380px where there is room, proportional
      below. A FIXED 380 starves the left column between 1100 and
      768 and the graphic collides — measured at 1.9px clearance at
      1024. clamp(240,30vw,380) holds 380 down to 1266 and scales
      from there.

   3  The right column ran 28px past ACQUIRED IN 2025 — exactly the
      bottom padding on the third .cs-row-left. Zeroed on that row
      only, so the picture and the stats now finish together.

   4  MOBILE. The old build wrote the flattened geometry as INLINE
      styles, which survive below 768 and fight the mobile two-column
      grid — that is the cramping. The geometry is now applied only
      at 769 and up, and fully restored below, so the phone layout is
      the untouched original.
   ============================================================ */
(function(){
 var DM="'DM Sans',sans-serif";
 var dial=null, ORIG=null, HUB0=null, applied=false;
 var G={W:760,H:360,k:0.82,sx:1.10,hx:19,hub:130};

 function grab(){
  dial=document.querySelector('#sfsec-dna .dl-dial');
  if(!dial)return false;
  var pts=dial.querySelectorAll('.dl-dpt'); if(pts.length<8)return false;
  if(!ORIG){
   ORIG={ dial:{ar:dial.style.aspectRatio,mw:dial.style.maxWidth,h:dial.style.height,
                mh:dial.style.minHeight,mg:dial.style.margin,w:dial.style.width},
          pts:[].map.call(pts,function(e){
           return {l:e.style.left,t:e.style.top,
                   dw:e.children[0]?e.children[0].style.width:null,
                   dh:e.children[0]?e.children[0].style.height:null};}),
          lines:[].map.call(dial.querySelectorAll('.dl-lk'),function(L){
           return {l:L.style.left,t:L.style.top,w:L.style.width,tr:L.style.transform};}) };
   var hub=dial.querySelector('.dl-dhub');
   ORIG.hub={w:hub.style.width,h:hub.style.height,l:hub.style.left,t:hub.style.top};
   HUB0={l:parseFloat(hub.style.left),t:parseFloat(hub.style.top)};
   var nm0=dial.querySelector('.dl-nm');
   ORIG.fs=nm0?(parseFloat(getComputedStyle(nm0).fontSize)||13):13;
   ORIG.num={l:[].map.call(pts,function(e){return parseFloat(e.style.left);}),
             t:[].map.call(pts,function(e){return parseFloat(e.style.top);}),
             w:[].map.call(pts,function(e){return e.children[0]?parseFloat(e.children[0].style.width):0;})};
  }
  return true;
 }

 function restore(){
  var d=ORIG.dial;
  dial.style.aspectRatio=d.ar; dial.style.maxWidth=d.mw; dial.style.height=d.h;
  dial.style.minHeight=d.mh; dial.style.margin=d.mg; dial.style.width=d.w;
  var hub=dial.querySelector('.dl-dhub');
  hub.style.width=ORIG.hub.w; hub.style.height=ORIG.hub.h;
  hub.style.left=ORIG.hub.l; hub.style.top=ORIG.hub.t;
  [].forEach.call(dial.querySelectorAll('.dl-dpt'),function(e,i){
   var o=ORIG.pts[i]; if(!o)return;
   e.style.left=o.l; e.style.top=o.t;
   if(e.children[0]&&o.dw){e.children[0].style.width=o.dw; e.children[0].style.height=o.dh;}});
  [].forEach.call(dial.querySelectorAll('.dl-lk'),function(L,i){
   var o=ORIG.lines[i]; if(!o)return;
   L.style.left=o.l; L.style.top=o.t; L.style.width=o.w; L.style.transform=o.tr;});
  applied=false;
 }

 function relines(){
  var hub=dial.querySelector('.dl-dhub');
  var db=dial.getBoundingClientRect(), hb=hub.getBoundingClientRect();
  var hx=hb.left+hb.width/2-db.left, hy=hb.top+hb.height/2-db.top;
  var pts=[].slice.call(dial.querySelectorAll('.dl-dpt'));
  [].slice.call(dial.querySelectorAll('.dl-lk')).forEach(function(L,i){
   var p=pts[i]; if(!p){L.style.width='0px';return;}
   var d=(p.children[0]||p).getBoundingClientRect();
   var cx=d.left+d.width/2-db.left, cy=d.top+d.height/2-db.top;
   var dx=cx-hx, dy=cy-hy, len=Math.sqrt(dx*dx+dy*dy), a=Math.atan2(dy,dx);
   var r0=hb.width/2, r1=d.width/2;
   L.style.left=(hx+Math.cos(a)*r0)+'px'; L.style.top=(hy+Math.sin(a)*r0)+'px';
   L.style.width=Math.max(0,len-r0-r1)+'px';
   L.style.transform='rotate('+(a*180/Math.PI).toFixed(3)+'deg)';});
 }
 function tightest(){
  var b=[].map.call(dial.querySelectorAll('.dl-dpt'),function(e){return e.getBoundingClientRect();});
  b.push(dial.querySelector('.dl-dhub').getBoundingClientRect());
  var m=1e9;
  for(var i=0;i<b.length;i++)for(var j=i+1;j<b.length;j++){var x=b[i],y=b[j];
   m=Math.min(m,Math.max(Math.max(x.left-y.right,y.left-x.right),
                         Math.max(x.top-y.bottom,y.top-x.bottom)));}
  return m;}
 /* PER-POINT NUDGES.
    ATTITUDE sat too close to TACTILE below it, and VISUAL too close to
    MECHANICAL above it. Both are moved by a small amount expressed as a
    PERCENTAGE of the box, so the nudge scales with the drawing instead of
    drifting as it resizes. Keyed by label text rather than index, so it still
    points at the right circle if the order ever changes.
    The connector lines need no separate treatment: relines() and figLines()
    both measure where the discs actually ARE and redraw from that, so they
    follow the nudge on their own. */
 var NUDGE={ 'attitude':{x:-1.6,y:-2.2}, 'visual':{x:-2.2,y:0} };
 function nudgeOf(el){
  var n=el.querySelector('.dl-nm');
  var t=((n?n.textContent:el.textContent)||'').trim().toLowerCase();
  return NUDGE[t]||null;
 }
 function paint(dm,k){
  /* the box itself is set in the stylesheet below, not inline: an inline
     style cannot beat the !important rule that pins .dl-dial square under
     1000px. Scoped to 769+ so the phone grid is untouched. */
  var hub=dial.querySelector('.dl-dhub');
  /* SCALE WITH THE BOX. The discs were a fixed pixel size while the stage
     narrowed, so as the column shrank they became proportionally huge, the
     fitter had to force the fan OPEN to keep them apart, and opening it is
     what drove the arrangement tall and square. Sized against the box, the
     whole drawing contracts as one piece and the shape never changes. At
     the widest sizes the box IS 760, so this is exactly 1 and the layout
     Matthew approved is untouched. */
  var SC=Math.min(1,(dial.getBoundingClientRect().width||G.W)/G.W);
  /* THE WORDS SCALE TOO. They were the only part of the drawing that did
     not: as the stage narrowed, the discs and the spacing came down while
     PRESENCE and ACOUSTIC IDENTITY stayed full size, so the labels — not
     the discs — collided, and no amount of fitting could clear them
     (measured: 749 overlaps, -17.9px). Scaled with everything else the
     drawing is one uniform reduction. Floored at 8px, which is the
     smallest type anywhere on the site. */
  var FS=Math.max(8,(ORIG.fs||13)*SC);
  [].forEach.call(dial.querySelectorAll('.dl-nm'),function(e){
   e.style.setProperty('font-size',FS.toFixed(2)+'px','important');});
  var hp=G.hub*k*dm*SC; hub.style.width=hp+'px'; hub.style.height=hp+'px';
  hub.style.left=G.hx+'%'; hub.style.top=HUB0.t+'%';
  [].forEach.call(dial.querySelectorAll('.dl-dpt'),function(e,i){
   var dl=(ORIG.num.l[i]-HUB0.l)*G.sx, dt=(ORIG.num.t[i]-HUB0.t);
   var r=Math.sqrt(dl*dl+dt*dt);
   if(r>0.001){dl*=k; dt*=k;}
   var nu=nudgeOf(e);
   e.style.left=(G.hx+dl+(nu?nu.x:0))+'%'; e.style.top=(HUB0.t+dt+(nu?nu.y:0))+'%';
   if(e.children[0]){var w=ORIG.num.w[i]*dm*SC;
    e.children[0].style.width=w+'px'; e.children[0].style.height=w+'px';}});
  relines();}

 /* The payload already owns 601-900 with
      @media(max-width:900px) and (min-width:601px){#sfsec-dna .dl-pl .dl-dial{
        aspect-ratio:1/1 !important; max-width:520px !important;}}
    — a deliberate step that keeps the fan square where the stage is too
    narrow to spread into, and its specificity (one id, two classes) beats
    anything reasonable. So the flattened geometry stops at 901. Below that
    the graphic is the square fan; below 601 it is the phone grid. Three
    honest steps rather than a flat layout crushed into a square box. */
 function layout(){
  if(innerWidth<901){ if(applied)restore(); return; }
  var dm=1,k=G.k; paint(dm,k);
  /* THE JUMP WAS THE FITTER, and the fix is to make its target scale-invariant.
     These loops nudge dm and k in 2% steps until clearance reaches 6px. But
     paint() scales the whole composition by the box width, so clearance scales
     with it too — while the 6px target did NOT. As the window narrowed, real
     clearance slid under a fixed 6 and the loops fired one extra time: measured
     at 1141 -> 1140 every disc snapped 48.1 -> 45.1 in a single pixel.

     Simply skipping the fitter below full size is wrong — the composition
     Matthew approved IS the fitter's output; without it the raw arrangement
     overlaps (measured: 866 overlaps, -19.9px). So the TARGET is scaled by the
     same factor as everything else. The loops then converge on the same dm and
     k at every width, the drawing is one continuous scaled copy, and there is
     nothing left to step. */
  var SCL=Math.min(1,(dial.getBoundingClientRect().width||G.W)/G.W);
  var TGT=6*SCL;
  for(var i=0;i<8&&tightest()<TGT&&dm>0.86;i++){dm-=0.02; paint(dm,k);}
  for(var j=0;j<14&&tightest()<TGT;j++){k+=0.02; paint(dm,k);}
  for(var q=0;q<10&&tightest()<TGT&&dm>0.62;q++){dm-=0.03; paint(dm,k);}
  applied=true;
 }


 /* ============================================================
    SMALL-SCREEN IMAGE LOAD — 20 studies, 900px and below.
    Above 1201 every variation is option 4 exactly as shipped.

    The count today on a phone: the stacked-amps hero, the 2-up
    middle row, the closing product shot, AND eight photographs
    inside the DNA discs plus the hub. Eleven images in one section.
    These studies cut that down — at most two photo rows, and the
    discs either lose their pictures or the hub takes over as the
    single image that carries the section.
    ============================================================ */
 var HERO='images/marshall-hero.png';
 (function(){ var pre=new Image(); pre.src=HERO; })();   /* decode it up front */

 /* The section used to paint three times: the radial fan, then this
    stylesheet, then the hub swapping its picture. The sheet is created and
    attached now — before the graphic has rendered — so the condensed layout
    is in force the first time anything is drawn. */
 var EARLY=document.createElement('style'); EARLY.id='mi-css';
 (document.head||document.documentElement).appendChild(EARLY);
 var FADE=document.createElement('style');
 FADE.textContent='#sfsec-dna .dl-dial{transition:opacity .17s ease;}'+
  /* the hide has to be INSTANT. With a .17s transition on the way out the
     drawing was still visible while the geometry was being rewritten — that
     is the flick. Out with no transition, back in with the fade. */
  '#sfsec-dna .dl-dial.mi-swap{opacity:0;transition:none !important;}'+
  /* the drawing is built by the page's own script, so its first render is
     unavoidable — but it does not have to be SEEN. Held invisible until this
     payload has finished, then faded in. */
  'html.mi-hold #sfsec-dna .dl-dial{opacity:0 !important;}';
 (document.head||document.documentElement).appendChild(FADE);
 var ROOT=document.documentElement;
 ROOT.classList.add('mi-hold');
 /* never leave it hidden: if anything below fails, it comes back anyway */
 var SAFETY=setTimeout(function(){ROOT.classList.remove('mi-hold');},3000);
 function reveal(){ clearTimeout(SAFETY);
  requestAnimationFrame(function(){
   requestAnimationFrame(function(){ROOT.classList.remove('mi-hold');});});}

 var BASECSS =
  /* the cloned drawing exists in the DOM at every width, so it has to be
     switched OFF everywhere by default - otherwise it renders as a second
     520px fan on desktop, which is exactly what the audit caught (section
     1692 tall instead of 1172). The narrow block turns it back on, and
     being later in the same sheet it wins on a tie. */
  'html body #sfsec-dna .mi-fig{display:none !important;}'+
  '@media(min-width:1601px){'+
   'html body #sfsec-dna .cs-dbody{width:100% !important;margin-left:0 !important;'+
    'margin-right:0 !important;grid-template-columns:1fr 428px !important;}'+
   'html body #sfsec-dna .cs-row-left{padding-left:0 !important;padding-right:48px !important;}'+
   'html body #sfsec-dna .cs-row-left.m4-lastrow{padding-bottom:0 !important;}'+
   'html body #sfsec-dna .cs-row-left.cs-has-divider::after{left:0 !important;right:48px !important;}'+
   'html body #sfsec-dna .dl-dial{aspect-ratio:760/360 !important;max-width:760px !important;'+
    'min-height:0 !important;height:auto !important;width:100% !important;'+
    'margin:0 auto 0 0 !important;}'+
  '}'+
  /* THE GAP ON THE RIGHT.
     The picture stopped 48px short of the window so it lined up with the
     video. Matthew wants it running off the right edge instead, everywhere
     except ultra-large. The right margin is removed and the SAME 48px is
     given to the image column, so:
       before  body = W-96, left = W-96-col
       after   body = W-48, left = W-48-(col+48) = W-96-col   <- identical
     The text column does not move by a single pixel and the fan keeps exactly
     the room it has today; only the picture grows, rightwards, to the edge.
     NOTE this deliberately breaks the picture/video alignment built earlier —
     the two cannot both be true. */
  '@media(min-width:1201px) and (max-width:1600px){'+
   'html body #sfsec-dna .cs-dbody{width:calc(100% - 48px) !important;'+
    'margin-left:48px !important;margin-right:0 !important;'+
    /* THE JUMP. This band held the image column at a FIXED 428 while the
       band below it sized the column proportionally — so at the handover
       the column stepped 428 -> 360 and the drawing stepped 677 -> 744 in
       a single pixel of window. Two bands, two different formulas, one
       visible lurch. Both now use the same expression, so the column and
       the drawing change smoothly straight through 1200. At 1600 it still
       resolves to exactly 428, so it also meets the ultra-wide band
       cleanly, and nothing above 1600 moves. */
    'grid-template-columns:1fr calc(clamp(200px,26vw,380px) + 48px) !important;}'+
   'html body #sfsec-dna .cs-row-left{padding-left:0 !important;padding-right:48px !important;}'+
   'html body #sfsec-dna .cs-row-left.cs-has-divider::after{left:0 !important;right:48px !important;}'+
   'html body #sfsec-dna .cs-row-left.m4-lastrow{padding-bottom:0 !important;}'+
   'html body #sfsec-dna .dl-dial{aspect-ratio:760/360 !important;max-width:760px !important;'+
    'min-height:0 !important;height:auto !important;width:100% !important;'+
    'margin:0 auto 0 0 !important;}'+
  '}'+
  /* 901-1200. Same trick: the column takes the 48 the right margin gave up. */
  '@media(min-width:901px) and (max-width:1200px){'+
   'html body #sfsec-dna .cs-dbody{width:calc(100% - 48px) !important;'+
    'margin-left:48px !important;margin-right:0 !important;'+
    'grid-template-columns:1fr calc(clamp(200px,26vw,380px) + 48px) !important;}'+
   'html body #sfsec-dna .cs-row-left{padding-left:0 !important;padding-right:48px !important;}'+
   /* the alignment rule was only in the 1201+ block, so the picture ran past
      ACQUIRED IN 2025 at every rescaled width. It belongs in both. */
   'html body #sfsec-dna .cs-row-left.m4-lastrow{padding-bottom:0 !important;}'+
   'html body #sfsec-dna .cs-row-left.cs-has-divider::after{left:0 !important;right:48px !important;}'+
   /* THE VERTICAL MIDDLE STATE.
      Below 1201 there was no shape rule here at all, so the drawing fell
      back to the page's own `aspect-ratio:1/1; max-width:520px` — a SQUARE.
      That is the jump from the wide horizontal fan to the tall bunched one.
      The flat 760/360 shape now holds all the way down to 900, so there is
      no change of arrangement on the way: the fan simply contracts. */
   'html body #sfsec-dna .dl-dial{aspect-ratio:760/360 !important;'+
    'max-width:760px !important;min-height:0 !important;height:auto !important;'+
    'width:100% !important;margin:0 auto 0 0 !important;}'+
  '}';

 /* rows   which photo ROWS survive: 'hero' | 'heroLast' | 'last' | 'heroPair'
    discs  'photo' | 'dot' | 'small'
    hub    px size, or 0 to leave alone
    hubHero swap the hub picture for the stacked-amps hero               */
 function smallCSS(v){
  var R='html body #sfsec-dna .cs-row-right';
  /* 600, not 900. Between 601 and 900 the section is still the two-column
     square-fan layout and forcing picture ratios there tore it apart —
     measured at 777px tall with 20 overlaps. The phone band is 600 down. */
 /* Matthew: the fully condensed layout is right, the in-between is not —
     "flick to the full screen earlier, removing these intermediates". So the
     condensed treatment starts at 900. Two rules in the payload have to be
     overridden to get there, both scoped 601-900 and both written with an id
     and two classes, so they are matched selector-for-selector below. */
  var s='@media(max-width:900px){'+
   /* THE COLUMN MUST NOT GROW PAST THE SCREEN.
      .cs-dbody is a grid, and a grid track sizes itself to the widest item's
      intrinsic contribution. The full-bleed hub is a 100vw item inside it, so
      the single track measured 414px on a 390px screen — the row inherited
      that width and the body copy, held 24px off each edge, was pushed past
      the right edge and clipped: measured +3px at 375 and +14px at 360, both
      clean on the untouched page. The track is pinned to the container so an
      item can no longer inflate it; the hub is sized in pixels by the script,
      so pinning the track does not touch the bleed. */
   'html body #sfsec-dna .cs-dbody{grid-template-columns:100% !important;'+
    'max-width:100vw !important;overflow-x:clip !important;}'+
   'html body #sfsec-dna .cs-row-left{max-width:100vw !important;'+
    'box-sizing:border-box !important;}'+
   /* AND the drawing has to be allowed to shrink.
      A grid / flex item's default minimum size is min-width:auto, i.e. its
      MIN-CONTENT — not zero. The two-column list's min-content is 350px, so
      the whole wrapper chain refused to go below 350 no matter how narrow the
      screen got: at 360 it sat 24..374 and the group headers INTANGIBLE and
      TANGIBLE plus the right-hand labels were cut off. min-width:0 releases
      that floor. .dl-dhub is deliberately NOT in this list — the header
      picture is meant to be wider than its container. */
   'html body #sfsec-dna .cs-dna-split,html body #sfsec-dna .dl-gx,'+
   'html body #sfsec-dna .dl-ix,html body #sfsec-dna .dl-kx,'+
   'html body #sfsec-dna .dl-pl,html body #sfsec-dna .dl-dial,'+
   'html body #sfsec-dna .dl-dpt,html body #sfsec-dna .dl-ghx,'+
   'html body #sfsec-dna .dl-nm{min-width:0 !important;max-width:100% !important;}'+
   /* NOT break-word: it split PROVENANCE across two lines as PROVENANC / E.
      min-width:0 above already stops the clipping this was guarding against. */
   'html body #sfsec-dna .dl-nm{overflow-wrap:normal !important;'+
    'hyphens:none !important;}'+
   /* the payload pins the fan square between 601 and 900 — that IS the
      intermediate. Turned into the same two-column list the phone uses. */
   'html body #sfsec-dna .dl-pl .dl-dial,html body #sfsec-dna .dl-gx .dl-dial,'+
   'html body #sfsec-dna .dl-kx .dl-dial{display:grid !important;'+
    'grid-template-columns:1fr 1fr !important;aspect-ratio:auto !important;'+
    'max-width:none !important;height:auto !important;column-gap:26px !important;'+
    'row-gap:0 !important;margin:0 !important;}'+
   'html body #sfsec-dna .dl-pl .dl-lk,html body #sfsec-dna .dl-gx .dl-lk,'+
   'html body #sfsec-dna .dl-kx .dl-lk,html body #sfsec-dna .dl-lk{display:none !important;}'+
   'html body #sfsec-dna .dl-pl .dl-dpt,html body #sfsec-dna .dl-gx .dl-dpt,'+
   'html body #sfsec-dna .dl-kx .dl-dpt,html body #sfsec-dna .dl-dpt{'+
    'position:static !important;transform:none !important;'+
    'max-width:none !important;text-align:left !important;display:grid !important;'+
    'grid-template-columns:44px 1fr !important;gap:12px !important;'+
    'align-items:center !important;padding:9px 0 !important;}'+
   'html body #sfsec-dna .dl-kx .dl-dpt > div:first-child,'+
   'html body #sfsec-dna .dl-dpt > div:first-child{width:44px !important;'+
    'height:44px !important;flex:0 0 44px !important;margin:0 !important;}'+
   /* the 601-900 rules keep the hub ABSOLUTELY positioned for the fan, so it
      leaves the flow and the eight list rows render straight over the picture.
      Static, and spanning both columns. */
   'html body #sfsec-dna .dl-pl .dl-dhub,html body #sfsec-dna .dl-gx .dl-dhub,'+
   'html body #sfsec-dna .dl-kx .dl-dhub,html body #sfsec-dna .dl-dhub{'+
    'position:static !important;transform:none !important;'+
    'grid-column:1/-1 !important;grid-row:auto !important;'+
    'border-radius:0 !important;border:0 !important;}'+
   'html body #sfsec-dna .dl-pl .dl-ghx,html body #sfsec-dna .dl-gx .dl-ghx,'+
   'html body #sfsec-dna .dl-kx .dl-ghx,html body #sfsec-dna .dl-ghx{'+
    'display:block !important;grid-column:1/-1 !important;}'+
   'html body #sfsec-dna .dl-pl .dl-key,html body #sfsec-dna .dl-gx .dl-key,'+
   'html body #sfsec-dna .dl-kx .dl-key,html body #sfsec-dna .dl-key{'+
    'position:static !important;grid-column:1/-1 !important;'+
    'flex-direction:row !important;gap:18px !important;margin:14px 0 0 !important;}'+
   /* one column of pictures, not a sliver beside the text */
   'html body #sfsec-dna .cs-dbody{grid-template-columns:1fr !important;}';

  /* ---- the cloned drawing ----
     Built into its own string and appended at the very END of the sheet. The
     list rules that follow use `.dl-kx .dl-dpt` — the same weight as
     `.mi-fig .dl-dpt` — so on a tie the later rule wins, and the figure has
     to be later or the list's thumbnail size would resize the drawing. */
  var figCSS='';
  /* TWO IDS, deliberately. The page's own phone rules pin the medallion with
     `#sfsec-dna .dl-kx .dl-dhub` — one id and two classes — and they live in
     a <style> at the END OF THE BODY, so on a specificity TIE they beat this
     sheet in the head. `.mi-fig .dl-dhub` tied, lost, and the drawing's
     centre snapped to 0,0 — measured at -49,-49, half of it off the corner,
     with every connector line running to an empty point. Using the clone's
     id makes it two ids and settles it outright. */
  var F='html body #sfsec-dna #mi-fig';
  if(v.fig){
   var fr=(v.figRatio||'1/1');
   /* 57/520 of the box. Expressed against the SAME width the box uses, so
      discs, positions and connector lines all scale as one piece. */
   /* SIZE, not shape. Forced into the flat 760/360 box the fan's own square
     geometry collapsed and the fitter ground the discs down to specks. The
     box goes back to square — the one shape the geometry is clean in,
     measured at 24.7px of clearance — and the SCALING is what comes down
     instead. Each study takes a different share of the screen. */
   var fw='('+(v.figW||70)+'vw)';
   var dw='calc('+fw+' * 0.1096)';
   var hubW='calc('+fw+' * 0.25)';
   figCSS+= F+'{display:block !important;position:relative !important;'+
        'aspect-ratio:'+fr+' !important;height:auto !important;'+
        'min-height:0 !important;overflow:visible !important;'+
        /* the box is NEVER allowed to grow — Matthew's rule: no more height at
           any width. Extra room for the circles comes only from the sideways
           stretch and the scaled type, never from a bigger box. */
        'width:'+(v.figW||70)+'vw !important;max-width:'+(v.figW||70)+'vw !important;'+
        'margin:0 auto 26px !important;'+
        '}'+
       /* labels live in the list below — the figure is purely a drawing */
       /* visibility, NOT display. Each point is a disc WITH its label under it,
          and the pair is centred on the anchor — so the disc sits about a
          label's half-height ABOVE the anchor by design. display:none took
          the label out of the box, the disc dropped onto the anchor, and the
          whole fan slid down far enough to clip the bottom two discs off the
          edge. Hidden but still occupying its space, the composition is the
          page's own, untouched. */
       /* and a UNIFORM reserved height. Left to itself ACOUSTIC IDENTITY wraps
          to two lines while PRESENCE takes one, so each point shifted by a
          different amount and the discs moved RELATIVE to each other —
          8.7px of overlap at 390, 16.9 at 320. One fixed height for every
          label means one identical shift, so the fan stays proportional at
          any size. */
       /* the label is taken OUT OF FLOW, not merely hidden. Left in flow it
          sets the width of the point box, and since the box is centred on
          the anchor while the disc sits inside it, a label wider than the
          disc drags the disc off its anchor — by 9 percentage points at 390,
          which is what pulled two discs onto the centre. Absolute means it
          contributes nothing and the box shrink-wraps the disc. */
       /* THE DRAWING NOW STANDS ALONE, so it carries its own words. */
       F+' .dl-nm{position:static !important;visibility:visible !important;'+
        'width:auto !important;height:auto !important;overflow:visible !important;'+
        'display:block !important;white-space:nowrap !important;'+
        'font-size:'+(v.figLabel||10)+'px !important;letter-spacing:0.06em !important;'+
        'margin:6px 0 0 !important;text-align:center !important;}'+
       F+' .dl-ghx,'+F+' .dl-key{display:none !important;}'+
       /* the connectors are back. They drifted before because the geometry
          was never recomputed during a resize and applyV could leave itself
          half-applied — both fixed — so figLines() can be trusted now. */
       F+' .dl-lk{display:block !important;}'+
       F+' .dl-dpt{position:absolute !important;display:block !important;'+
        'max-width:none !important;padding:0 !important;'+
        'transform:translate(-50%,-50%) !important;}'+
       /* display:block is asserted here because the rule that strips the
          repeated thumbnails out of the LIST is written against `.dl-kx
          .dl-dpt`, and .dl-kx is an ancestor of the figure too — it hid the
          drawing's own eight discs and left nothing but the medallion. */
       F+' .dl-dpt > div:first-child{display:block !important;'+
        'width:'+dw+' !important;height:'+dw+' !important;'+
        'flex:none !important;margin:0 auto !important;}'+
       /* A CIRCLE, not an ellipse. width:25% and height:25% only agree when
          the box is square — in the flat box they gave a 25%-of-width by
          25%-of-height OVAL. Every connector line starts at the medallion's
          edge, computed from half its width, so an oval sent all eight of
          them off from the wrong place: that is the lines not matching.
          Sized off the width alone, with the ratio holding it round. */
       F+' .dl-dhub{position:absolute !important;display:block !important;'+
        'width:'+hubW+' !important;height:auto !important;'+
        'aspect-ratio:1/1 !important;max-width:none !important;'+
        'margin:0 !important;border-radius:50% !important;overflow:hidden !important;'+
        'transform:translate(-50%,-50%) !important;grid-column:auto !important;}'+
       F+' .dl-dhub img{width:100% !important;height:100% !important;'+
        'object-fit:cover !important;}';
  } else {
   figCSS+= F+'{display:none !important;}';
  }

  /* ---- the list: one column or two ---- */
  if(v.cols===1)
   s+='html body #sfsec-dna .dl-pl .dl-dial,html body #sfsec-dna .dl-gx .dl-dial,'+
      'html body #sfsec-dna .dl-kx .dl-dial{grid-template-columns:1fr !important;}';
  if(v.disc)
   s+='html body #sfsec-dna .dl-kx .dl-dpt > div:first-child,'+
      'html body #sfsec-dna .dl-dpt > div:first-child{width:'+v.disc+'px !important;'+
      'height:'+v.disc+'px !important;flex:0 0 '+v.disc+'px !important;}'+
      'html body #sfsec-dna .dl-pl .dl-dpt,html body #sfsec-dna .dl-gx .dl-dpt,'+
      'html body #sfsec-dna .dl-kx .dl-dpt,html body #sfsec-dna .dl-dpt{'+
      'grid-template-columns:'+v.disc+'px 1fr !important;}';

  /* THE LIST MUST NOT REPEAT THE DRAWING.
     When the drawing is on screen it already shows all eight photographs;
     showing them again as thumbnails underneath is the same eight pictures
     twice. The list keeps its words — they are the only place the eight
     attributes can be READ — and gives up its pictures. */
  if(v.fig)
   /* NOT the thumbnails only — the WHOLE list. With the drawing on screen
      the eight pictures and the eight words are both already there;
      repeating either underneath is the same thing twice. */
   s+='html body #sfsec-dna .dl-pl .dl-dial,html body #sfsec-dna .dl-gx .dl-dial,'+
      'html body #sfsec-dna .dl-kx .dl-dial,html body #sfsec-dna .dl-dial{'+
      'display:none !important;}'+
      'html body #sfsec-dna .dl-kx .dl-dpt > div:first-child,'+
      'html body #sfsec-dna .dl-pl .dl-dpt > div:first-child,'+
      'html body #sfsec-dna .dl-gx .dl-dpt > div:first-child,'+
      'html body #sfsec-dna .dl-dial .dl-dpt > div:first-child{'+
      'display:none !important;}'+
      'html body #sfsec-dna .dl-pl .dl-dpt,html body #sfsec-dna .dl-gx .dl-dpt,'+
      'html body #sfsec-dna .dl-kx .dl-dpt,html body #sfsec-dna .dl-dial .dl-dpt{'+
      'grid-template-columns:1fr !important;padding:6px 0 !important;}';
  /* no photo header for this study? then the medallion has no job in the
     list — the figure above already carries it, or nothing does. */
  if(!v.hdr)
   s+='html body #sfsec-dna .dl-pl .dl-dhub,html body #sfsec-dna .dl-gx .dl-dhub,'+
      'html body #sfsec-dna .dl-kx .dl-dhub,html body #sfsec-dna .dl-dial > .dl-dhub{'+
      'display:none !important;}'+
      F+' .dl-dhub{display:block !important;}';
  /* --- how many photo rows --- */
  /* TOP AND BOTTOM. The stacked-amps wall leads the section, above the
     EXTRACTED DNA label; the Bluetooth speakers close it, under the drawing.
     The 2-up in the middle stays out — that is the third layer of pictures
     Matthew asked to lose. */
  if(v.rows==='topBottom')
   s+= R+'{display:none !important;}'+
       R+'.cs-row-right-r1{display:block !important;}'+
       R+'.cs-show-mobile{display:block !important;}'+
       /* CONTAINED, not bled. Held to the same page margin as the copy —
          Matthew's call: inset reads like a case study, edge-to-edge reads
          like a campaign. */
       R+'.cs-row-right-r1,'+R+'.cs-show-mobile{'+
        'height:auto !important;aspect-ratio:16/9 !important;'+
        'width:100% !important;max-width:100% !important;'+
        'margin:0 0 26px !important;}'+
       /* and it needs air underneath. Measured at 390: the gap between this
          photograph and MARSHALL AT A GLANCE was 0px — the label sat right
          on the picture — while the drawing gives TRANSLATION 92px. Matched
          to that, so both labels are led into the same way. */
       R+'.cs-show-mobile{margin:26px 0 92px !important;}'+
       'html body #sfsec-dna .cs-row-left,html body #sfsec-dna .cs-dbody{'+
        'overflow:visible !important;}'+
       R+' img{width:100% !important;height:100% !important;object-fit:cover !important;}';
  else if(v.rows==='hero')      s+= R+'.cs-gap-bottom{display:none !important;}'+
                              R+'.cs-show-mobile{display:none !important;}';
  else if(v.rows==='last') s+= R+'.cs-row-right-r1{display:none !important;}'+
                              R+'.cs-gap-bottom{display:none !important;}';
  else if(v.rows==='heroLast') s+= R+'.cs-gap-bottom{display:none !important;}';
  else if(v.rows==='heroPair') s+= R+'.cs-show-mobile{display:none !important;}';
  /* the surviving rows get a sane shape rather than a column sliver */
  s+= R+'{height:auto !important;aspect-ratio:'+(v.ratio||'16/9')+' !important;}'+
      R+' img{height:100% !important;object-fit:cover !important;}';
  /* --- the discs --- */
  if(v.discs==='dot')
   s+='html body #sfsec-dna .dl-dpt > div:first-child img{display:none !important;}'+
      'html body #sfsec-dna .dl-kx .dl-dpt > div:first-child,'+
      'html body #sfsec-dna .dl-dpt > div:first-child{width:14px !important;'+
      'height:14px !important;flex:0 0 14px !important;'+
      'background:rgba(138,110,58,0.35) !important;'+
      'border-color:rgba(138,110,58,0.5) !important;margin:0 auto 8px !important;}';
  else if(v.discs==='small')
   s+='html body #sfsec-dna .dl-kx .dl-dpt > div:first-child,'+
      'html body #sfsec-dna .dl-dpt > div:first-child{width:30px !important;'+
      'height:30px !important;flex:0 0 30px !important;margin:0 auto 7px !important;}';
  /* --- the hub --- */
  if(v.hubSquare)
   /* the circular hub becomes a full-width SQUARE picture at the head of the
      section — one strong image instead of a small medallion plus eight discs */
   s+='html body #sfsec-dna .dl-kx .dl-dhub,html body #sfsec-dna .dl-pl .dl-dhub,'+
      'html body #sfsec-dna .dl-gx .dl-dhub,html body #sfsec-dna .dl-dhub{'+
      'width:100vw !important;max-width:100vw !important;'+
      'margin:0 0 22px calc(50% - 50vw) !important;'+
      'height:auto !important;aspect-ratio:'+(v.sqRatio||'1/1')+' !important;'+
      'border-radius:0 !important;border:0 !important;'+
      'grid-column:1/-1 !important;}'+
      'html body #sfsec-dna .dl-dhub img{width:100% !important;height:100% !important;'+
      'object-fit:cover !important;}'+
      /* every ancestor between the hub and the page has to let it through */
      'html body #sfsec-dna .cs-dna-split,html body #sfsec-dna .dl-kx,'+
      'html body #sfsec-dna .dl-gx,html body #sfsec-dna .dl-ix,'+
      'html body #sfsec-dna .dl-dial,html body #sfsec-dna .cs-row-left{'+
      'overflow:visible !important;}';
  else if(v.hub)
   /* the phone block pins the hub with #sfsec-dna .dl-kx .dl-dhub — one id and
      two classes — so a plainer selector loses even with !important. Matched. */
   s+='html body #sfsec-dna .dl-kx .dl-dhub,'+
      'html body #sfsec-dna .dl-pl .dl-dhub,'+
      'html body #sfsec-dna .dl-gx .dl-dhub,'+
      'html body #sfsec-dna .dl-dhub{width:'+v.hub+'px !important;'+
      'height:'+v.hub+'px !important;}';
  /* the figure goes LAST inside the media block — see the note above */
  s+=figCSS+'}';
  return s;
 }
 /* WHAT WAS WRONG — the whole cause of the flick.
    applyV ran  applyHub(v)  and THEN  layout().
      - layout() below 901 calls restore(), which assigns hub.style.width /
        height / left / top back to the originals — wiping the square header
        that applyHub had just built, one frame after building it.
      - layout() above 900 calls paint(), which assigns hub.style.width via
        the plain CSSOM setter. Per CSSOM that setter writes an EMPTY priority,
        so it silently STRIPS the !important applyHub had set.
    Either way the hub was drawn twice with two different shapes: build, wipe,
    rebuild. That is exactly the "circle flashes up then changes then changes
    again" reported.

    The work is now split in three, and ordered so nothing runs after the
    thing it would clobber:
      hubSrc(v)      the picture only
      hubClear()     drop every property the bleed owns  — runs FIRST
      layout()       restore() or paint() take the geometry
      hubBleed(v)    the square header — runs LAST, so it survives  */

 function hubSrc(v){
  var im=listHub('img');
  if(!im)return null;
  if(!im.__orig)im.__orig=im.getAttribute('src');
  var want=(v.hubHero&&innerWidth<=900) ? HERO : im.__orig;
  if(im.getAttribute('src')!==want)im.setAttribute('src',want);
  return want;
 }
 function wantSrc(v){
  var im=listHub('img');
  if(!im)return null;
  if(!im.__orig)im.__orig=im.getAttribute('src');
  return (v.hubHero&&innerWidth<=900) ? HERO : im.__orig;
 }
 /* cleared BEFORE layout so the fitter measures an honest box: a leftover
    margin-left / max-width:none from the mobile bleed would otherwise skew
    every clearance reading in the desktop fit loop. */
 function hubClear(){
  var hub=listHub('');
  if(!hub)return;
  hub.style.removeProperty('margin-left');
  hub.style.removeProperty('max-width');
  hub.style.removeProperty('aspect-ratio');
  hub.style.removeProperty('width');
  hub.style.removeProperty('height');
 }

 /* SQ holds the variation whose square header is currently in force, or null.
    bleedFix() can then re-measure on its own later, without applyV. */
 var SQ=null;

 /* SCOPE. These four all used document.querySelector('#sfsec-dna .dl-dhub'),
    which returns the FIRST medallion in the section — and once the cloned
    drawing is inserted ABOVE the list, that is the CLONE's medallion, not
    the list's. Study 7 therefore stamped a 390px full-bleed width, inline and
    !important, onto the centre of the drawing; study 8 then showed the
    drawing still wearing it, and its centre swallowed two discs. Every one of
    these now asks the LIST for its own medallion. */
 function listHub(sel){
  var d=dial||document.querySelector('#sfsec-dna .dl-dial');
  if(!d)return null;
  return sel ? d.querySelector('.dl-dhub '+sel) : d.querySelector('.dl-dhub');
 }

 /* ---- THE FIGURE ----------------------------------------------------
    Several of these studies want the DRAWING at the head of the narrow
    layout rather than a photograph. The drawing and the list cannot be the
    same element — the list IS the drawing, rearranged — so the drawing is
    CLONED once and the original goes on to become the list.

    The clone costs nothing to load: same nine image URLs, already in cache,
    so nothing fetches and nothing can flash.

    Why it does not squash. The page builds the fan with PERCENTAGE positions
    inside a square box, but the discs are a fixed 57px and the connector
    lines are percentage widths computed for 57px discs in a 520px box. Scale
    the box alone and the discs stay big while the lines fall short. So the
    discs are re-expressed in the same units as everything else — 57/520 =
    10.96% of the box — and then the whole figure is one uniform scale at any
    width, with the lines still landing exactly on the disc edges. Nothing is
    stretched, nothing is compressed. */
 /* ORDER on the small layout. The photographs live in the right-hand column,
    which on a phone falls below everything — so they are physically moved: the
    amps wall to just above the EXTRACTED DNA label, the speakers to just after
    the drawing. Both remember where they came from and go back on desktop. */
 /* the two photographs run off both edges on a phone. Same measured
    correction the drawing's medallion uses: set the width, then pull the box
    back by however far in it starts, in pixels, as !important. */
 /* the photographs are contained now, so any bleed correction left on them
    from an earlier pass has to come off. */
 function rowsBleed(v){
  var sec=document.getElementById('sfsec-dna'); if(!sec)return;
  [sec.querySelector('.cs-row-right.cs-row-right-r1'),
   sec.querySelector('.cs-row-right.cs-show-mobile')].forEach(function(r){
   if(r)r.style.removeProperty('margin-left');});
 }
 var ORD=null;
 function order(v){
  var sec=document.getElementById('sfsec-dna'); if(!sec)return;
  var top=sec.querySelector('.cs-row-right.cs-row-right-r1');
  var bot=sec.querySelector('.cs-row-right.cs-show-mobile');
  var lab=sec.querySelector('.cs-dslabel.dna-label');
  if(!ORD&&top&&bot)ORD={t:[top.parentNode,top.nextSibling],b:[bot.parentNode,bot.nextSibling]};
  if(!ORD)return;
  if(v.rows==='topBottom'&&innerWidth<=900){
   if(lab&&top&&top.nextSibling!==lab)lab.parentNode.insertBefore(top,lab);
   /* the closing photograph sits UNDER the Translation copy — so the section
      reads picture, drawing, the argument, then the payoff. Anchored to the
      block that FOLLOWS it (MARSHALL AT A GLANCE) and inserted before that,
      which lands it at the end of Translation no matter how that copy is
      structured. Walking forward from the Translation label instead put it
      one block too far, after the glance copy. */
   var next=null;
   [].forEach.call(sec.querySelectorAll('*'),function(e){
    if(next||e.children.length)return;
    if(/^marshall at a glance$/i.test((e.textContent||'').trim()))next=e;});
   /* inserted directly before the MARSHALL AT A GLANCE label, INSIDE the text
      column — not before the column itself. Walking up to a row put it above
      Translation entirely, and being a child of the grid instead of the text
      column it also lost its inset and ran edge to edge. In here its 100%
      width is the text measure, so it keeps the case-study margin. */
   if(next&&bot&&next.parentNode&&next.previousSibling!==bot)
    next.parentNode.insertBefore(bot,next);
   if(!next&&bot){
    var anchor=FIG&&FIG.parentNode?FIG:sec.querySelector('.dl-dial');
    if(anchor&&anchor.nextSibling!==bot)anchor.parentNode.insertBefore(bot,anchor.nextSibling);
   }
  } else {
   if(top&&top.parentNode!==ORD.t[0])ORD.t[0].insertBefore(top,ORD.t[1]);
   if(bot&&bot.parentNode!==ORD.b[0])ORD.b[0].insertBefore(bot,ORD.b[1]);
  }
 }
 var FIG=null;
 function figure(v){
  var dial=document.querySelector('#sfsec-dna .dl-dial');
  if(!dial)return;
  if(!v.fig){ if(FIG){FIG.style.display='none';} return; }
  if(!FIG)makeFig();
  if(!FIG)return;
  if(0){
   FIG=dial.cloneNode(true);
   FIG.id='mi-fig';
   /* strip dl-dial. Every small-screen rule that turns the drawing into a
      list is written as `.dl-pl .dl-dial` — one id and two classes — and the
      clone would be caught by all of them. Without that class it is invisible
      to them, and only the figure rules below can reach it. */
   FIG.className=(FIG.className||'').toString()
     .split(/\s+/).filter(function(c){return c&&c!=='dl-dial';}).join(' ')+' mi-fig';
  }
  var before=(v.figPos==='bottom')?dial.nextSibling:dial;
  if(FIG.parentNode!==dial.parentNode||FIG.nextSibling!==before)
   dial.parentNode.insertBefore(FIG,before);
  FIG.style.display='';
  /* The medallion's own inline `left:28%; top:52%` kept computing to 0 — some
     rule in the page's end-of-body block carries !important on them, and an
     inline style without !important loses to that (CLAUDE.md trap 1, in
     reverse). So the two numbers are re-applied here AS important, where
     nothing in any stylesheet can reach them. Read off the real drawing, not
     hard-coded, so the figure always matches whatever the page built. */
  var src=dial.querySelector('.dl-dhub'), fh=FIG.querySelector('.dl-dhub');
  if(src&&fh){
   var L=ORIG&&ORIG.hub?ORIG.hub.l:src.style.left;
   var T=ORIG&&ORIG.hub?ORIG.hub.t:src.style.top;
   if(L)fh.style.setProperty('left',L,'important');
   if(T)fh.style.setProperty('top',T,'important');
  }
  FIGV=null;   /* the figure is centred now, not bled — no correction needed */
  figFix();
  figType();
  figFit();
  figGrow();
  figLines();
 }

 /* the connector lines were drawn by the page for ONE size and one arrangement.
    Move or resize anything and they stop landing on the disc edges, so they are
    recomputed here from what is actually on screen — the same method the
    desktop fan uses, measured in pixels, not assumed. */
 function figLines(){
  if(!FIG||FIG.style.display==='none')return;
  var hub=FIG.querySelector('.dl-dhub'); if(!hub)return;
  var fb=FIG.getBoundingClientRect(), hb=hub.getBoundingClientRect();
  var hx=hb.left+hb.width/2-fb.left, hy=hb.top+hb.height/2-fb.top;
  var pts=[].slice.call(FIG.querySelectorAll('.dl-dpt'));
  [].slice.call(FIG.querySelectorAll('.dl-lk')).forEach(function(L,i){
   var p=pts[i]; if(!p){L.style.setProperty('width','0px','important');return;}
   var d=(p.children[0]||p).getBoundingClientRect();
   var cx=d.left+d.width/2-fb.left, cy=d.top+d.height/2-fb.top;
   var dx=cx-hx, dy=cy-hy, len=Math.sqrt(dx*dx+dy*dy), a=Math.atan2(dy,dx);
   var r0=hb.width/2, r1=d.width/2;
   L.style.setProperty('left',(hx+Math.cos(a)*r0)+'px','important');
   L.style.setProperty('top',(hy+Math.sin(a)*r0)+'px','important');
   L.style.setProperty('width',Math.max(0,len-r0-r1)+'px','important');
   L.style.setProperty('transform','rotate('+(a*180/Math.PI).toFixed(3)+'deg)','important');
  });
 }

 /* THE FIGURE GETS THE SAME TREATMENT THE DESKTOP FAN GETS.
    The raw fan geometry is not collision-free on its own — that is precisely
    why the desktop side runs a fitter. Scaled down it goes tight and then
    negative: measured +51.5px of clearance at 900, +16.1 at 600, and -8.7 at
    390. So rather than trust the arithmetic, the discs are measured and eased
    down until nothing touches. Same rule as the desktop fan: 6px minimum. */
 /* BIGGER CIRCLES, SAME HEIGHT.
    Two moves, in this order. First the points are pushed apart HORIZONTALLY
    only — their distance from the centre is stretched in x, never in y — which
    opens room without adding a single pixel of height. Then the discs are grown
    into that room, step by step, and the growth stops the moment either
    (a) anything comes within 6px of anything else, or
    (b) any disc would cross the top or bottom edge of the box.
    Condition (b) is what guarantees the drawing can never get taller: the box
    is a fixed ratio, so if nothing leaves it vertically, nothing pushes down
    the page. */
 /* THE UNFORMATTED FLASH.
    The drawing was cloned the first time the layout went narrow — so the very
    first time it appeared, the browser had a brand-new element with nine fresh
    <img> nodes to lay out and paint, and for a frame or two that is exactly
    what it looked like: raw, unstyled pictures. Built at boot instead and kept
    hidden, it is fully laid out and decoded long before it is ever shown, so
    revealing it is just a display switch. */
 function makeFig(){
  var d=dial||document.querySelector('#sfsec-dna .dl-dial');
  if(!d||FIG)return;
  FIG=d.cloneNode(true);
  FIG.id='mi-fig';
  FIG.className=(FIG.className||'').toString()
    .split(/\s+/).filter(function(c){return c&&c!=='dl-dial';}).join(' ')+' mi-fig';
  FIG.style.display='none';
  d.parentNode.insertBefore(FIG,d);
 }
 /* THE TYPE SCALES FIRST — before anything measures anything.
    It used to sit inside the fitter, then got moved after it, and the fitter
    was left measuring label boxes at the old size: it fitted the drawing to
    type that was about to change, and the result overlapped at nearly every
    width. It is its own step now, and it runs before both fitters. */
 function figType(){
  if(!FIG||FIG.style.display==='none')return;
  var FW=FIG.getBoundingClientRect().width||343;
  var LF=Math.max(8,10*(FW/343));
  [].forEach.call(FIG.querySelectorAll('.dl-nm'),function(e){
   e.style.setProperty('font-size',LF.toFixed(2)+'px','important');});
 }
 function figGrow(){
  if(!FIG||FIG.style.display==='none')return;
  var hub=FIG.querySelector('.dl-dhub'); if(!hub)return;
  var hx=parseFloat(hub.style.left)||28;
  var pts=[].slice.call(FIG.querySelectorAll('.dl-dpt'));
  var discs=pts.map(function(e){return e.children[0];}).filter(Boolean);
  if(!discs.length)return;
  /* the box width, measured HERE. It was being read from a variable that
     only exists inside the other fitter, so the cached branch below threw
     and never ran — which is why the two kept fighting and the size
     oscillated 112 / 110 / 112 as the window moved. */
  var FW=FIG.getBoundingClientRect().width||343;

  pts.forEach(function(e){ if(e.__ox===undefined)e.__ox=parseFloat(e.style.left)||0; });
  function setSX(v){
   pts.forEach(function(e){
    if(e.__oy===undefined)e.__oy=parseFloat(e.style.top)||0;
    var nu=nudgeOf(e);
    e.style.setProperty('left',(hx+(e.__ox-hx)*v+(nu?nu.x:0)).toFixed(3)+'%','important');
    e.style.setProperty('top',(e.__oy+(nu?nu.y:0)).toFixed(3)+'%','important');});
  }

  function fits(){
   var fb=FIG.getBoundingClientRect();
   var r=discs.map(function(e){return e.getBoundingClientRect();});
   var boxes=pts.map(function(e){return e.getBoundingClientRect();});
   for(var i=0;i<r.length;i++)
    if(r[i].top<fb.top-0.5||r[i].bottom>fb.bottom+0.5||
       r[i].left<fb.left-0.5||r[i].right>fb.right+0.5)return false;
   var all=boxes.concat([hub.getBoundingClientRect()]);
   for(var a=0;a<all.length;a++)for(var b=a+1;b<all.length;b++){
    var x=all[a],y=all[b];
    if(Math.max(Math.max(x.left-y.right,y.left-x.right),
                Math.max(x.top-y.bottom,y.top-x.bottom))<6)return false;}
   return true;
  }

  /* THE STRETCH IS ADAPTIVE. A single fixed stretch pushed the outer discs off
     the edge on the narrowest screens, and the safety net then shrank them to
     12px chasing a fit — the opposite of what was wanted. The widest stretch
     that still fits is chosen first, and only then do the discs grow. */
  var base=discs[0].getBoundingClientRect().width;
  if(!base)return;
  /* SOLVED ONCE, THEN SCALED — this is what makes it smooth.
     The search below is a stepped one: it tries stretches in 4% notches and
     grows the discs in 4% notches. Re-running it on every resize meant it
     could land on a different notch one pixel either side of a width, and
     that is the jumpiness. So it runs ONCE, and what it finds is stored as
     RATIOS — stretch, and disc size as a fraction of the box. Every width
     after that just multiplies those ratios by the current box, which is a
     continuous function of width, so the drawing scales perfectly smoothly
     and can never step. */
  /* NOTE: an attempt to make this smooth by solving once and reusing the
     ratio was backed out. It did make the scaling perfectly continuous,
     but because the ratio could only tighten it ratcheted down across a
     resize and ended at 16px circles at 390 — far smaller than the ones
     approved. Correctness of size beats smoothness of transition, so the
     per-width solve stands until it can be made smooth without shrinking. */
  var SXS=[1.16,1.12,1.08,1.04,1.0], chosen=1.0;
  for(var t=0;t<SXS.length;t++){ setSX(SXS[t]); if(fits()){chosen=SXS[t];break;} }
  setSX(chosen);
  if(!fits())return;                 /* leave it exactly as the fitter left it */
  var last=base;
  for(var g=0;g<16;g++){            /* grow while it still fits */
   var next=base*1.04;
   discs.forEach(function(e){
    e.style.setProperty('width',next+'px','important');
    e.style.setProperty('height',next+'px','important');});
   if(!fits()){
    discs.forEach(function(e){
     e.style.setProperty('width',last+'px','important');
     e.style.setProperty('height',last+'px','important');});
    break;
   }
   last=next; base=next;
  }

 }

 function figFit(){
  if(!FIG||FIG.style.display==='none')return;

  var boxes=[].slice.call(FIG.querySelectorAll('.dl-dpt'));
  var discs=[].slice.call(FIG.querySelectorAll('.dl-dpt > div:first-child'));

  var hub=FIG.querySelector('.dl-dhub');
  if(!discs.length)return;
  /* measure the POINT boxes — disc plus its word — because with the labels
     showing it is word-to-word that binds first, not disc-to-disc. */
  function gap(){
   var r=boxes.map(function(e){return e.getBoundingClientRect();});
   if(hub)r.push(hub.getBoundingClientRect());
   var m=1e9;
   for(var i=0;i<r.length;i++)for(var j=i+1;j<r.length;j++){var x=r[i],y=r[j];
    m=Math.min(m,Math.max(Math.max(x.left-y.right,y.left-x.right),
                          Math.max(x.top-y.bottom,y.top-x.bottom)));}
   return m;}
  var base=discs[0].getBoundingClientRect().width;
  if(!base)return;
  for(var k=0;k<14;k++){
   if(gap()>=6)break;
   base=base*0.94;
   if(base<14)break;                     /* a floor: never a speck */
   discs.forEach(function(e){
    e.style.setProperty('width',base+'px','important');
    e.style.setProperty('height',base+'px','important');});
   /* the words do not shrink with the discs, so they come down too —
      otherwise the loop grinds the discs to nothing chasing a gap that
      only the labels control. Floored at 8px, the site's own smallest. */
   var fs=Math.max(8,(parseFloat(getComputedStyle(boxes[0].querySelector('.dl-nm')||boxes[0]).fontSize)||10)*0.94);
   [].forEach.call(FIG.querySelectorAll('.dl-nm'),function(e){
    e.style.setProperty('font-size',fs+'px','important');});
  }
 }
 /* the same measured correction the header uses: 100vw is the right WIDTH but
    it still starts wherever the grid area starts, so it has to be pulled back
    by however far in that is — measured, in pixels, not calc(50% - 50vw),
    which resolves against the grid area and misses. */
 var FIGV=null, GROWN=null;
 function figFix(){
  if(!FIGV||!FIG)return;
  FIG.style.setProperty('margin-left','0px','important');
  for(var i=0;i<3;i++){
   var cur=parseFloat(FIG.style.marginLeft)||0;
   var off=FIG.getBoundingClientRect().left;
   if(Math.abs(off)<0.5)break;
   FIG.style.setProperty('margin-left',(cur-off)+'px','important');
  }
 }

 /* The bleed measured ONCE at boot lands 42px out at 390: the correction runs
    before the page has finished settling (late images, the section's own
    rebuild), and the grid area moves under it afterwards. So the measurement
    is repeatable and gets re-run whenever the containing block actually
    changes size — observed, not guessed on a timer. */
 function bleedFix(){
  if(!SQ)return;
  var hub=listHub('');
  if(!hub)return;
  var vwpx=document.documentElement.clientWidth;
  var rr=(SQ.sqRatio||'1/1').split('/');
  var ratio=(parseFloat(rr[0])||1)/(parseFloat(rr[1])||1);
  if(Math.round(parseFloat(hub.style.width)||0)!==vwpx){
   hub.style.setProperty('width',vwpx+'px','important');
   hub.style.setProperty('height',Math.round(vwpx/ratio)+'px','important');
  }
  for(var pass=0;pass<3;pass++){
   var cur=parseFloat(hub.style.marginLeft)||0;
   var off=hub.getBoundingClientRect().left;
   if(Math.abs(off)<0.5)break;
   hub.style.setProperty('margin-left',(cur-off)+'px','important');
  }
 }

 function hubBleed(v){
  /* calc(50% - 50vw) resolves against the GRID AREA, not the page, so the
     bleed missed by 6px at 360. Measured and set in pixels instead — exact
     at every width. */
  var hub=listHub('');
  if(!hub)return;
  SQ=(v.hubSquare&&innerWidth<=900)?v:null;
  if(SQ){
   /* width FIRST — changing it moves the box, so measuring before setting it
      leaves the offset stale. Several passes because the first margin can
      itself shift the grid. */
   /* the stylesheet sets margin and width with !important, and a plain inline
      style loses to that — so these have to be set as important too. */
   /* a grid row is NOT sized from aspect-ratio — the hub kept its ratio but the
      row stayed short, so all eight list items rendered on top of the picture.
      The height is computed and set in pixels so the row measures properly. */
   var vwpx=document.documentElement.clientWidth;
   var rr=(v.sqRatio||'1/1').split('/');
   var ratio=(parseFloat(rr[0])||1)/(parseFloat(rr[1])||1);
   hub.style.setProperty('max-width','none','important');
   hub.style.setProperty('width',vwpx+'px','important');
   hub.style.setProperty('height',Math.round(vwpx/ratio)+'px','important');
   hub.style.setProperty('aspect-ratio','auto','important');
   hub.style.setProperty('margin-left','0px','important');
   bleedFix();
   watchBox(hub);
  }
  /* NO else branch. Above 900 the hub's width and height belong to paint(),
     which has already run by the time we get here — clearing them now would
     delete the fitted geometry. hubClear() has already dropped the bleed. */
 }

 /* watch the hub's CONTAINING BLOCK, not the hub. Changing the hub's own
    margin does not resize its parent, so this cannot feed back on itself. */
 var RO=null, ROel=null;
 function watchBox(hub){
  if(typeof ResizeObserver!=='function')return;
  var box=hub.parentElement; if(!box||box===ROel)return;
  if(RO)RO.disconnect();
  ROel=box;
  RO=new ResizeObserver(function(){ bleedFix(); figFix(); figFit(); figLines(); });
  RO.observe(box);
 }
 /* SETTLE. The recompute used to fire once, and at small sizes the page was
    still settling underneath it — labels rewrapping, images decoding — so
    the lines were left pointing at where things WERE. Now every event that
    means 'the box just moved' triggers another pass. */
 function settle(){ bleedFix(); figFix(); figType(); figFit(); figGrow(); figLines(); rowsBleed(V[cur-1]||V[0]); }
 addEventListener('load',settle);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(settle);
 [400,1200,2500].forEach(function(t){setTimeout(settle,t);});

 /* TEN WAYS TO DO THE NARROW LAYOUT — every one obeying the same rules:
      · the wide design is identical in all ten (picture bleeds right)
      · one switch at 900, no in-between layouts
      · nothing squashed — every picture keeps its true proportions
      · no picture ever changes after it is first drawn, so nothing can flash
    They differ in WHAT leads the section and how the eight attributes read.

    hdr   'hero' amps photograph | 'hub' the product shot | null none
    fig   show the drawing itself, cloned, at true proportion
    cols  1 or 2 columns in the labelled list
    disc  thumbnail size in that list                                    */
 /* Study 2, and only study 2. The other nine are deleted.
    fig        the drawing itself, cloned from the page's own diagram
    figW 88    88% of the screen, inside the page margin — not bled
    hdr null   no Marshall photograph on a small screen; the drawing leads
    rows none  and no photo rows either, so nothing is shown twice          */
 var V=[
  {n:'2 · Drawing leads, inside the page margin',
   fig:1, figRatio:'1/1', figW:88, hdr:null, rows:'topBottom', cols:2, disc:44}
 ];
 /* the old flags the CSS builder still reads, derived from the new ones */
 V.forEach(function(v){
  v.hubSquare = v.hdr ? 1 : 0;
  v.hubHero   = (v.hdr==='hero') ? 1 : 0;
  v.sqRatio   = v.hdrRatio || '16/9';
 });
 /* 'none' hides every photo row */
 var _s=smallCSS;
 smallCSS=function(v){
  var out=_s(v);
  if(v.rows==='none')
   out=out.replace('@media(max-width:900px){',
    '@media(max-width:900px){html body #sfsec-dna .cs-row-right{display:none !important;}');
  return out;};

 var cur=1, started=false;
 /* decode the picture BEFORE anything is shown. The hub's <img> was having its
    src swapped mid-transition, so the browser painted the old picture, then a
    blank box, then the new one — three states, and no amount of rAF fixes it
    because decode does not happen on a frame boundary. We wait for it. */
 function ready(v,cb){
  var want=wantSrc(v);
  if(!want){cb();return;}
  var done=false, go=function(){ if(done)return; done=true; cb(); };
  var t=setTimeout(go,700);                  /* never hang on a dead image */
  var pre=new Image();
  pre.onload=function(){ clearTimeout(t);
   if(pre.decode){ pre.decode().then(go,go); } else go(); };
  pre.onerror=function(){ clearTimeout(t); go(); };
  pre.src=want;
  if(pre.complete){ clearTimeout(t);
   if(pre.decode){ pre.decode().then(go,go); } else go(); }
 }

 function applyV(i){
  var v=V[i-1]; if(!v)return;
  /* SYNCHRONOUS, START TO FINISH.
     This used to wait on an off-screen image decode before writing the
     stylesheet, so that a picture could not be seen changing. Study 2 never
     changes a picture — there is no photographic header — so the wait bought
     nothing and cost everything: caught live in Chrome, the callback did not
     fire on load, which left `mi-swap` on the drawing (opacity 0) and #mi-css
     EMPTY. The drawing was invisible and unstyled until something else
     happened to trigger a repaint, and that repaint is the flash.
     Nothing here is deferred now, so there is no callback to miss and no
     state that can be left half-applied. */
  var st=document.getElementById('mi-css')||EARLY;
  st.textContent=BASECSS+smallCSS(v);
  figure(v);
  order(v);
  rowsBleed(v);
  hubSrc(v);
  hubClear();
  layout();
  hubBleed(v);
  var d=document.querySelector('#sfsec-dna .dl-dial');
  if(d)d.classList.remove('mi-swap');
  reveal();
 }
 /* and a watchdog, because an invisible section is the worst failure there is:
    whatever else happens, nothing stays hidden. */
 setInterval(function(){
  var d=document.querySelector('#sfsec-dna .dl-swap,#sfsec-dna .mi-swap');
  if(d)d.classList.remove('mi-swap');
  if(ROOT.classList.contains('mi-hold'))ROOT.classList.remove('mi-hold');
 },1000);

 /* The study is over — 27 is the design. The numbered picker bar, its
    stylesheet, the prev/next buttons, the arrow-key handler and the 112px of
    body padding that made room for it are all gone. What the bar used to do
    on click is now done once, on boot.
    window.__gs stays, with no DOM of its own: it is what the verification
    scripts drive the page through, and it renders nothing. */
 function start(){
  if(started)return; started=true;
  /* the study is over — no picker bar, no stylesheet for it, no body
     padding reserving room for it. window.__gs stays, with no DOM of its
     own, because it is what the verification scripts drive the page
     through; it renders nothing. */
  function go(n){ cur=1; applyV(1); }
  /* only redo the work when the width actually moved enough to change
     anything — resizing used to re-run the whole fit on every pixel */
  var rt=null, lastW=innerWidth;
  function band(w){ return w>1600?3:(w>1200?2:(w>900?1:0)); }
  /* THE REMAINING FLICK, and it was never in the swap window.
     The browser re-lays the page out on the resize event itself — 140ms
     BEFORE the debounce fires. In that gap it paints the hub at its new
     CSS size while still carrying the OLD picture and the OLD bleed offset:
     measured at 390x219 sitting 4px in, and at 800x450 sitting 24px out.
     That is the extra frame being seen.
     So the hide is now SYNCHRONOUS on the resize event, before any paint can
     happen, and the debounce only decides when to come back. While a resize
     is in progress the graphic is simply not shown — it fades in once, in the
     right shape, when the drag stops. */
  /* DRAGGING THE WINDOW MUST NOT FLASH.
     The old rule rebuilt on any 24px of movement AND hid the drawing while it
     did — so dragging a window on the 13" produced a hide, a rebuild and a
     fade back in, over and over. That hide-and-fade WAS the flashing.

     Now: within a band nothing is rebuilt and nothing is hidden. The layout
     is CSS at those widths, so it simply reflows, which is what a browser is
     good at. The only work is bleedFix(), which nudges a margin and changes
     nothing visible.
     Only crossing 900 — the one real change of layout — rebuilds, and only
     that case is covered while it happens. */
  addEventListener('resize',function(){
   /* THE BROKEN FRAME.
      Crossing 900 the CSS flips on the very pixel — the photographs become
      full-width 16:9 blocks — but the DOM move that puts them in the right
      PLACE was waiting on the 120ms debounce. For those 120ms the mobile
      rules were being applied to rows still sitting in the desktop column:
      giant pictures straight over the copy. That is the thing that pops up.
      The move is done here instead, synchronously, inside the resize event
      and therefore BEFORE the browser paints the new width. */
   if(band(innerWidth)!==band(lastW)){
    var vv=V[cur-1]||V[0];
    try{ order(vv); rowsBleed(vv); }catch(e){}
   }
   /* WITHIN A BAND the layout is the same layout, just narrower — so it is
      recomputed, not rebuilt. paint() is pure geometry: no picture is
      swapped, nothing is hidden, so it cannot flash. Leaving it out was
      the bug: the box shrank from 760 to 529 while the discs stayed frozen
      at 48px and the connector lines drifted to 124px out of place. */
   if(band(innerWidth)===band(lastW)){
    /* THE HAIRLINES TRACK LIVE. The discs are positioned in PERCENTAGES,
       so they follow the box by themselves as it resizes — it is only
       their pixel SIZE and the lines' pixel length that need recomputing.
       relines() is eight measurements and eight style writes, cheap
       enough to run on the resize event itself, so the lines never lag
       behind the discs and there is nothing to hide or fade. */
    relines();
    clearTimeout(rt);
    rt=setTimeout(function(){
     layout(); bleedFix(); figFix(); figType(); figFit(); figGrow(); figLines(); rowsBleed(V[cur-1]||V[0]);
    },90);
    return;
   }
   /* CROSSING THE BAND, SYNCHRONOUSLY.
      This used to HIDE the drawing, wait 120ms, then rebuild — and that hide
      is exactly what Matthew was seeing: the circles vanishing for a moment
      mid-resize. The hide only existed to cover the broken frame, and the
      broken frame is gone now that the photographs move in the same instant
      the CSS flips. applyV is synchronous from end to end, so the whole
      crossing can happen here, inside the resize event, before the browser
      paints. Nothing is hidden, because there is no longer a moment worth
      hiding. */
   clearTimeout(rt);
   lastW=innerWidth;
   applyV(cur);
  });
  window.__gs={names:V.map(function(x){return x.n;}),set:go};
  go(1);
 }
 function boot(){
  var t=0;
  (function poll(){
   if(!grab()){ if(++t<400)setTimeout(poll,50); return; }
   var gl=document.getElementById('sf-glance');
   if(gl){var row=gl; while(row&&!(row.className||'').toString().match(/cs-row-left/))row=row.parentElement;
    if(row)row.classList.add('m4-lastrow');}
   makeFig();
   start();
  })();
 }
 if(document.readyState==='loading')
  document.addEventListener('DOMContentLoaded',function(){setTimeout(boot,1200);});
 else setTimeout(boot,1200);
})();
