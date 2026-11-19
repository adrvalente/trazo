/* Quadro V0.3.5.8 — dica inicial temporária (5 segundos) */
(()=>{
  const tip=document.getElementById('tip');
  if(!tip)return;
  tip.classList.add('tip-intro');
  const hide=()=>{tip.classList.add('tip-fading');setTimeout(()=>{tip.classList.add('tip-finished');},320);};
  window.setTimeout(hide,5000);
})();
