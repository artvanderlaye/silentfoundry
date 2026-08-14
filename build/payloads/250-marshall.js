/* ============================================================
   MARSHALL — new running order and new copy.

   The section is a two-column grid built at runtime by the
   Marshall payload. Its children are three left/right pairs:

     L1 eyebrow + headline + intro     R1 image
     L2 EXTRACTED DNA (the drawing)    R2 image grid
     L3 TRANSLATION + AT A GLANCE      R3 image

   Wanted:

     eyebrow + headline + intro
     TRANSLATION
     EXTRACTED DNA
     MARSHALL AT A GLANCE

   Two moves, and only one of them touches the DOM.

   The pair swap is done with CSS `order`, not by moving nodes.
   The Marshall payload queries these rows by position and rebuilds
   them on resize; reordering the DOM under it would break that.
   `order` changes what the eye sees and leaves the DOM alone.

   AT A GLANCE genuinely has to move — it is nested inside the
   TRANSLATION cell, and TRANSLATION is going up while AT A GLANCE
   has to end up last. That is one appendChild, into the cell that
   is now visually last.
   ============================================================ */
(function(){
 var EYEBROW='The Case For DNA Translation: Marshall';

 var INTRO='By 2010, Marshall’s core guitar amplifier market was declining. '+
  'People simply weren’t playing guitars like they used to. To revive the company '+
  'and expand its addressable market, Marshall used its distinctive tangible and '+
  'intangible brand DNA and translated it into new adjacent product categories.';

 var TRANS='Marshall did not extend a logo. It extracted its identity and rebuilt '+
  'that identity inside headphones, speakers and home audio. Not merchandise. '+
  'Not licensing. Product-level DNA translation. The brand entered new adjacent '+
  'categories and immediately made sense.';

 function body(){ return document.querySelector('#sfsec-dna .cs-dbody'); }

 function apply(){
  var b=body(); if(!b)return false;
  var kids=[].slice.call(b.children);
  if(kids.length<6)return false;

  /* ---- copy ---------------------------------------------------------- */
  var ey=b.querySelector('.cs-dey');
  if(ey&&(ey.textContent||'').trim()!==EYEBROW)ey.textContent=EYEBROW;

  var intro=kids[0].querySelector('.cs-dp');
  if(intro&&(intro.textContent||'').trim().slice(0,12)!=='By 2010, Mar'.slice(0,12)){}
  if(intro&&(intro.textContent||'').indexOf('guitar amplifier market was declining')<0)
   intro.textContent=INTRO;

  /* the TRANSLATION paragraph is the .cs-dp inside the third pair's left cell */
  var tcell=kids[4];
  var tp=tcell?tcell.querySelector('.cs-dp'):null;
  if(tp&&(tp.textContent||'').indexOf('immediately made sense')<0)
   tp.textContent=TRANS;

  /* ---- order --------------------------------------------------------- */
  /* pair 1 stays; pair 3 (TRANSLATION) comes second; pair 2 (EXTRACTED
     DNA) goes last. Written every pass — the payload rewrites these cells
     on resize and the inline order goes with them. */
  var ORDER=[1,2,5,6,3,4];
  kids.forEach(function(c,i){ c.style.setProperty('order',ORDER[i],'important'); });

  /* ---- AT A GLANCE to the end ---------------------------------------- */
  var glance=null;
  [].forEach.call(b.querySelectorAll('div'),function(d){
   if(glance)return;
   if(/Marshall At A Glance/i.test((d.textContent||'').trim().slice(0,40)))glance=d;
  });
  if(glance){
   var last=kids[2];               /* EXTRACTED DNA's left cell, now last */
   if(glance.parentNode!==last){
    last.appendChild(glance);
    glance.style.setProperty('margin-top','40px','important');
   }
  }
  return true;
 }

 var n=0;
 (function poll(){ var ok=apply(); if(++n<200)setTimeout(poll,ok?500:120); })();
 addEventListener('resize',function(){ setTimeout(apply,140); });
})();
