/* V0.3.2: responsive UI only. Existing event listeners and canvas engine untouched. */
(()=>{
 const toolbar=document.querySelector('.toolbar');
 const tabs=[...document.querySelectorAll('[data-group-tab]')];
 const toolGroup={pen:'draw',highlighter:'draw',eraser:'draw',hand:'draw',note:'insert',text:'insert',rect:'insert',ellipse:'insert',line:'insert',select:'edit'};
 const editIds=new Set(['duplicateBtn','frontBtn','backBtn','lockBtn','deleteBtn','undoBtn','redoBtn','clearBtn']);
 const styleIds=new Set(['colors','customColor','size']);
 const toolButtons=[...toolbar.querySelectorAll('[data-tool]')];
 for(const child of [...toolbar.children]){
  if(child.classList.contains('separator'))continue;
  let group=child.dataset.tool?toolGroup[child.dataset.tool]:editIds.has(child.id)?'edit':styleIds.has(child.id)||child.classList.contains('size-label')?'style':'edit';
  child.dataset.responsiveGroup=group;
 }
 let active='draw';
 function show(group){active=group;for(const child of toolbar.querySelectorAll('[data-responsive-group]'))child.classList.toggle('group-visible',child.dataset.responsiveGroup===group);for(const tab of tabs){const on=tab.dataset.groupTab===group;tab.classList.toggle('active',on);tab.setAttribute('aria-pressed',String(on));}toolbar.scrollLeft=0;}
 for(const tab of tabs)tab.addEventListener('click',()=>show(tab.dataset.groupTab));
 for(const btn of toolButtons)btn.addEventListener('click',()=>{if(matchMedia('(max-width:900px)').matches){const group=toolGroup[btn.dataset.tool];if(group==='draw'||group==='insert'||group==='edit')show(group);}});
 show('draw');
 const menu=document.getElementById('mobileMenuBtn');const actions=document.querySelector('.header-actions');
 menu.addEventListener('click',()=>{const open=actions.classList.toggle('mobile-menu-open');menu.setAttribute('aria-expanded',String(open));});
 for(const btn of actions.querySelectorAll('button:not(#mobileMenuBtn)'))btn.addEventListener('click',()=>{actions.classList.remove('mobile-menu-open');menu.setAttribute('aria-expanded','false')});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){actions.classList.remove('mobile-menu-open');menu.setAttribute('aria-expanded','false')}});
})();
