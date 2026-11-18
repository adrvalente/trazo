/* Quadro V0.3.3: navigation enhancement, no modifications to canvas engine or storage schema. */
(()=>{
 const sidebar=document.getElementById('sidebar'), list=document.getElementById('boards');
 const search=document.getElementById('boardSearch'),sort=document.getElementById('boardSort');
 const count=document.getElementById('boardCount'),empty=document.getElementById('boardsEmpty');
 const trigger=document.getElementById('sidebarBtn'),close=document.getElementById('collapseBtn');
 let alphabetical=false;
 const setExpanded=()=>trigger.setAttribute('aria-expanded',String(sidebar.classList.contains('open')));
 const apply=()=>{
  const items=[...list.children],query=search.value.trim().toLocaleLowerCase('pt-PT');
  let visible=0;
  for(const item of items){
   const name=item.querySelector('button.board-item')?.textContent||'';
   const show=name.toLocaleLowerCase('pt-PT').includes(query);
   item.hidden=!show;if(show)visible++;
   const btn=item.querySelector('button.board-item');
   if(btn){btn.title='Abrir '+name.trim();btn.setAttribute('aria-current',item.classList.contains('active')?'page':'false');}
  }
  if(alphabetical)items.sort((a,b)=>(a.querySelector('button.board-item')?.textContent||'').localeCompare(b.querySelector('button.board-item')?.textContent||'','pt-PT')).forEach(item=>list.append(item));
  count.textContent=items.length+' '+(items.length===1?'quadro':'quadros');
  empty.hidden=visible!==0;
 };
 let pending=false;
 new MutationObserver(()=>{if(!pending){pending=true;queueMicrotask(()=>{pending=false;apply()})}}).observe(list,{childList:true});
 search.addEventListener('input',apply);
 sort.addEventListener('click',()=>{alphabetical=!alphabetical;sort.textContent=alphabetical?'Recentes ↕':'A–Z ↕';sort.title=alphabetical?'Mostrar pela ordem original':'Ordenar alfabeticamente';apply();});
 document.getElementById('sidebarNew').addEventListener('click',()=>{document.getElementById('newBtn').click();search.value='';apply();});
 document.getElementById('sidebarClose').addEventListener('click',()=>{sidebar.classList.remove('open');setExpanded();trigger.focus()});
 trigger.addEventListener('click',setExpanded);close.addEventListener('click',setExpanded);
 list.addEventListener('click',()=>queueMicrotask(setExpanded));
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&sidebar.classList.contains('open')){sidebar.classList.remove('open');setExpanded();trigger.focus()}
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){
   const t=e.target;if(t.closest('input,textarea,[contenteditable]'))return;
   e.preventDefault();sidebar.classList.add('open');setExpanded();search.focus();
  }
 });
 const backdrop=document.createElement('button');backdrop.type='button';backdrop.className='sidebar-backdrop';backdrop.setAttribute('aria-label','Fechar lista de quadros');
 document.querySelector('main').append(backdrop);
 backdrop.addEventListener('click',()=>{sidebar.classList.remove('open');setExpanded()});
 setExpanded();apply();
})();
