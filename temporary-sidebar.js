/* Quadro V0.3.5.9 — Mostrar a lista de quadros durante 5 segundos ao iniciar. */
(()=>{
  const sidebar=document.getElementById('sidebar');
  const toggle=document.getElementById('sidebarBtn');
  if(!sidebar||!toggle)return;
  const mobile=()=>window.matchMedia('(max-width:900px)').matches;
  const visible=()=>mobile()?sidebar.classList.contains('open'):!sidebar.classList.contains('is-collapsed');
  // No telemóvel, o painel inicia fechado nas versões anteriores.
  if(!visible())toggle.click();
  let cancelled=false;
  let timer;
  const cancel=()=>{cancelled=true;clearTimeout(timer);};
  // Uma ação deliberada sobre o painel mantém o controlo nas mãos do utilizador.
  sidebar.addEventListener('pointerdown',cancel,{once:true});
  sidebar.addEventListener('keydown',cancel,{once:true});
  toggle.addEventListener('click',cancel,{once:true});
  document.getElementById('collapseBtn')?.addEventListener('click',cancel,{once:true});
  timer=setTimeout(()=>{
    if(cancelled||!visible())return;
    sidebar.classList.add('sidebar-auto-fade');
    setTimeout(()=>{
      sidebar.classList.remove('sidebar-auto-fade');
      if(!cancelled&&visible())toggle.click();
    },300);
  },5000);
})();
