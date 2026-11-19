/* Quadro V0.3.5.6 — Radial Toolbar; original controls and engine retained. */
(()=>{
'use strict';
const root=document.getElementById('radialRoot'),fab=document.getElementById('radialFab'),wheel=document.getElementById('radialWheel'),spokes=document.getElementById('radialSpokes'),sub=document.getElementById('radialSub'),closeBtn=document.getElementById('radialClose');
const corner=document.getElementById('prefRadialCorner'),showFab=document.getElementById('prefRadialFab');
const storageKey='quadro.radial.v0356';let prefs={corner:'bottom-right',fab:true};try{prefs={...prefs,...JSON.parse(localStorage.getItem(storageKey)||'{}')}}catch{}
const categories=[['draw','✎','Desenhar'],['marker','▰','Marcador / Borracha'],['select','⌗','Selecionar'],['insert','▤','Inserir'],['shapes','▢','Formas'],['style','◉','Estilo'],['edit','⧉','Editar'],['view','⌖','Navegar']];
const actions={draw:[['Caneta','[data-tool="pen"]']],marker:[['Marcador','[data-tool="highlighter"]'],['Borracha','[data-tool="eraser"]']],select:[['Selecionar','[data-tool="select"]'],['Mover quadro','[data-tool="hand"]']],insert:[['Nota','[data-tool="note"]'],['Texto','[data-tool="text"]'],['Imagem','#insertImageBtn']],shapes:[['Retângulo','[data-tool="rect"]'],['Elipse','[data-tool="ellipse"]'],['Linha','[data-tool="line"]']],edit:[['Duplicar','#duplicateBtn'],['Frente','#frontBtn'],['Trás','#backBtn'],['Bloquear','#lockBtn'],['Eliminar','#deleteBtn'],['Desfazer','#undoBtn'],['Refazer','#redoBtn'],['Limpar','#clearBtn']],view:[['Mover quadro','[data-tool="hand"]'],['Alinhar','#snapBtn'],['Conta-gotas','[data-tool="eyedropper"]'],['Zoom +','#zoomIn'],['Zoom −','#zoomOut'],['Repor zoom','#resetView']]};
let timeout=null,opened=false;
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(prefs))}catch{}}
function applyPrefs(){root.dataset.corner=prefs.corner;corner.value=prefs.corner;showFab.checked=prefs.fab;fab.hidden=!prefs.fab}
corner.addEventListener('change',()=>{prefs.corner=corner.value;persist();applyPrefs();resetTimer()});showFab.addEventListener('change',()=>{prefs.fab=showFab.checked;persist();applyPrefs()});applyPrefs();
function resetTimer(){clearTimeout(timeout);if(opened)timeout=setTimeout(hide,3000)}
function hide(){opened=false;wheel.hidden=true;sub.hidden=true;fab.setAttribute('aria-expanded','false');clearTimeout(timeout)}
function open(){opened=true;wheel.hidden=false;sub.hidden=true;fab.setAttribute('aria-expanded','true');resetTimer()}
function toggle(){opened?hide():open()}
fab.addEventListener('click',e=>{e.stopPropagation();toggle()});closeBtn.addEventListener('click',hide);
root.addEventListener('pointerdown',resetTimer);root.addEventListener('pointermove',e=>{if(e.buttons)resetTimer()});root.addEventListener('click',resetTimer);
function execute(selector){const target=document.querySelector(selector);if(!target)return;target.click();hide()}
function addAction(label,selector){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>execute(selector));sub.append(b)}
function showCategory(key,label){sub.replaceChildren();const title=document.createElement('div');title.className='radial-sub-title';title.textContent=label;sub.append(title);
 if(key==='style'){
  document.querySelectorAll('#colors [data-color]').forEach(original=>{const b=document.createElement('button');b.type='button';b.title=original.getAttribute('aria-label')||'Cor';b.style.background=original.dataset.color;b.style.border='2px solid #9fa7c4';b.style.width='42px';b.style.height='42px';b.addEventListener('click',()=>{original.click();hide()});sub.append(b)});
  const color=document.createElement('input');color.type='color';color.value=document.getElementById('customColor').value;color.title='Outra cor';color.addEventListener('input',()=>{const orig=document.getElementById('customColor');orig.value=color.value;orig.dispatchEvent(new Event('input',{bubbles:true}));resetTimer()});sub.append(color);
  const labelEl=document.createElement('label');labelEl.textContent='Espessura';const range=document.createElement('input');range.type='range';range.min='1';range.max='32';range.value=document.getElementById('size').value;range.addEventListener('input',()=>{const orig=document.getElementById('size');orig.value=range.value;orig.dispatchEvent(new Event('input',{bubbles:true}));resetTimer()});labelEl.append(range);sub.append(labelEl);
 }else (actions[key]||[]).forEach(([label,selector])=>addAction(label,selector));
 sub.hidden=false;resetTimer();}
categories.forEach(([key,icon,label],i)=>{const b=document.createElement('button');b.type='button';b.className='radial-spoke';b.title=label;b.setAttribute('aria-label',label);b.textContent=icon;const angle=(-90+i*45)*Math.PI/180;b.style.transform=`translate(${Math.round(Math.cos(angle)*88)}px,${Math.round(Math.sin(angle)*88)}px)`;b.addEventListener('click',()=>{if(['draw'].includes(key)){execute('[data-tool="pen"]')}else showCategory(key,label)});spokes.append(b)});
// Detect two short stationary taps from mouse, finger, or pen. Prevent the second pointerdown
// reaching the drawing engine; the first tap remains untouched to preserve responsiveness.
const stage=document.getElementById('stage');let last=null;const DIST=25,DELAY=360;
stage.addEventListener('pointerdown',e=>{if(e.target.closest('button,input,select,textarea,.radial-root,.zoom-tools,.smart-toolbar-shell'))return;if(e.button!==0||!e.isPrimary)return;
 const now=performance.now(),point={x:e.clientX,y:e.clientY,time:now,type:e.pointerType};
 if(last&&last.type===point.type&&now-last.time<DELAY&&Math.hypot(point.x-last.x,point.y-last.y)<DIST){e.preventDefault();e.stopImmediatePropagation();last=null;open();return}
 last=point;
},true);
stage.addEventListener('pointermove',e=>{if(last&&e.buttons&&Math.hypot(e.clientX-last.x,e.clientY-last.y)>12)last=null},true);
stage.addEventListener('pointercancel',()=>{last=null},true);
stage.addEventListener('dblclick',e=>{if(e.target===document.getElementById('canvas')||e.target===stage){e.preventDefault();e.stopPropagation();open()}},true);
document.addEventListener('pointerdown',e=>{if(opened&&!e.target.closest('#radialRoot'))hide()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&opened)hide()});
window.addEventListener('blur',()=>{if(opened)hide()});
})();
