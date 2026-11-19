/* Quadro V0.3.5.7 — Radial Zoom. Preserva eventos originais dos quatro controlos. */
(()=>{'use strict';
const root=document.getElementById('zoomRadialRoot'),fab=document.getElementById('zoomRadialFab'),wheel=document.getElementById('zoomRadialWheel');
const main=document.getElementById('radialRoot');let timer=null;
function close(){clearTimeout(timer);wheel.hidden=true;root.classList.remove('is-open');fab.setAttribute('aria-expanded','false');fab.textContent='⌕'}
function schedule(){clearTimeout(timer);if(!wheel.hidden)timer=setTimeout(close,3000)}
function open(){wheel.hidden=false;root.classList.add('is-open');fab.setAttribute('aria-expanded','true');fab.textContent='×';schedule()}
fab.addEventListener('click',e=>{e.stopPropagation();wheel.hidden?open():close()});
root.addEventListener('pointerdown',schedule);root.addEventListener('pointermove',e=>{if(e.buttons)schedule()});
root.querySelectorAll('.zoom-tools button').forEach(b=>b.addEventListener('click',schedule));
document.addEventListener('pointerdown',e=>{if(!root.contains(e.target))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
window.addEventListener('blur',close);
function syncPosition(){const corner=main?.dataset.corner||'bottom-right';const active=main?.querySelector('#radialFab:not([hidden])');document.body.classList.toggle('zoom-radial-shift',corner==='bottom-right'&&!!active)}
new MutationObserver(syncPosition).observe(main,{attributes:true,attributeFilter:['data-corner'],subtree:true});syncPosition();
})();
