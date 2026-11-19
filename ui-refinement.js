/* V0.3.5.5 — UI only: move existing controls, preserve their event listeners. */
(()=>{
 const fileMenu=document.getElementById('fileMenu'),fileBtn=document.getElementById('fileMenuBtn'),filePanel=document.getElementById('fileMenuPanel');
 const header=document.querySelector('.header-actions');
 const fileIds=['importBtn','backupBtn','pdfBtn','exportBtn'];
 const fileNodes=fileIds.map(id=>document.getElementById(id));
 const fileAnchors=fileNodes.map(n=>{const a=document.createComment('file:'+n.id);n.before(a);return a});
 const moreBtn=document.getElementById('moreToolsBtn'),morePanel=document.getElementById('moreToolsPanel');
 const toolbar=document.querySelector('.toolbar');
 const toolIds=['line','ellipse','rect','eyedropper'];
 const moreNodes=toolIds.map(id=>toolbar.querySelector('[data-tool="'+id+'"]')).filter(Boolean);
 const imageBtn=document.getElementById('insertImageBtn'),snapBtn=document.getElementById('snapBtn');
 moreNodes.push(imageBtn,snapBtn);
 const toolAnchors=moreNodes.map(n=>{const a=document.createComment('more:'+ (n.dataset.tool||n.id));n.before(a);return a});
 const close=()=>{filePanel.hidden=true;morePanel.hidden=true;fileBtn.setAttribute('aria-expanded','false');moreBtn.setAttribute('aria-expanded','false')};
 function sync(){close();const desktop=matchMedia('(min-width:1101px)').matches;
  fileNodes.forEach((n,i)=>desktop?filePanel.append(n):fileAnchors[i].after(n));
  const compact=matchMedia('(min-width:901px)').matches;
  moreNodes.forEach((n,i)=>compact?morePanel.append(n):toolAnchors[i].after(n));
  moreBtn.hidden=!compact;
 }
 fileBtn.addEventListener('click',()=>{const next=filePanel.hidden;close();filePanel.hidden=!next;fileBtn.setAttribute('aria-expanded',String(next))});
 moreBtn.addEventListener('click',()=>{const next=morePanel.hidden;close();morePanel.hidden=!next;moreBtn.setAttribute('aria-expanded',String(next))});
 fileNodes.forEach(n=>n.addEventListener('click',close));moreNodes.forEach(n=>n.addEventListener('click',close));
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('#fileMenu')&&!e.target.closest('#moreToolsPanel')&&!e.target.closest('#moreToolsBtn'))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 let last='';function onResize(){const current=(innerWidth>1100?'d':'m')+(innerWidth>900?'d':'m');if(current!==last){last=current;sync()}}
 window.addEventListener('resize',onResize);onResize();
})();
