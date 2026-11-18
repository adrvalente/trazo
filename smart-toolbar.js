/* V0.3.5.2 — compact contextual toolbar; original canvas engine unchanged. */
(()=>{
 const toolbar=document.querySelector('.toolbar');
 const styleBtn=document.getElementById('smartStyleBtn'),editBtn=document.getElementById('smartEditBtn');
 const stylePanel=document.getElementById('smartStylePanel'),editPanel=document.getElementById('smartEditPanel');
 const styleSlot=document.getElementById('smartStyleSlot'),editSlot=document.getElementById('smartEditSlot');
 const styleIds=['colors','customColor','size'];
 const editIds=['duplicateBtn','frontBtn','backBtn','lockBtn','deleteBtn','clearBtn'];
 const originals=new Map();
 const tracked=[...toolbar.children].filter(el=>el.id==='colors'||el.classList.contains('size-label')||editIds.includes(el.id));
 tracked.forEach(el=>{const placeholder=document.createComment('smart-toolbar:'+ (el.id||'size'));el.before(placeholder);originals.set(el,placeholder)});
 const mobile=()=>matchMedia('(max-width:900px)').matches;
 const panels=[[styleBtn,stylePanel],[editBtn,editPanel]];
 const close=()=>{panels.forEach(([btn,panel])=>{panel.hidden=true;btn.setAttribute('aria-expanded','false')})};
 function relocate(){close();if(mobile()){
  for(const [el,placeholder] of originals)placeholder.after(el);
 }else{
  for(const el of tracked)(el.id==='colors'||el.classList.contains('size-label')?styleSlot:editSlot).append(el);
 }}
 function toggle(btn,panel){const opening=panel.hidden;close();if(opening){panel.hidden=false;btn.setAttribute('aria-expanded','true')}}
 styleBtn.addEventListener('click',()=>toggle(styleBtn,stylePanel));editBtn.addEventListener('click',()=>toggle(editBtn,editPanel));
 document.querySelectorAll('[data-close-smart]').forEach(btn=>btn.addEventListener('click',close));
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('.smart-toolbar-shell'))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 const mq=matchMedia('(max-width:900px)');mq.addEventListener?.('change',relocate);relocate();
 const observer=new MutationObserver(()=>{const selected=toolbar.querySelector('[data-tool].selected');if(selected)toolbar.dataset.activeTool=selected.dataset.tool});
 observer.observe(toolbar,{attributes:true,subtree:true,attributeFilter:['class']});
 const selected=toolbar.querySelector('[data-tool].selected');if(selected)toolbar.dataset.activeTool=selected.dataset.tool;
})();
