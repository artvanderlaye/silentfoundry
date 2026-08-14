/* ============================================================
   PAGE ORDER — The Foundry moves above Marshall.

     was    hero · what we do · film · MARSHALL · THE FOUNDRY · switch …
     now    hero · what we do · film · THE FOUNDRY · MARSHALL · switch …

   The film does not move. The Foundry lands between it and
   Marshall, so the anchor is Marshall, not the film.

   These sections are direct children of <body>, which is a plain
   block box — CSS `order` does nothing there, so this is a real
   DOM move rather than a visual one.

   The Foundry is not one node. It is followed by an unnamed 924px
   div holding the factory imagery (`.factory-solo`), which reads
   as part of the same block and has to travel with it. Any
   <style> or <script> siblings are deliberately LEFT WHERE THEY
   ARE: stylesheet position decides which rule wins on a
   specificity tie, and moving them could change the cascade
   somewhere else on the page.
   ============================================================ */
(function(){
 /* The Foundry is inserted BEFORE Marshall. An earlier version anchored on
    the film section and pushed the film down the page — the film stays put. */
 function anchor(){ return document.getElementById('sfsec-dna'); }

 function done(){
  var hiw=document.getElementById('hiw-stage');
  var vid=anchor();
  if(!hiw||!vid)return null;
  /* DOCUMENT_POSITION_FOLLOWING = Marshall comes after The Foundry = done */
  return !!(hiw.compareDocumentPosition(vid)&Node.DOCUMENT_POSITION_FOLLOWING);
 }

 function move(){
  var hiw=document.getElementById('hiw-stage');
  var vid=anchor();
  if(!hiw||!vid)return false;
  if(done())return true;

  /* the section, plus the plain DIVs that trail it before the next section */
  var block=[hiw], n=hiw.nextElementSibling;
  while(n&&n.tagName==='DIV'&&!n.id){ block.push(n); n=n.nextElementSibling; }

  block.forEach(function(el){ vid.parentNode.insertBefore(el,vid); });
  return true;
 }

 var t=0;
 (function poll(){
  var ok=move();
  /* keep watching for a while: several sections build themselves late and
     could reinsert. Cheap, and stops once the order is right. */
  if(++t<120)setTimeout(poll,ok?600:120);
 })();
})();
